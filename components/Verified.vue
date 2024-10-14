<template>
  <VeeForm
    @submit="onSubmit"
    :validation-schema="otpSchema"
    v-slot="{ errors }"
  >
    <div class="grid grid-cols-1 text-left gap-4 p-4 rounded-md w-full">
      <Alert v-model="message" :type="alertType" />
      <div class="hidden">
        <VeeField name="otp" v-model="stateForm.otp" />
      </div>
      <UIFormInputOTP v-model="stateForm.otp" :is-error="!!errors?.otp" />
      <VeeErrorMessage name="otp" class="form-error-message" />
      <div>
        <button
          type="submit"
          class="btn bg-primary text-white shadow w-full py-1"
          :disabled="loading"
        >
          <span>{{ $t("proses-pengembalian") }}</span>
        </button>
      </div>

      <div v-if="$countdownHelper.showExpired">
        <p class="text-gray-400 text-xs">
          {{ $t("jika-tidak-menerima-email") }}
          <span
            class="link hover:text-blue-600"
            @click="resentEmail"
            role="button"
            >{{ $t("klik-disini") }}</span
          >
        </p>
      </div>

      <div class="flex justify-center">
        <div>
          <div
            v-if="$countdownHelper.expiredTime > 0"
            class="text-gray-400 text-xs"
          >
            {{ $t("otp-telah-dikirim") }}
            <span class="whitespace-nowrap">
              {{ $countdownHelper.expiredTime }} {{ $t("detik") }}
            </span>
          </div>
        </div>

        <div class="text-error text-xs" v-if="$countdownHelper.showExpired">
          {{ $t("otp-expired") }}
        </div>
      </div>
    </div>
  </VeeForm>
</template>

<script setup>
const { requestOptions } = useRequestOptions();
const { locale, t: $t } = useI18n();
const { $toast } = useNuxtApp();

const {
  $user,
  $countdownTokenExpired,
  $countdownHelper,
  $reRequestForgotPassword,
} = useAuth({
  usedBy: "user",
  callback: updateToParent,
});

const props = defineProps({
  email: String,
  otp: String,
  uuidData: String || Number,
  carOrTour: String,
  userUuid: String || Number,
});

const emit = defineEmits(["next", "update:otp", "sukses"]);

const { stateForm, countdown, showPinEmailExpired, secondTime } = useRefund();
const { otpSchema } = useSchema();

const { loading, message, alertType } = useRequestHelper();

function updateToParent() {
  emit("update:otp", stateForm.value.otp);
  emit("next");
}

async function resentEmail() {
  const { data, error } = await useFetch(
    `/users/${$user.value.uuid}/${props.carOrTour}/${props.uuidData}/refund-request`,
    {
      method: "post",
      ...requestOptions,
    }
  );

  $countdownHelper.value.showExpired = false;
  $countdownHelper.value.expiredTime = 60;

  $countdownTokenExpired();

  if (error.value) {
    setErrorMessage(error.value?.data?.message ?? $t("something-error"));
    $toast.error(error.value?.data?.message ?? $t("something-error"));
  } else {
    $toast.success(
      data.value?.data?.message ?? $t("sending-request-refund-success")
    );
  }
}

async function onSubmit() {
  loading.value = true;

  const { error, data } = await useFetch(
    `/users/${$user.value.uuid}/${props.carOrTour}/${props.uuidData}/refund`,
    {
      method: "POST",
      body: { pin: stateForm.value.otp },
      ...requestOptions,
    }
  );

  if (error.value) {
    $toast.error(error.value?.data?.message ?? $t("gagal"));
  } else {
    // updateToParent();
    $toast.success(
      data.value?.data?.message ?? $t("success-please-check-your-email-step")
    );
    emit("sukses", false);
  }

  loading.value = false;
}

onMounted(async () => {
  await nextTick();
  $countdownTokenExpired();
});
</script>

<style scoped></style>
