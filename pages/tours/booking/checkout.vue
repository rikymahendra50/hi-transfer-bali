<template>
  <div class="flex flex-col space-y-6">
    <div class="flex justify-between items-center">
      <div class="text-2xl font-semibold">{{ $t("data-peserta") }}</div>
    </div>
    <div class="space-y-4">
      <TourParticipantCard />
    </div>
    <div class="flex justify-between items-center">
      <div class="text-2xl font-semibold">{{ $t("data-pemesan") }}</div>
    </div>

    <div class="space-y-4">
      <TourOrdererCard />
    </div>

    <div class="flex justify-between items-center">
      <div class="text-2xl font-semibold">{{ $t("detail-harga") }}</div>
    </div>

    <div class="space-y-4">
      <TourDetailCheckoutInformation />

      <TourPriceCheckoutInformation />
    </div>
  </div>
</template>

<script setup>
const filter = ref({
  sort: "",
});
</script>

<style lang="scss" scoped></style>
