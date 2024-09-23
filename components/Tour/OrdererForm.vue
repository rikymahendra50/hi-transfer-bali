<template>
  <div>
    <VeeForm @submit="onSubmit">
      <div class="grid grid-cols-1 lg:grid-cols-3 p-4 gap-4 border rounded-xl">
        <UIFormMGroup name="name" label="Nama Lengkap">
          <UIFormMTextField
            v-model="dataForm.name"
            name="name"
            class="input-bordered"
            placeholder="ex:John Doe"
            @input="emit('update:name', $event.target.value)"
          />
        </UIFormMGroup>

        <UIFormMGroup name="email" label="Email">
          <UIFormMTextField
            v-model="dataForm.email"
            name="email"
            class="input-bordered"
            placeholder="ex:myemail@gmail.com"
            @input="emit('update:email', $event.target.value)"
          />
        </UIFormMGroup>

        <UIFormMGroup name="phone" label="Phone">
          <UIFormMTextField
            v-model="dataForm.phone"
            name="phone"
            class="input-bordered"
            placeholder="ex:081234567890"
            @input="emit('update:phone', $event.target.value)"
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

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: undefined,
  },
  email: {
    type: String,
    required: false,
    default: undefined,
  },
  phone: {
    type: String,
    required: false,
    default: undefined,
  },
});

const emit = defineEmits(["update:name", "update:email", "update:phone"]);

const dataForm = ref({
  name: props.name,
  email: props.email,
  phone: props.phone,
});

watch(
  () => props.name,
  (newName) => {
    dataForm.value.name = newName;
  }
);

watch(
  () => props.email,
  (newEmail) => {
    dataForm.value.email = newEmail;
  }
);

watch(
  () => props.phone,
  (newPhone) => {
    dataForm.value.phone = newPhone;
  }
);

function onSubmit() {
  router.push("/vehicles/checkout");
}
</script>
