<script
  setup
  lang="ts"
>


interface Prop {
  email: string
  pin: string
  usedBy: "user" | "admin"
}

const props = withDefaults(defineProps<Prop>(), {
  usedBy: "user"
})

const router = useRouter()

function updateToParent() {
  router.push(props.usedBy === 'user' ? '/sign-in' : '/admin/sign-in')
}

const { loading, message, alertType, $setNewPasswordForgotPassword, $credentialForgotPassword } = useAuth({
  usedBy: props.usedBy,
  callback: updateToParent
})
const { resetPasswordSchema } = useSchema()

onMounted(() => {
  $credentialForgotPassword.value.email = props.email
  $credentialForgotPassword.value.pin = props.pin
})


</script>
<template>
  <VeeForm
    @submit="$setNewPasswordForgotPassword"
    :validation-schema="resetPasswordSchema"
  >
    <div class="grid grid-cols-1 w-[450px] text-left gap-4 p-4 rounded-md shadow">
      <Alert
        v-model="message"
        :type="alertType"
      />
      <FormGroup
        label="Passowrd"
        name="password"
      >
        <FormTextField
          v-model="$credentialForgotPassword.password"
          name="password"
          placeholder="*******"
          type="password"
          class="input input-bordered"
        />
      </FormGroup>
      <FormGroup
        label="Confirm Passowrd"
        name="confirm_password"
      >
        <FormTextField
          v-model="$credentialForgotPassword.confirm_password"
          name="confirm_password"
          type="password"
          placeholder="*******"
          class="input input-bordered"
        />
      </FormGroup>
      <div>
        <p class="text-gray-400">We will send a code to your email</p>
      </div>

      <div>
        <button
          :disabled="loading"
          class="btn btn-success"
        >Submit</button>
      </div>
    </div>
  </VeeForm>
</template>



<style scoped></style>
