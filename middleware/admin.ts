export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $isAdmin, $user, $fetchAuthProfile } = useAuth();

  await $fetchAuthProfile();

  if (!$isAdmin.value) {
    return await navigateTo("/");
  }

  if ($user.value?.is_active === 0) {
    return await navigateTo("/admin/inactive");
  }
});
