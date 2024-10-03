<template>
  <footer class="bg-secondary text-white h-fit pt-10 pb-20 md:pt-5 md:pb-5">
    <UIContainer>
      <div class="flex flex-col w-full space-y-6">
        <div
          class="flex flex-col lg:flex-row lg:justify-between space-x-0 lg:space-x-8"
        >
          <div class="flex flex-col space-y-4 w-full">
            <div class="flex items-center gap-4">
              <img
                src="/hi-travel-white-logo.png"
                alt="hi-travel logo white"
                class="h-[60px] w-[60px] object-cover"
              />
              <div class="flex flex-col gap-2 border-l pl-3 border-opacity-20">
                <p>{{ $t("bagian-dari") }}</p>
                <img src="/kada-global-logo.svg" alt="kada-global-logo" />
              </div>
            </div>

            <div class="h-0.5 w-[80%] bg-zinc-300"></div>
            <div class="flex flex-col gap-2">
              {{ $t("pembayaranmu-aman-dengan") }}
              <img src="/logo-xendit.svg" alt="logo-xendit" class="w-[100px]" />
            </div>
          </div>
          <div class="max-w-2xl">
            <div
              class="grid grid-cols-1 lg:grid-cols-[1fr_1fr_110px_1fr] gap-6 lg:gap-2"
            >
              <div
                v-for="link in links"
                :key="link.group"
                class="flex flex-col space-y-4"
              >
                <h4 class="text-base font-semibold">{{ link.group }}</h4>
                <ul class="space-y-1">
                  <li v-for="item in link.items" :key="item.label">
                    <a :href="item.link" class="link link-hover text-sm">{{
                      item.label
                    }}</a>
                  </li>
                </ul>
              </div>

              <div class="flex flex-col space-y-4">
                <h4 class="text-base font-semibold">
                  {{ $t("ikuti-kami-di") }}
                </h4>
                <ul class="space-y-1">
                  <li v-for="item in socialMedias" :key="item.label">
                    <a
                      :to="item.link"
                      target="_blank"
                      class="link link-hover inline-flex space-x-2"
                    >
                      <Icon :name="item.icon" class="w-4 h-4" />
                      <div class="text-sm">
                        {{ item.label }}
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="flex flex-col space-y-4">
                <h4 class="text-base font-semibold">{{ $t("kontak-kami") }}</h4>
                <ul class="space-y-1">
                  <li v-for="item in contact" :key="item.label">
                    <div class="font-semibold">{{ item.title }}</div>
                    <a
                      :href="item.link"
                      target="_blank"
                      class="link link-hover inline-flex"
                    >
                      <div class="text-sm">
                        {{ item.label }}
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UIContainer>
    <div class="h-0.5 w-full"></div>
    <UIContainer>
      <div class="h-2 w-full text-center pt-4">
        <p class="text-sm">
          ©{{ fullYear }} Hi Transfer Bali. All rights reserved. | Design &
          Development by
          <a href="https://spdigitalagency.com" target="_blank">s.p. Digital</a>
        </p>
      </div>
    </UIContainer>
  </footer>
</template>

<script lang="ts" setup>
const fullYear = new Date().getFullYear();
const { locale, t: $t } = useI18n();

const { contact, socialMedias } = useCompanyBase();

const links = [
  {
    group: $t("layanan-kami"),
    items: [
      {
        icon: "",
        label: "Transport",
        link: "/#learnmore",
      },
      {
        icon: "",
        label: "Packet Tour",
        link: "/#learnmore",
      },
    ],
  },
  {
    group: $t("pusat-bantuan"),
    items: [
      {
        icon: "",
        label: $t("kebijakan-privasi"),
        link: "/privacy-policy",
      },
      {
        icon: "",
        label: $t("syarat-dan-ketentuan"),
        link: "/terms-condition",
      },
      {
        icon: "",
        label: $t("ketentuan-dan-pengembalian-dana"),
        link: "/terms-and-refunds",
      },
    ],
  },
];
</script>

<style></style>
