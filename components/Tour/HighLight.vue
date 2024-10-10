<template>
  <div class="space-y-6 py-6">
    <h3 class="text-[32px] leading-[40px] font-semibold text-primary-dark">
      {{ $t("paket-tour") }}
    </h3>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <TourCard
        v-for="item in data?.data"
        :id="item.id"
        :key="item.id"
        :name="item.name"
        :description="item.locations"
        :image="item.thumbnail_image?.image"
        :price="item.price"
        :slug="`/tours/` + item.slug"
      />
    </div>
  </div>
</template>

<script setup>
const { transformErrors, loading } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const { locale, t: $t } = useI18n();

const { data, error, refresh } = await useAsyncData("popularTours", () =>
  $fetch(`/popular-tours?lang=${locale.value}`, {
    method: "get",
    ...requestOptions,
  })
);
</script>

<style scoped></style>
