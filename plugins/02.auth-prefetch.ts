export default defineNuxtPlugin({
  name: "02.auth-prefetch",
  enforce: "post", // working on client
  async setup() {
    const { $isLoggedIn,$fetchAuthProfile } = useAuth();
    if ($isLoggedIn.value) {
      await $fetchAuthProfile();
    }
  },
});
