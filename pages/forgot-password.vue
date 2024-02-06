<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold mb-6">
          {{ stepper.current.value.title }}
        </h1>

        <ForgotPassword v-model:email="stateForm.email" v-if="stepper.isCurrent('forgot-password')"
          @next="() => stepper.goTo('otp')" />

        <ForgotPasswordVerifiedOTP v-if="stepper.isCurrent('otp')" v-model:otp="stateForm.otp" :email="stateForm.email"
          @next="() => stepper.goTo('change-password')" />

        <ForgotPasswordChange v-if="stepper.isCurrent('change-password')" :email="stateForm.email" :otp="stateForm.otp"
          @next="goToHome" />

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStepper } from "@vueuse/core";

const router = useRouter();

const stepper = useStepper({
  "forgot-password": {
    title: "Forgot Password",
    isValid: () => true,
  },
  otp: {
    title: "Verification OTP",
    isValid: () => true,
  },
  "change-password": {
    title: "Change Password",
    isValid: () => true,
  },
});

const { stateForm } = useForgotPassword();

const titleHeader = computed(() => {
  return stepper.current?.value?.title ?? "Forgot Password"
})

function goToHome() {
  router.push("/")
}



useHead({
  title: titleHeader.value
});
</script>

<style></style>
