<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack link="/admin/driver" title="Tambah Driver Baru" />

    <UIFormDriver buttonTitle="Tambah Driver" />
  </div>
</template>

<script setup>
const { requestOptions } = useRequestOptions();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Add Driver",
});

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Add Driver",
});
</script>
