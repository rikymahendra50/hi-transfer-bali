<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack title="Edit Mobil" link="/admin/transport" />
  </div>
</template>

<script setup>
const { requestOptions } = useRequestOptions();
const route = useRoute();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Edit user",
});

const slug = computed(() => route.params.slug);

const { data } = await useAsyncData("car", () =>
  $fetch(`/admins/users/${slug.value}`, {
    method: "GET",
    ...requestOptions,
  })
);
</script>
