<script setup lang="ts">
interface Prop {
  email: string;
  pin: string;
  usedBy: "user" | "admin";
}

const props = withDefaults(defineProps<Prop>(), {
  usedBy: "user",
});

const router = useRouter();

function updateToParent() {
  router.push(props.usedBy === "user" ? "/sign-in" : "/admin/sign-in");
}

const {
  loading,
  message,
  alertType,
  $setNewPasswordForgotPassword,
  $credentialForgotPassword,
} = useAuth({
  usedBy: props.usedBy,
  callback: updateToParent,
});
const { resetPasswordSchema } = useSchema();

onMounted(() => {
  $credentialForgotPassword.value.email = props.email;
  $credentialForgotPassword.value.pin = props.pin;
});
</script>
<template>
  <VeeForm
    @submit="$setNewPasswordForgotPassword"
    :validation-schema="resetPasswordSchema"
  >
    <div
      class="grid grid-cols-1 w-[450px] text-left gap-4 p-4 rounded-md shadow"
    >
      <UIAlert v-model="message" :type="alertType" />
      <UIFormMGroup label="Password" name="password">
        <UIFormMTextField
          v-model="$credentialForgotPassword.password"
          name="password"
          placeholder="*******"
          type="password"
          class="input input-bordered"
        />
      </UIFormMGroup>
      <UIFormMGroup label="Confirm Password" name="confirm_password">
        <UIFormMTextField
          v-model="$credentialForgotPassword.confirm_password"
          name="confirm_password"
          type="password"
          placeholder="*******"
          class="input input-bordered"
        />
      </UIFormMGroup>
      <div>
        <p class="text-gray-400">{{ $t("kami-akan-mengirimkan") }}</p>
      </div>

      <div>
        <UIBtn :disabled="loading" variant="primary">Submit</UIBtn>
      </div>
    </div>
  </VeeForm>
</template>

<style scoped></style>
