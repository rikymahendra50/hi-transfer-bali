<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack title="Edit Mobil" link="/admin/transport" />
    <UIFormTransport :transport="data?.data" buttonTitle="Simpan mobil" />
  </div>
</template>

<script setup lang="ts">
const { transportSchema } = useSchema();
const { locale } = useI18n();
const { requestOptions } = useRequestOptions();
const route = useRoute();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Edit Transport",
});

const slug = computed(() => route.params.slug as string);

const { data } = await useAsyncData("car", () =>
  $fetch(`/admins/cars/${slug.value}`, {
    method: "GET",
    ...requestOptions,
  })
);
</script>
