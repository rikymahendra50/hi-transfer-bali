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

definePageMeta({
  layout: "auth"
})


</script>

<template>
  <div>
    <div>
      <div class="w-full lg:w-[500px] border rounded-xl">
        <div class="py-4">
          <h1 class="text-xl text-center font-bold ">Sign In</h1>
        </div>

        <VeeForm
          @submit="$login"
          :validation-schema="loginSchema"
        >
          <div class="grid grid-cols-1 gap-4 p-6">
            <UIAlert
              v-model="message"
              :type="alertType"
            />
            <UIFormMGroup
              label="Email"
              name="email"
            >
              <UIFormMTextField
                name="email"
                v-model="$credentialForm.email"
                class="input-bordered"
                placeholder="ex:myemail@gmail.com"
              />
            </UIFormMGroup>
            <UIFormMGroup
              label="Password"
              name="password"
            >
              <UIFormMTextField
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

              </UIFormMTextField>
            </UIFormMGroup>
            <div>
              <UIBtn
                variant="primary"
                type="submit"
                :disabled="loading"
                class="w-full"
              >Submit</UIBtn>
              <div class="flex justify-between items-center">
                <div>
                  <NuxtLink
                    class="link link-hover text-xs text-neutral-400"
                    to="/forgot-password"
                  >Forgot password?</NuxtLink>
                </div>
                <div class="text-xs text-neutral-400">
                  <p>Don't have an account? <NuxtLink
                      to="/sign-up"
                      class="link link-hover"
                    >Sign Up</NuxtLink>
                  </p>
                </div>
              </div>
            </div>
            <div class="divider divider-neutral text-neutral-400 text-sm">Log in lebih cepat dengan</div>
            <div>
              <AuthSocialLogin />
            </div>
          </div>
        </VeeForm>

      </div>
    </div>
  </div>
</template>



<style></style>
