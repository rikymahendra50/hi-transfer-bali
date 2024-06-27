<script lang="ts" setup>

const { loginSchema } = useSchema()

const { togglePasswordType, inputType } = usePasswordHelper()

const router = useRouter()

function redirectUserProfile() {
  router.push("/user/profile")
}

const { loading, message, alertType, $credentialForm, $login } = useAuth({
  usedBy: "user",
  callback: redirectUserProfile
})

useHead({
  title: "Sign In",
})


</script>

<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold mb-4">Sign In</h1>

        <VeeForm
          @submit="$login"
          :validation-schema="loginSchema"
        >
          <div class="grid grid-cols-1 w-[450px] text-left gap-4 p-4 rounded-md shadow">
            <UIAlert
              v-model="message"
              :type="alertType"
            />
            <UIFormGroup
              label="Email"
              name="email"
            >
              <UIFormTextField
                name="email"
                v-model="$credentialForm.email"
                class="input-bordered"
                placeholder="ex:myemail@gmail.com"
              />
            </UIFormGroup>
            <UIFormGroup
              label="Password"
              name="password"
            >
              <UIFormTextField
                name="password"
                v-model="$credentialForm.password"
                :type="inputType"
                class="input-bordered"
                placeholder="********"
              >
                <template #leftSection>
                  <Icon
                    name="i-heroicons-lock-closed"
                    class="w-5 h-5 text-gray-400"
                  />
                </template>
                <template #rightSection>
                  <Icon
                    :name="inputType === 'password' ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
                    class="w-5 h-5 text-gray-400"
                    @click="togglePasswordType"
                  />
                </template>

              </UIFormTextField>
            </UIFormGroup>
            <div>
              <NuxtLink
                class="link link-hover text-sm"
                to="/forgot-password"
              >Forgot password?</NuxtLink>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <UIBtn
                  variant="success"
                  type="submit"
                  :disabled="loading"
                >Submit</UIBtn>
              </div>
              <div class="text-sm">
                <p>Don't have an account? <NuxtLink
                    to="/sign-up"
                    class="link link-hover"
                  >Sign Up</NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </VeeForm>

      </div>
    </div>
  </div>
</template>



<style></style>
