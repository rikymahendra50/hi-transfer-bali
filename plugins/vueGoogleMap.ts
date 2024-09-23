import { defineNuxtPlugin } from "#app";
import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyCo9GfdUolCaUWAQi-tOonqQ3t2PPfJlMU",
      libraries: "places",
    },
  });
});
