
<script setup lang="ts">


const props = defineProps({
  email: String,
});

const emit = defineEmits(["next", "update:email"]);

const { loading, message, alertType } = useRequestHelper();
const { stateForm } = useForgotPassword();
const { onlyEmailSchema } = useSchema()

function updateToParent() {
  emit("update:email", stateForm.value.email);
  emit("next");
}

function onSubmit() {
  loading.value = true;
  message.value = "hallo";
  alertType.value = "success";
  updateToParent();
  loading.value = false;
}
</script>
<template>
  <VeeForm @submit="onSubmit" :validation-schema="onlyEmailSchema">
    <div class="grid grid-cols-1 w-[450px] text-left gap-4 p-4 rounded-md shadow">
      <Alert v-model="message" :type="alertType" />
      <FormGroup label="Email" name="email">
        <FormTextField name="email" v-model="stateForm.email" placeholder="ex:myemail@gmail.com" class="input-bordered" />
      </FormGroup>
      <div>
        <p class="text-gray-400">We will send a code to your email</p>
      </div>

      <div>
        <button class="btn btn-success" type="submit" :disabled="loading">
          Submit
        </button>
      </div>
    </div>
  </VeeForm>
</template>



<style scoped></style>
