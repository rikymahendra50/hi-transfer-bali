import type { AuthCredential } from "@/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const credential = useCookie<AuthCredential | null>("auth-token", {
    expires: new Date(Date.now() + 12096e5), // 2 weeks from now
    sameSite: "lax",
    path: "/",
    watch: true,
  });

  if (!credential.value?.token) {
    return await navigateTo("/sign-in");
  }
});
