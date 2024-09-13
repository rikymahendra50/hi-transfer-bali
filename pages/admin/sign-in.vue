<script lang="ts" setup>
const { loginSchema } = useSchema();

const router = useRouter();

function redirectUserProfile() {
  router.push("/admin/profile");
}

const { loading, message, alertType, $credentialForm, $login } = useAuth({
  usedBy: "admin",
  callback: redirectUserProfile,
});

useHead({
  title: "Sign In",
});

definePageMeta({
  // @ts-ignore
  middleware: ["guest"],
});
</script>

<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-full md:w-[450px] lg:max-w-md mt-32">
        <h1 class="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
          Dasbor Admin
        </h1>
        <p class="text-sm md:text-[18px] text-[#121212] font-normal">
          Selamat datang di Dashboard Admin Hi Travel Bali, silakan gunakan akun
          terdaftar untuk login
        </p>

        <VeeForm @submit="$login" :validation-schema="loginSchema">
          <div class="grid grid-cols-1 text-left gap-4 p-4 rounded-md my-4">
            <UIFormMGroup label="Email" name="email">
              <UIFormMTextField
                name="email"
                v-model="$credentialForm.email"
                class="input-bordered"
                placeholder="Ketik Email Anda"
              />
            </UIFormMGroup>
            <UIFormMGroup label="Password" name="password">
              <UIFormMTextField
                name="password"
                v-model="$credentialForm.password"
                type="password"
                class="input-bordered"
                placeholder="********"
              >
              </UIFormMTextField>
            </UIFormMGroup>

            <UIBtn
              variant="primary"
              type="submit"
              :disabled="loading"
              class="w-full"
              >Login</UIBtn
            >
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<style></style>
