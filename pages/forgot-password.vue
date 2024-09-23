<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-[500px] border rounded-xl">
        <div class="py-4 text-center">
          <h1 class="text-xl font-bold">
            {{ stepper.current.value.title }}
          </h1>
        </div>

        <ForgotPassword
          v-model:email="$credentialForgotPassword.email"
          v-if="stepper.isCurrent('forgot-password')"
          @next="() => stepper.goTo('otp')"
        />

        <ForgotPasswordVerifiedOTP
          v-if="stepper.isCurrent('otp')"
          v-model:pin="$credentialForgotPassword.pin"
          :email="$credentialForgotPassword.email"
          @next="() => stepper.goTo('change-password')"
        />

        <ForgotPasswordChange
          v-if="stepper.isCurrent('change-password')"
          :email="$credentialForgotPassword.email"
          :pin="$credentialForgotPassword.pin"
          @next="goToHome"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStepper } from "@vueuse/core";
const { locale, t: $t } = useI18n();

const router = useRouter();

const stepper = useStepper({
  "forgot-password": {
    title: $t("lupa-password-?"),
    isValid: () => true,
  },
  otp: {
    title: "Verification OTP",
    isValid: () => true,
  },
  "change-password": {
    title: $t("change-password"),
    isValid: () => true,
  },
});

const { $credentialForgotPassword } = useAuth();

const titleHeader = computed(() => {
  return stepper.current?.value?.title ?? $t("lupa-password-?");
});

function goToHome() {
  router.push("/");
}
definePageMeta({
  layout: "auth",
});

useHead({
  title: titleHeader.value,
});
</script>

<style></style>
