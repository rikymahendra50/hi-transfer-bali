<script setup lang="ts">
const props = withDefaults(defineProps<{ email: string; usedBy: string }>(), {
  usedBy: "user",
});

const emit = defineEmits(["next", "update:pin"]);

const { otpSchema } = useSchema();

const {
  loading,
  message,
  alertType,
  $verificationOTPForgotPassword,
  $credentialForgotPassword,
  $countdownTokenExpired,
  $countdownHelper,
  $reRequestForgotPassword,
} = useAuth({
  usedBy: props.usedBy as "user" | "admin",
  callback: updateToParent,
});

function updateToParent() {
  emit("update:pin", $credentialForgotPassword.value.pin);
  emit("next");
}

async function resentEmail() {
  if (loading.value) {
    return;
  }
  await $reRequestForgotPassword();
  $countdownHelper.value.showExpired = false;
  $countdownHelper.value.expiredTime = 60;
  $countdownTokenExpired();
}

onMounted(async () => {
  await nextTick();
  $credentialForgotPassword.value.email = props.email;
  $countdownTokenExpired();
});
</script>
<template>
  <VeeForm
    @submit="$verificationOTPForgotPassword"
    :validation-schema="otpSchema"
    v-slot="{ errors }"
  >
    <div
      class="grid grid-cols-1 w-[450px] text-left gap-2 p-4 rounded-md shadow"
    >
      <UIAlert v-model="message" :type="alertType" />
      <div class="flex justify-center">
        <UIFormGroup label="OTP" name="opt">
          <div class="hidden">
            <VeeField name="otp" v-model="$credentialForgotPassword.pin" />
          </div>
          <UIFormInputOTP
            v-model="$credentialForgotPassword.pin"
            :is-error="!!errors?.otp"
          />
          <TransitionX>
            <VeeErrorMessage name="otp" class="form-error-message" />
          </TransitionX>
        </UIFormGroup>
      </div>
      <div class="flex justify-center">
        <div v-if="$countdownHelper.showExpired">
          <p class="text-gray-400 text-xs">
            If you did not receive the an email
            <span class="link" @click="resentEmail" role="button"
              >click here</span
            >
          </p>
        </div>
      </div>

      <div class="flex justify-center">
        <div>
          <div
            v-if="$countdownHelper.expiredTime > 0"
            class="text-gray-400 text-xs"
          >
            We have sent an OTP to your email. Your OTP will expired in
            <span class="whitespace-nowrap">
              {{ $countdownHelper.expiredTime }} seconds
            </span>
          </div>

          <div class="text-error text-xs" v-if="$countdownHelper.showExpired">
            Your OTP has expired. Please request a new one
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <UIBtn type="submit" :disabled="loading" variant="primary">
          Submit
        </UIBtn>
      </div>
    </div>
  </VeeForm>
</template>

<style scoped></style>
