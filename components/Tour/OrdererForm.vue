<template>
  <div>
    <VeeForm @submit="onSubmit">
      <div class="grid grid-cols-1 lg:grid-cols-3 p-4 gap-4 border rounded-xl">
        <UIFormMGroup name="name" label="Nama Lengkap">
          <UIFormMTextField
            v-model="dataFormProfile.name"
            name="name"
            class="input-bordered"
            placeholder="ex:John Doe"
          />
        </UIFormMGroup>

        <UIFormMGroup name="email" label="Email">
          <UIFormMTextField
            v-model="dataFormProfile.email"
            name="email"
            class="input-bordered"
            placeholder="ex:myemail@gmail.com"
          />
        </UIFormMGroup>

        <UIFormMGroup name="phone" label="Phone">
          <UIFormMTextField
            v-model="dataFormProfile.phone"
            name="phone"
            class="input-bordered"
            placeholder="ex:081234567890"
          />
        </UIFormMGroup>
        <div class="hidden">
          <button ref="btnSubmit" type="submit">submit</button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const {
  dataForm,
  submitForm,
  saveFormData,
  showSavedTourData,
  clearSavedTourData,
} = useTourStore({
  callback: () => {
    alert("Form has been submitted!");
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
    type: String,
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

function onSubmit() {
  // dataForm.value.name = dataFormProfile.value.name;
  // dataForm.value.email = dataFormProfile.value.email;
  // dataForm.value.phone = dataFormProfile.value.phone;
  // saveFormData();
  // console.log(dataForm.value);
  // router.push("/vehicles/checkout");
}

// function onSubmit() {
//   router.push("/vehicles/checkout");
// }
</script>
