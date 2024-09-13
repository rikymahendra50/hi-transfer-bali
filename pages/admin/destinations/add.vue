<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack link="/admin/destinations" title="Tambah Destinasi Baru" />

    <UIFormDestinations buttonTitle="Tambah destinasi" />
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
  title: "Add Destinasi",
});
</script>
