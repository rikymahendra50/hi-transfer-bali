/**
 * replace with actual title or name of the project
 */
const projectName = "Hai Transfer Bali";
/**
 * replace with actual description for seo
 */
const projectDescription =
  "Safe and Comfortable Transfer in Bali. A fleet of modern vehicles and experienced drivers are ready to take you wherever you want.";
/**
 * replace with actual image for thumbnail
 *
 */
const projectImageThumbnail = "/hai_bali_thumbnail.jpeg";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "nuxt-swiper",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "floating-vue/nuxt",
    "@pinia/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  imports: {
    dirs: ["stores"],
  },

  image: {
    format: ["webp"],
    domains: ["https://unsplash.com", "https://haitransferbali.com"],
  },

  devServer: {
    /**
     * you can change the port number according to your needs
     *
     */
    port: 3013,
  },

  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.API_ENDPOINT ?? "http://localhost:3000",
      APP_DOMAIN: process.env.APP_DOMAIN ?? "http://localhost:3000",
    },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },

  app: {
    head: {
      titleTemplate: `%s - ${projectName}`,

      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "robots",
          content:
            process.env.APP_STATUS === "PRODUCTION"
              ? "index, follow"
              : "noindex, nofollow",
        },
        {
          hid: "description",
          name: "description",
          content: "",
        },
        {
          name: "author",
          content: projectName,
        },

        // Open Graph Meta
        {
          property: "og:title",
          content: projectName,
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://haitransferbali.com/",
        },
        { property: "og:image", content: projectImageThumbnail },
        { property: "og:description", content: projectDescription },
        {
          property: "og:site_name",
          content: projectName,
        },
        // Twitter Meta
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "",
        },
        { name: "twitter:description", content: "" },
        { name: "twitter:image", content: projectImageThumbnail },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/hai_bali.png" }],
    },
  },

  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: "en",
    },
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "id",
        name: "Indonesia",
        file: "id.json",
      },
    ],
    lazy: false,
    langDir: "internationalization",
    defaultLocale: "en",
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1500,
    },
  },

  build: {
    // @see https://github.com/fawmi/vue-google-maps/issues/150#issuecomment-1238108805
    transpile: [
      "@fawmi/vue-google-maps",
      "@googlemaps/markerclusterer",
      "vue-sonner",
    ],
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
      Form: "VeeForm",
    },
  },
});
