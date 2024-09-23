<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack link="/admin/facility-car" title="Tambah fasilitas baru" />
    <UIFormFacilityCar buttonTitle="Tambah Fasilitas" />
  </div>
</template>

<script setup>
const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Add facility car",
});
</script>
