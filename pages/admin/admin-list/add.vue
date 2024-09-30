<template>
  <div class="space-y-6 px-5 py-4">
    <TitleBack link="/admin/admin-list" title="Tambah Admin" />

    <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <FormAdmin @reload="reload" />
    </div>
  </div>
</template>

<script setup>
// const { hasPermission } = usePermission();

useHead({
  title: "Admin Create",
});
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

const router = useRouter();

const reload = () => {
  router.push("/admin/admin-list");
};

onMounted(async () => {
  await nextTick();
});
</script>
