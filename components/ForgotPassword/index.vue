<script setup lang="ts">

const props = defineProps({
  usedBy: {
    type: String,
    default: "user",
    validator(value: string) {
      return ["user", "admin"].includes(value);
    }
  }
})

const emit = defineEmits(["next", "update:email"]);

const { onlyEmailSchema } = useSchema()

function updateToParent() {
  emit("update:email", $credentialForgotPassword.value.email);
  emit("next");
}

const { loading, message, alertType, $credentialForgotPassword, $requestForgotPassword } = useAuth({
  usedBy: props.usedBy as "admin" | "user",
  callback: updateToParent
})

</script>
<template>
  <VeeForm
    @submit="$requestForgotPassword"
    :validation-schema="onlyEmailSchema"
  >
    <div class="grid grid-cols-1 w-[450px] text-left gap-4 p-4 rounded-md shadow">
      <UIAlert
        v-model="message"
        :type="alertType"
      />
      <UIFormGroup
        label="Email"
        name="email"
      >
        <UIFormTextField
          name="email"
          v-model="$credentialForgotPassword.email"
          placeholder="ex:myemail@gmail.com"
          class="input-bordered"
        />
      </UIFormGroup>
      <div>
        <p class="text-gray-400">We will send a code to your email</p>
      </div>

      <div>
        <UIBtn
          variant="success"
          type="submit"
          :disabled="loading"
        >
          Submit
        </UIBtn>
      </div>
    </div>
  </VeeForm>
</template>



<style scoped></style>
