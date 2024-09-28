<script lang="ts" setup>
const { updateProfileSchema } = useSchema();

const props = defineProps({
  usedBy: {
    type: String,
    default: "user",
  },
});

const emit = defineEmits<{ (e: "reload"): void }>();

function reload() {
  emit("reload");
}

const {
  loading,
  message,
  alertType,
  dataForm,
  updateProfile,
  currentUserProfile,
} = useProfile(props.usedBy as "user" | "admin", reload);

onMounted(async () => {
  await nextTick();
});
</script>

<template>
  <div>
    <VeeForm @submit="updateProfile" :validation-schema="updateProfileSchema">
      <div class="grid grid-cols-1 gap-4">
        <Alert v-model="message" :type="alertType" />
        <div class="flex flex-row items-center space-x-2">
          <div class="flex-shrink-0">
            <UIFormAvatar
              v-model="dataForm.image"
              :profile-image="currentUserProfile"
            />
            <VeeErrorMessage
              name="profile_picture"
              class="form-error-message"
            />
          </div>
          <div class="text-sm text-[#506176]">
            Recommended dimensions: 200x200px. Max. file size: 1 MB
          </div>
        </div>

        <UIFormMGroup label="Nama Pertama" name="first_name">
          <UIFormMTextField
            v-model="dataForm.first_name"
            name="first_name"
            class="input-bordered"
            placeholder="ex:jhon"
          />
        </UIFormMGroup>
        <UIFormMGroup label="Nama terakhir" name="last_name">
          <UIFormMTextField
            v-model="dataForm.last_name"
            name="last_name"
            class="input-bordered"
            placeholder="ex:doe"
          />
        </UIFormMGroup>
        <UIFormMGroup label="Email" name="email">
          <UIFormMTextField
            name="email"
            v-model="dataForm.email"
            class="input-bordered"
            placeholder="ex:myemail@gmail.com"
          />
        </UIFormMGroup>

        <div class="h-1"></div>
        <div>
          <button
            class="btn btn-primary btn-block"
            type="submit"
            :disabled="loading"
            :loading="loading"
          >
            Update Profile
          </button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<style></style>
