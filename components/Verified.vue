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
      <!-- <div v-if="showPinEmailExpired">
        <p class="text-sm">
          {{ $t("jika-tidak-menerima-email") }}
          <span class="link text-primary" @click="resentEmail" role="button">{{
            $t("klik-disini")
          }}</span>
        </p>
      </div>
      <div>
        <div v-if="secondTime > 0" class="text-gray-400 text-sm">
          {{ $t("pin-berlaku-selama") }}
          <span class="whitespace-nowrap"
            >{{ secondTime }} {{ $t("second") }}.
          </span>
        </div>
        <div class="text-error text-sm" v-if="showPinEmailExpired">
          {{ $t("otp-expired") }}
        </div>
      </div> -->
    </div>
  </VeeForm>
</template>

<script setup>
const { requestOptions } = useRequestOptions();
// const snackbar = useSnackbar();
const { locale, t: $t } = useI18n();
const { $user } = useAuth();

const props = defineProps({
  email: String,
  otp: String,
  uuidData: String || Number,
  carOrTour: String,
});

const emit = defineEmits(["next", "update:otp", "sukses"]);

const { stateForm, countdown, showPinEmailExpired, secondTime } = useRefund();
const { otpSchema } = useSchema();

const { loading, message, alertType } = useRequestHelper();

function updateToParent() {
  emit("update:otp", stateForm.value.otp);
  emit("next");
}

// function resentEmail() {
//   showPinEmailExpired.value = false;
//   secondTime.value = 60;
//   countdown();

//   useFetch("/admins/resend-email-verification", {
//     method: "POST",
//     body: { email: stateForm.value.email },
//     ...requestOptions,
//   });
// }

async function onSubmit() {
  loading.value = true;

  const { error } = await useFetch(
    `/users/${$user.value.uuid}/${props.carOrTour}/${props.uuidData}/refund-request`,
    {
      method: "POST",
      body: stateForm.value.otp,
      ...requestOptions,
    }
  );

  if (error.value) {
    // snackbar.add({
    //   type: "error",
    //   text: error.value?.data?.message ?? "Something went wrong",
    // });
    alert("Error");
  } else {
    // snackbar.add({
    //   type: "success",
    //   text: "Thank you for your message. We will get back to you as soon as possible.",
    // });
    // updateToParent();
    alert("Suksess");
    emit("sukses", false);
  }

  loading.value = false;
}

onMounted(async () => {
  await nextTick();
  // countdown();
});
</script>

<style scoped></style>
