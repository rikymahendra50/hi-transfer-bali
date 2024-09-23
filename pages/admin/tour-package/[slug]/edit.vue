<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack title="Edit tour package" link="/admin/tour-package" />
    <UIFormTourPackage :tourPackage="data?.data" />
  </div>
</template>

<script setup>
const { transportSchema } = useSchema();
const { locale } = useI18n();
const { requestOptions } = useRequestOptions();
const route = useRoute();
const slug = computed(() => route.params.slug);

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Edit Paket tur",
});

const { data, error, refresh } = await useAsyncData("tours", () =>
  $fetch(`/admins/tours/${slug.value}`, {
    method: "get",
    ...requestOptions,
  })
);
</script>
