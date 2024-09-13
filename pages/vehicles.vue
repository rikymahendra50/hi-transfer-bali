<template>
  <div>
    <div class="h-28"></div>
    <div class="w-full border-b" v-if="isVehiclePage">
      <UIContainer>
        <div
          class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full"
        >
          <div>
            <UIBtn variant="primary" outlined class="whitespace-nowrap"
              >Kembali ke Beranda</UIBtn
            >
          </div>
          <div class="w-full">
            <div
              class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-4 text-lg lg:text-xl font-semibold"
            >
              <div class="text-center">Bandara Int'l I Gusti Ngurah Rai</div>
              <div class="hidden lg:block text-center">
                <Icon name="i-heroicons-arrow-right" class="w-4 h-4" />
              </div>
              <div class="block lg:hidden text-center">
                <Icon name="i-heroicons-arrow-down" class="w-4 h-4" />
              </div>
              <div class="text-center">The Trans Resort Bali</div>
            </div>
            <div
              class="text-zinc-400 text-sm whitespace-nowrap text-center lg:text-left"
            >
              21 Juni 2024 | 2 Penumpang
            </div>
          </div>
        </div>
      </UIContainer>
    </div>
    <UIContainer>
      <div class="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 divide-x-2">
        <div class="space-y-6 py-4">
          <h3 class="text-2xl font-semibold text-primary-dark">
            Perjalanan Anda
          </h3>

          <div class="space-y-4">
            <VehicleAddressInformation />
            <div class="divider text-xs text-zinc-400">
              Perjalananmu sekitar 10,9km
            </div>
            <VehicleAddressInformation />
          </div>
        </div>
        <div class="p-4">
          <NuxtPage />
        </div>
      </div>
    </UIContainer>
    <div
      v-if="isVehicleBookingPage || isVehicleCheckoutPage"
      class="w-full border-b border-t"
    >
      <UIContainer>
        <div class="flex justify-end w-full">
          <div>
            <UIBtn
              v-if="isVehicleBookingPage"
              variant="primary"
              @click="gotoCheckout"
              class="whitespace-nowrap"
              >Lanjutkan</UIBtn
            >
            <UIBtn
              v-if="isVehicleCheckoutPage"
              variant="primary"
              @click="gotoCheckout"
              class="whitespace-nowrap"
              >Pesan Dan Bayar</UIBtn
            >
          </div>
        </div>
      </UIContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { btnSubmitClick } = useVehicleForm();

const isVehiclePage = computed(() => {
  return route.name === "vehicles";
});

const isVehicleBookingPage = computed(() => {
  return route.name === "vehicles-booking";
});

const isVehicleCheckoutPage = computed(() => {
  return route.name === "vehicles-checkout";
});

const gotoCheckout = () => {
  btnSubmitClick();
};
</script>

<style scoped></style>
