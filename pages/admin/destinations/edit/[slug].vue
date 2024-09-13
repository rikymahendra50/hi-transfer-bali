<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack link="/admin/destinations" title="Edit Destinasi" />

    <UIFormDestinations buttonTitle="Edit destinasi" :data="data" />
  </div>
</template>

<script setup>
const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();

const slug = computed(() => route.params.slug);

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Edit Destinasi",
});

const { data, error, refresh } = await useAsyncData("destinasiDetail", () =>
  $fetch(`/admins/locations/${slug.value}`, {
    method: "get",
    ...requestOptions,
  })
);
</script>
