<script lang="ts" setup>
const { registerSchema } = useSchema();

const { loading, message, alertType, $credentialForm, $register } = useAuth();

const { inputType, togglePasswordType, toggleInputType } = usePasswordHelper();

const { locale, t: $t } = useI18n();

useHead({
  title: "Sign Up",
});

definePageMeta({
  layout: "auth",
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
            <div>
              <UIBtn
                variant="primary"
                type="submit"
                :disabled="loading"
                class="w-full"
                >Submit</UIBtn
              >
            </div>

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
