<template>
  <div>
    <VeeForm @submit="onSubmit">
      <!-- :validation-schema="orderCarSchema" -->
      <div class="space-y-4 p-4 border rounded-xl">
        <UIFormMGroup name="name" label="Nama Lengkap">
          <UIFormMTextField
            v-model="dataFormProfile.name"
            name="name"
            class="input-bordered"
            placeholder="Ketik Nama Lengkap Anda"
          />
        </UIFormMGroup>

        <UIFormMGroup name="email" label="Email">
          <UIFormMTextField
            v-model="dataFormProfile.email"
            name="email"
            class="input-bordered"
            placeholder="Ketik Email Anda"
          />
        </UIFormMGroup>

        <UIFormMGroup name="phone" label="Nomor Telepon">
          <UIFormMTextField
            v-model="dataFormProfile.phone"
            name="phone"
            class="input-bordered"
            placeholder="Ketik Nomor Telepon"
          />
        </UIFormMGroup>

        <div class="hidden">
          <button ref="internalSubmit" type="submit">submit</button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const { orderCarSchema } = useSchema();

const {
  dataForm,
  submitForm,
  saveFormData,
  showSavedCarData,
  clearSavedCarData,
} = useCarStore({
  callback: () => {
    console.log("Form has been submitted!");
  },
});

const props = defineProps({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: [String, Number],
    required: false,
  },
});

const emit = defineEmits(["update:name", "update:email", "update:phone"]);

const dataFormProfile = ref({
  name: props.name,
  email: props.email,
  phone: props.phone,
});

watch(
  () => props.name,
  (newName) => {
    dataFormProfile.value.name = newName;
  }
);

watch(
  () => props.email,
  (newEmail) => {
    dataFormProfile.value.email = newEmail;
  }
);

watch(
  () => props.phone,
  (newPhone) => {
    dataFormProfile.value.phone = newPhone;
  }
);
</script>

<style scoped></style>
