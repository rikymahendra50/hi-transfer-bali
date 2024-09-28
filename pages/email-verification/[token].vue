<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{{ title }}</h1>
        <p class="py-6">
          {{ message }}
        </p>
        <NuxtLink v-if="isSuccess" to="/sign-in" class="btn btn-primary"
          >Get Started</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const router = useRouter();

const { $verificationEmail } = useAuth();

const token = computed(() => {
  return route.params.token as string;
});

const message = ref("");
const isSuccess = ref(true);
const title = ref("Email Verification");

async function tokenVerify() {
  const { data, error } = await $verificationEmail(token.value);
  //   console.log(token.value);
  // console.log(data, error);

  if (error) {
    message.value = error?.data?.message as string;
    isSuccess.value = false;
    title.value = "Email Verification Failed";
  } else {
    message.value = "Your email has been verified";
  }
}

onMounted(async () => {
  if (token.value) {
    await tokenVerify();
  } else {
    router.push("/");
  }
});

useHead({
  title: "Email Verification",
});
</script>

<style></style>
