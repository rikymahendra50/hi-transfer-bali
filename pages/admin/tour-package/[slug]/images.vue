<template>
  <div class="m-5 flex flex-col gap-3">
    <TitleBack title="Kelola gambar paket tur" link="/admin/tour-package" />
    <div class="h-screen">
      <div class="h-[500px] m-3">
        <ImagesProduct
          v-if="!pending"
          :productSlug="slug"
          :images-data="data?.data"
          @reload="onReload"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const route = useRoute();

const { requestOptions } = useRequestOptions();

const slug = computed(() => {
  return route.params.slug as string;
});

const { data, refresh, pending } = await useAsyncData(`tourImageAdmin`, () =>
  $fetch(`/admins/tours/${slug.value}/images`, {
    method: "GET",
    ...requestOptions,
  })
);

function onReload() {
  refresh();
}

useHead({
  title: "Product Create",
});
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

onMounted(async () => {
  await nextTick();
  // if (!hasPermission("product")) {
  //   await router.push("/admin");
  // }
});
</script>

<style scoped></style>
