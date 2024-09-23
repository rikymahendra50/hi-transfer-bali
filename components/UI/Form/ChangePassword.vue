<template>
  <div>
    <VeeForm
      @submit="updatePassword"
      :validation-schema="
        isPasswordSetted ? updatePasswordSchema : unSetPasswordSchema
      "
    >
      <div class="py-2">
        <Alert v-model="message" :type="alertType" />
      </div>

      <div class="space-y-4">
        <UIFormGroup label="Old password" name="old_password">
          <UIFormTextCostume
            name="old_password"
            v-model="dataForm.old_password"
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
                @click="toggleInputType"
                class="w-5 h-5 cursor-pointer text-gray-400"
              />
            </template>
          </UIFormTextCostume>
        </UIFormGroup>

        <UIFormGroup label="Password" name="password">
          <UIFormTextCostume
            name="password"
            v-model="dataForm.password"
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
                @click="toggleInputType"
                class="w-5 h-5 cursor-pointer text-gray-400"
              />
            </template>
          </UIFormTextCostume>
        </UIFormGroup>

        <UIFormGroup label="Konfirm Password" name="confirm_password">
          <UIFormTextCostume
            name="confirm_password"
            v-model="dataForm.confirm_password"
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
                @click="toggleInputType"
                class="w-5 h-5 cursor-pointer text-gray-400"
              />
            </template>
          </UIFormTextCostume>
        </UIFormGroup>
        <div>
          <button
            type="submit"
            :disabled="loading"
            :loading="loading"
            class="btn btn-primary btn-block"
          >
            Update password
          </button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
const props = defineProps({
  usedBy: {
    type: String,
    default: "user",
  },
});
const {
  loading,
  message,
  alertType,
  updatePassword,
  dataForm,
  isPasswordSetted,
} = usePasswordChange(props.usedBy);

const { updatePasswordSchema, unSetPasswordSchema } = useSchema();

const { inputType, toggleInputType } = usePasswordHelper();
</script>

<style lang="scss" scoped></style>
