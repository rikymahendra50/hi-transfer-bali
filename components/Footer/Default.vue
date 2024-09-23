<template>
  <footer class="bg-secondary text-white py-5">
    <UIContainer>
      <div class="flex flex-col w-full space-y-6">
        <div
          class="flex flex-col lg:flex-row lg:justify-between space-x-0 lg:space-x-8"
        >
          <div class="flex flex-col space-y-4 w-full">
            <img
              src="/hi-travel-white-logo.png"
              alt="hi-travel logo white"
              class="h-[60px] w-[60px] object-cover"
            />
            <div class="h-0.5 w-[80%] bg-zinc-300"></div>
            <div></div>
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
                    <a :to="item.link" class="link link-hover text-sm">{{
                      item.label
                    }}</a>
                  </li>
                </ul>
              </div>

              <div class="flex flex-col space-y-4">
                <h4 class="text-base font-semibold">Ikuti kami di</h4>
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
                <h4 class="text-base font-semibold">Kontak Kami</h4>
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
    <div class="h-0.5 w-full bg-zinc-300"></div>
    <UIContainer>
      <div class="h-8 w-full text-center">
        <p>
          ©{{ fullYear }} Hi Travel Bali. All rights reserved. | Design &
          Development by
          <a href="https://spdigitalagency.com" target="_blank">s.p. Digital</a>
        </p>
      </div>
    </UIContainer>
  </footer>
</template>

<script lang="ts" setup>
const fullYear = new Date().getFullYear();

const { contact, socialMedias } = useCompanyBase();

const links = [
  {
    group: "Layanan Kami",
    items: [
      {
        icon: "",
        label: "Transport",
        link: "#",
      },
      {
        icon: "",
        label: "Packet Tour",
        link: "#",
      },
    ],
  },
  {
    group: "Pusat Bantuan",
    items: [
      {
        icon: "",
        label: "Kebijakan Privasi",
        link: "#",
      },
      {
        icon: "",
        label: "Syarat dan Ketentuan",
        link: "#",
      },
      {
        icon: "",
        label: "Ketentuan Pengembalian Dana",
        link: "#",
      },
    ],
  },
];
</script>

<style></style>
