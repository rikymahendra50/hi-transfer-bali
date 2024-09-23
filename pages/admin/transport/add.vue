<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack link="/admin/transport" title="Tambah Mobil Baru" />

    <UIFormTransport buttonTitle="Tambah Mobil" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Add Transport",
});

const page = ref(1);
</script>
