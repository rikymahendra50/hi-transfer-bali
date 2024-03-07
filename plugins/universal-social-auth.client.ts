import axios from "axios";
import UniversalSocialauth, { Providers } from "universal-social-auth";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const options = {
    providers: {
      google: {
        clientId: config.public.GOOGLE_ID,
        client_secret: config.public.GOOGLE_SECRET,
        redirectUri: `${config.public.BASE_URL}/auth-redirect`,
      },
      // you can add more providers here
    },
  };
  // @ts-ignore
  const Oauth: UniversalSocialauth = new UniversalSocialauth(axios, options);

  return {
    provide: {
      Oauth,
      OauthProviders: (provider: string) => Providers[provider],
    },
  };
});
