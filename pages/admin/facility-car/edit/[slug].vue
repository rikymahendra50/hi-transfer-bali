<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack link="/admin/facility-car" title="Edit fasilitas" />
    <UIFormFacilityCar buttonTitle="Edit Fasilitas" :facility="data?.data" />
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

const slug = computed(() => route.params.slug);

useHead({
  title: "Edit facility car",
});

const { data, error, refresh } = await useAsyncData("facilityDetail", () =>
  $fetch(`/admins/facilities/${slug.value}`, {
    method: "get",
    ...requestOptions,
  })
);
</script>
