<template>
  <div class="">
    <TitleAdmin title="Daftar Admin" subTitle="Kelola daftar admin ">
      <NuxtLink
        to="/admin/admin-list/add"
        class="border-2 py-4 px-6 rounded-[8px] shadow-xs font-medium text-black"
      >
        Tambah Admin baru
      </NuxtLink>
    </TitleAdmin>

    <!-- <table class="table">
      <thead>
        <tr>
          <th>
            <div class="text-[#989393]">List Admin</div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data?.data">
          <td class="text-sm font-normal">
            <div class="font-medium text-[14px] text-black">
              {{ item.name }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="flex flex-col md:flex-row items-center justify-between gap-3 w-full py-3 px-3"
    >
      <div class="flex items-center gap-3">
        <div class="py-2 px-3 rounded-[8px]">
          <p class="font-medium text-[12px] md:text-sm text-[#121212]">
            {{ data?.meta?.from }} - {{ data?.meta?.to }} of
            {{ data?.meta?.total }} item
          </p>
        </div>
      </div>
      <div
        class="font-medium text-[14px] text-[#344054] flex items-center gap-3"
      >
        <PaginationAdmin
          v-model="page"
          :total="data?.meta?.total"
          :includeFirstLast="false"
          :per-page="data?.meta?.per_page"
          class="flex justify-center"
        />
      </div>
    </div> -->
  </div>
</template>

<script setup>
const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const { locale, t: $t } = useI18n();

useHead({
  title: "Admin list",
});

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

// const { data, error, refresh } = await useAsyncData("destinasi", () =>
//   $fetch(`/admins/locations?page=${page.value}`, {
//     method: "get",
//     ...requestOptions,
//   })
// );

function replaceWindow() {
  let filters = [];
  // if (selectedLocation.value) {
  //   filters.push(`destinations=${selectedLocation.value}`);
  // }
  // if (selectedCategory.value) {
  //   filters.push(`category=${selectedCategory.value}`);
  // }
  //   if (filter.value.sort) {
  //     filters.push(`sort=${filter.value.sort}`);
  //   }

  const queryString = filters.join("&");
  const url = `/vehicles?${queryString ? `&${queryString}` : ""}`;

  router.replace(url);
}
</script>
