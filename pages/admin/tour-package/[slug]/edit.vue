<template>
  <div class="px-5 py-6 md:px-10 md:py-10">
    <TitleBack title="Edit tour package" link="/admin/tour-package" />
    <UIFormTourPackage />
  </div>
</template>

<script setup lang="ts">
const { transportSchema } = useSchema();
const { locale } = useI18n();
const { requestOptions } = useRequestOptions();
const route = useRoute();
const slug = computed(() => route.params.slug as string);

definePageMeta({
  layout: "admin",
  // @ts-ignore
  // middleware: ["auth", "admin"],
});

useHead({
  title: "Edit Transport",
});

// const { data } = await useAsyncData("blogdetail", () =>
//   $fetch(`/admins/articles/${slug.value}?lang=${locale.value}`, {
//     method: "GET",
//     ...requestOptions,
//   })
// );

const dataTransport = ref({
  name: "Audi R7",
  slug: "audi-r7",
  status: "Tersedia",
  driver: "Riky",
  maxpenumpang: 5,
  maxkoperkg: 10,
  facility: [
    {
      id: 1,
      name: "Gratis tol",
    },
    {
      id: 2,
      name: "Gratis parking",
    },
  ],
});

// async function onSubmit(values, ctx) {
//   loading.value = true;

//   const object = { ...form.value };

//   const formDataT = new FormData();

//   for (const item in object) {
//     // @ts-ignore
//     const objectItem = object[item];
//     formDataT.append(item, objectItem);
//   }
//   if (selectedImageThumbnail.value) {
//     formDataT.append("image", selectedImageThumbnail.value);
//   }
//   if (selectedImageBackground.value) {
//     formDataT.append("background", selectedImageBackground.value);
//   }

//   const { error, data } = await useFetch(`/api/v1/admin/deck`, {
//     method: "POST",
//     body: formDataT,
//     headers: {
//       Accept: "application/json",
//     },
//     ...requestOptions,
//   });

//   if (error.value) {
//     ctx.setErrors(transformErrors(error?.value));
//     snackbar.add({
//       type: "error",
//       text: error.value?.data?.error?.title ?? "Something went wrong",
//     });
//   } else if (data) {
//     snackbar.add({
//       type: "success",
//       text: "Add Deck Success",
//     });
//     router.push(`/admin/decks/edit/${data.value.data?.id}`);
//   }

//   loading.value = false;
// }
</script>
