import type { AuthCredential } from "@/types";
export default function () {
  const config = useRuntimeConfig();

  const defaultRedirect = "/sign-in";

  const credential = useCookie<AuthCredential | null>("auth-token", {
    expires: new Date(Date.now() + 12096e5), // 2 weeks from now
    sameSite: "lax",
    path: "/",
    watch: true,
  });

  async function clearCredential() {
    if (process.client) {
      useCookie("auth-token").value = null;
      window.location.replace(defaultRedirect);
    }
  }

  function onRequest(context: any) {
    context.options.headers = context.options.headers || {};
    context.options.headers.authorization = credential.value?.token
      ? "Bearer " + credential.value?.token
      : "";
  }

  function onResponseError(context: any) {
    if (context.response.status === 401) {
      return clearCredential();
    }
  }

  const requestOptions = {
    baseURL: config.public.API_ENDPOINT,
    onRequest: (Context: any) => onRequest(Context),
    onResponseError: (context: any) => onResponseError(context),
  };
  return {
    requestOptions,
  };
}
