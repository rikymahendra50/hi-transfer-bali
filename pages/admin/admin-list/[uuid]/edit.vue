<template>
  <div class="space-y-6 px-5 py-4">
    <TitleBack link="/admin/admin-list" title="Edit Admin" />

    <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <FormAdmin @reload="reload" :user="data?.data" />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Edit Create",
});

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

const router = useRouter();

const route = useRoute();

const { hasPermission } = usePermission();

const { requestOptions } = useRequestOptions();

const { locale } = useI18n();

const uuid = computed(() => {
  return route.params.uuid as string;
});

const { data } = await useAsyncData("adminuserdetail", () =>
  $fetch(`/admins/${uuid.value}?lang=${locale.value}`, {
    method: "GET",
    ...requestOptions,
  })
);

const reload = () => {
  router.push("/admin/user-admin");
};

onMounted(async () => {
  await nextTick();
  if (!hasPermission("admin")) {
    await router.push("/admin");
  }
});
</script>

<style scoped></style>
