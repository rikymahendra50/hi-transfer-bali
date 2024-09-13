<template>
  <div class="border shadow-sm rounded-[8px] py-4 px-4">
    <p class="text-black font-semibold">General</p>
    <div>
      <div class="hidden">
        <VeeField
          type="file"
          name="image_thumbnail"
          id="image_thumbnail"
          v-model="selectedImageThumbnail"
        />
      </div>

      <UIFormInputMultipleImage
        v-if="!pending"
        :product-slug="slug"
        :images-data="data?.data"
        @reload="onReload"
      />

      <!-- <VeeErrorMessage name="image" class="text-red-500" /> -->
    </div>
  </div>
</template>

<script setup>
const { transportSchema } = useSchema();
const { locale } = useI18n();
const { requestOptions } = useRequestOptions();
const route = useRoute();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Upload Images",
});

const slug = computed(() => route.params.slug);

const selectedImageThumbnail = ref();

const loading = ref(false);

const { data, refresh, pending } = await useAsyncData(`toursImage`, () =>
  $fetch(`/admins/tours/${slug.value}/images`, {
    method: "GET",
    ...requestOptions,
  })
);

function onReload() {
  refresh();
}
</script>
