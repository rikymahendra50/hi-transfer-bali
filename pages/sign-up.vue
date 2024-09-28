<script lang="ts" setup>
const { registerSchema } = useSchema();

const { inputType, toggleInputType } = usePasswordHelper();

const { locale, t: $t } = useI18n();

const {
  loading,
  message,
  alertType,
  $credentialForm,
  $register,
  $showRegisterSubmitBtn,
  $registerRequestEmailForActiveAccount,
  _emailForResent,
  $countdownHelper,
} = useAuth();

useHead({
  title: "Sign Up",
});

definePageMeta({
  layout: "auth",
  // @ts-ignore
  middleware: "guest",
});
</script>
<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="w-[500px] rounded-xl border">
        <div class="py-4 text-center">
          <h1 class="text-xl font-bold">Sign Up</h1>
        </div>

        <VeeForm @submit="$register" :validation-schema="registerSchema">
          <div class="grid grid-cols-1 gap-4 p-4">
            <UIAlert v-model="message" :type="alertType" />
            <div class="grid grid-cols-2 gap-4">
              <UIFormMGroup :label="$t('nama-pertama')" name="first_name">
                <UIFormMTextField
                  v-model="$credentialForm.first_name"
                  name="first_name"
                  class="input-bordered"
                  placeholder="ex:jhon"
                />
              </UIFormMGroup>
              <UIFormMGroup :label="$t('nama-terakhir')" name="last_name">
                <UIFormMTextField
                  v-model="$credentialForm.last_name"
                  name="last_name"
                  class="input-bordered"
                  placeholder="ex:doe"
                />
              </UIFormMGroup>
            </div>

            <UIFormMGroup :label="$t('phone')" name="phone">
              <UIFormMTextField
                name="phone"
                v-model="$credentialForm.phone"
                class="input-bordered"
                placeholder="0821.."
              />
            </UIFormMGroup>

            <UIFormMGroup label="Email" name="email">
              <UIFormMTextField
                name="email"
                v-model="$credentialForm.email"
                class="input-bordered"
                placeholder="ex:myemail@gmail.com"
              />
            </UIFormMGroup>

            <UIFormMGroup label="Password" name="password">
              <UIFormMTextField
                v-model="$credentialForm.password"
                name="password"
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
                    :name="
                      inputType === 'password'
                        ? 'i-heroicons-eye'
                        : 'i-heroicons-eye-slash'
                    "
                    class="w-5 h-5 text-gray-400"
                    @click="toggleInputType"
                  />
                </template>
              </UIFormMTextField>
            </UIFormMGroup>

            <UIFormMGroup
              :label="$t('konfirmasi-password')"
              name="confirm_password"
            >
              <UIFormMTextField
                v-model="$credentialForm.confirm_password"
                name="confirm_password"
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
                    :name="
                      inputType === 'password'
                        ? 'i-heroicons-eye'
                        : 'i-heroicons-eye-slash'
                    "
                    class="w-5 h-5 text-gray-400"
                    @click="toggleInputType"
                  />
                </template>
              </UIFormMTextField>
            </UIFormMGroup>

            <!-- test resend -->

            <!--              
              " -->

            <div class="h-1"></div>
            <div
              v-if="
                $countdownHelper.expiredTime > 0 &&
                $countdownHelper.expiredTime < 60
              "
              class="p-2 text-gray-400 text-sm border rounded-lg"
            >
              <span>
                {{
                  `we sent you an email with a link to activate your account. Please check your email ${_emailForResent}.Your email verification will be expired in ${$countdownHelper.expiredTime} seconds`
                }}
              </span>
            </div>
            <div
              v-if="$countdownHelper.showExpired"
              class="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between border p-2 rounded-lg lg:space-x-2"
            >
              <div class="text-sm text-gray-400">
                If you don't receive an email, click here to request a new email
                for verification.
              </div>
              <div>
                <button
                  class="btn btn-primary btn-block whitespace-nowrap"
                  type="button"
                  :disabled="loading"
                  @click="$registerRequestEmailForActiveAccount"
                >
                  Resent Email
                </button>
              </div>
            </div>

            <!-- v-if="$showRegisterSubmitBtn" -->
            <div>
              <UIBtn
                variant="primary"
                type="submit"
                :disabled="loading"
                class="w-full"
                >Submit</UIBtn
              >
            </div>

            <!-- end test resend -->

            <div class="flex justify-between items-center mt-1">
              <div></div>
              <div class="text-xs text-neutral-400">
                <p>
                  {{ $t("apakah-sudah-punya-akun") }}
                  <NuxtLink to="/sign-in" class="link link-hover"
                    >Sign In
                  </NuxtLink>
                </p>
              </div>
            </div>
            <!-- <div class="divider divider-neutral text-neutral-400 text-sm">
              {{ $t("daftar-lebih-cepat-dengan") }}
            </div>
            <div>
              <AuthSocialLogin />
            </div> -->
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<style></style>
