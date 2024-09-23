export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $isUser, $user } = useAuth();
  if (!$isUser.value) {
    return await navigateTo("/");
  }

  if ($user.value?.is_active === 0) {
    return await navigateTo("/user/inactive");
  }
});
