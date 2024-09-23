<template>
  <div>
    <div class="">
      <div class="px-6 h-24 border-b flex flex-row items-center gap-4">
        <button
          class="block lg:hidden"
          @click="toggleDrawer"
          v-if="!drawer"
          type="button"
        >
          <Icon name="i-heroicons-bars-3" class="w-6 h-6 opacity-50" />
        </button>

        <button class="block lg:hidden" v-if="drawer" type="button">
          <Icon name="pajamas:close-xs" class="w-6 h-6 opacity-50" />
        </button>

        <NuxtLink
          class="link link-primary link-hover p-1 underline-offset-8 decoration-4 rounded"
          active-class="font-medium"
          to="/admin/orders"
          ><img
            src="/hi-transfer-logo.png"
            alt="logo"
            class="h-[60px] w-[60px]"
        /></NuxtLink>
      </div>
    </div>
    <div class="relative lg:static lg:grid lg:grid-cols-[300px_1fr]">
      <Transition
        enter-from-class="opacity-50"
        enter-to-class="transition-all duration-300 opacity-100"
        leave-from-class="transition-all duration-300 opacity-50 -translate-x-40"
        leave-to-class="opacity-0"
      >
        <aside
          ref="aside"
          class="absolute lg:static z-50 lg:z-0 min-h-screen w-[300px] border-r bg-white"
          v-if="drawer"
        >
          <div class="flex flex-col h-full">
            <div class="p-4 flex-grow flex-shrink h-full space-y-8">
              <ul class="space-y-2 lg:space-y-3.5">
                <li v-for="item in linksAllowed" :key="item.to">
                  <NuxtLink
                    :to="item.to"
                    class="inline-flex ring-1 ring-zinc-300 ring-offset-1 items-center space-x-2.5 hover:bg-primary hover:ring-primary text-zinc-400 hover:text-white transition-all duration-500 p-3 rounded-lg group w-full hover:scale-x-95 text-sm"
                    active-class="bg-primary !text-white !ring-primary"
                  >
                    <Icon :name="item.icon" class="h-5 w-5 opacity-80" />
                    <span class="text-sm">
                      {{ item.label }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
              <div class="space-y-2">
                <h4 class="font-semibold text-zinc-400">PRODUCTS</h4>
                <ul class="space-y-2 lg:space-y-3.5">
                  <li v-for="item in linksProducts" :key="item.to">
                    <NuxtLink
                      :to="item.to"
                      class="inline-flex ring-1 ring-zinc-300 ring-offset-1 items-center space-x-2.5 hover:bg-primary hover:ring-primary text-zinc-400 hover:text-white transition-all duration-500 p-3 rounded-lg group w-full hover:scale-x-95 text-sm"
                      active-class="bg-primary !text-white !ring-primary"
                    >
                      <Icon :name="item.icon" class="h-5 w-5 opacity-80" />
                      <span class="text-sm">
                        {{ item.label }}
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <div class="space-y-2">
                <h4 class="font-semibold text-zinc-400">Lokasi</h4>
                <ul class="space-y-2 lg:space-y-3.5">
                  <li v-for="item in linksDestinations" :key="item.to">
                    <NuxtLink
                      :to="item.to"
                      class="inline-flex ring-1 ring-zinc-300 ring-offset-1 items-center space-x-2.5 hover:bg-primary hover:ring-primary text-zinc-400 hover:text-white transition-all duration-500 p-3 rounded-lg group w-full hover:scale-x-95 text-sm"
                      active-class="bg-primary !text-white !ring-primary"
                    >
                      <Icon :name="item.icon" class="h-5 w-5 opacity-80" />
                      <span class="text-sm">
                        {{ item.label }}
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <div class="space-y-2">
                <h4 class="font-semibold text-zinc-400">OTHERS</h4>
                <ul class="space-y-2 lg:space-y-3.5">
                  <li v-for="item in linksOthers" :key="item.to">
                    <NuxtLink
                      :to="item.to"
                      class="inline-flex ring-1 ring-zinc-300 ring-offset-1 items-center space-x-2.5 hover:bg-primary hover:ring-primary text-zinc-400 hover:text-white transition-all duration-500 p-3 rounded-lg group w-full hover:scale-x-95 text-sm"
                      active-class="bg-primary !text-white !ring-primary"
                    >
                      <Icon :name="item.icon" class="h-5 w-5 opacity-80" />
                      <span class="text-sm">
                        {{ item.label }}
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mb-16 px-4 mt-10">
              <VDropdown>
                <div
                  class="flex items-center gap-2 border py-3 rounded-[8px] px-4 shadow-sm cursor-pointer"
                >
                  <img
                    :src="
                      data?.data?.profile_picture == ''
                        ? 'https://placehold.co/40'
                        : data?.data?.profile_picture
                    "
                    alt="profile"
                    class="w-6 h-6 rounded-full"
                  />
                  <p class="font-normal">
                    {{ data?.data?.first_name }} {{ data?.data?.last_name }}
                  </p>
                </div>
                <template #popper="{ hide }">
                  <div class="bg-white flex flex-col shadow w-fit">
                    <div
                      class="border-t hover:bg-primary hover:text-white py-2 px-3 flex items-center gap-2"
                    >
                      <Icon
                        name="iconamoon:profile-circle-thin"
                        class="w-6 h-6"
                      />
                      <NuxtLink :to="`/admin/profile`" @click.prevent="hide">
                        Profil saya
                      </NuxtLink>
                    </div>
                    <div class="border-t py-2 px-3 cursor-pointer">
                      <button
                        type="button"
                        @click="$logout"
                        class="flex flex-row space-x-2 items-center text-red-500 font-medium"
                      >
                        <Icon name="ic:baseline-logout" class="w-6 h-6" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </template>
              </VDropdown>
            </div>
          </div>
        </aside>
      </Transition>

      <div
        class="w-full absolute lg:static min-h-svh overflow-y-auto space-y-6 lg"
      >
        <main>
          <slot />
        </main>
        <UINotification />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { requestOptions } = useRequestOptions();

import {
  breakpointsTailwind,
  useBreakpoints,
  onClickOutside,
} from "@vueuse/core";

const linksAllowed = ref<
  {
    to: string;
    label: string;
    icon: string;
  }[]
>([
  {
    to: "/admin/orders",
    label: "Orders",
    icon: "bx:list-ol",
  },
  {
    to: "/admin/admin-list",
    label: "Admins",
    icon: "dashicons:admin-users",
  },
]);

const linksProducts = ref<
  {
    to: string;
    label: string;
    icon: string;
  }[]
>([
  {
    to: "/admin/transport",
    label: "Transport",
    icon: "bitcoin-icons:car-filled",
  },
  {
    to: "/admin/tour-package",
    label: "Paket Tur",
    icon: "icon-park-outline:beach-umbrella",
  },
]);

const linksDestinations = ref<
  {
    to: string;
    label: string;
    icon: string;
  }[]
>([
  {
    to: "/admin/destinations",
    label: "Daftar Destinasi",
    icon: "mdi:map-marker-radius",
  },
]);

const linksOthers = ref<
  {
    to: string;
    label: string;
    icon: string;
  }[]
>([
  {
    to: "/admin/users",
    label: "Pengguna",
    icon: "flowbite:users-group-solid",
  },
  {
    to: "/admin/driver",
    label: "Driver",
    icon: "mingcute:steering-wheel-fill",
  },
  {
    to: "/admin/facility-car",
    label: "Facility Car",
    icon: "ion:diamond-outline",
  },
]);

const breakpoints = useBreakpoints(breakpointsTailwind);

const { $logout, $user } = useAuth();

const drawer = ref(null);

const tableOrLaptop = breakpoints.greater("lg");
const aside = ref();

onClickOutside(aside, () => {
  if (!tableOrLaptop.value && drawer.value) drawer.value = false;
});

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

onMounted(() => {
  if (tableOrLaptop.value && !drawer.value) {
    drawer.value = tableOrLaptop.value;
  }
});

watch(
  () => tableOrLaptop.value,
  (value) => {
    if (value && !drawer.value) {
      drawer.value = tableOrLaptop.value;
    }
  }
);

const { data, error, refresh } = await useAsyncData("adminsProfile", () =>
  $fetch(`/admins/profile`, {
    method: "get",
    ...requestOptions,
  })
);
</script>

<style lang="scss" scoped></style>
