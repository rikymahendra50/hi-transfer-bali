<script setup lang="ts">


const props = defineProps({
  email: String,
  otp: String,
})

const emit = defineEmits(["next"]);

const { stateForm } = useForgotPassword()

const { loading, message, alertType } = useRequestHelper()
const { resetPasswordSchema } = useSchema()

function onSubmit() {
  loading.value = true
  emit("next")

}
</script>
<template>
  <VeeForm @submit="onSubmit" :validation-schema="resetPasswordSchema">
    <div class="grid grid-cols-1 w-[450px] text-left gap-4 p-4 rounded-md shadow">
      <Alert v-model="message" :type="alertType" />
      <FormGroup label="Passowrd" name="password">
        <FormTextField v-model="stateForm.password" name="password" placeholder="*******" type="password"
          class="input input-bordered" />
      </FormGroup>
      <FormGroup label="Confirm Passowrd" name="confirm_password">
        <FormTextField v-model="stateForm.password_confirmation" name="confirm_password" type="password"
          placeholder="*******" class="input input-bordered" />
      </FormGroup>
      <div>
        <p class="text-gray-400">We will send a code to your email</p>
      </div>

      <div>
        <button class="btn btn-success">Submit</button>
      </div>
    </div>
  </VeeForm>
</template>



<style scoped></style>
