<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack title="Tambah paket tur baru" link="/admin/tour-package" />
    <UIFormTourPackage />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Add Paket tur",
});
</script>
