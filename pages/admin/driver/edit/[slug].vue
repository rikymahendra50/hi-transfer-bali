<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack link="/admin/driver" title="Edit Driver" />

    <UIFormDriver buttonTitle="Edit Driver" :driver="data?.data" />
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
  title: "Edit Driver",
});

const { data, error, refresh } = await useAsyncData("destinasiDetail", () =>
  $fetch(`/admins/drivers/${slug.value}`, {
    method: "get",
    ...requestOptions,
  })
);
</script>
