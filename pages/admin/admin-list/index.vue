<template>
  <div class="">
    <TitleAdmin title="Daftar Admin" subTitle="Kelola daftar admin ">
      <ButtonAddAdmin link="/admin/admin-list/add" name="Tambah admin baru" />
    </TitleAdmin>
    <table class="table">
      <thead>
        <tr>
          <th>
            <div class="text-[#989393]">List Admin</div>
          </th>
          <th>
            <div class="text-[#989393]">Email</div>
          </th>
          <th>
            <div class="text-[#989393]">Status</div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data?.data">
          <td class="text-sm font-normal">
            <div class="font-medium text-[14px] text-black">
              {{ item.first_name + " " + item.last_name }}
            </div>
          </td>
          <td class="text-sm font-normal">
            <div class="font-medium text-[14px] text-black">
              {{ item.email }}
            </div>
          </td>
          <td class="text-sm font-normal">
            <StatusActive :status="item.is_active" />
          </td>
          <!-- <td class="text-sm font-normal">
            <VDropdown>
              <div class="flex items-center justify-center">
                <button class="flex items-center justify-center cursor-pointer">
                  <Icon name="pepicons-pencil:dots-y" class="text-[#717171]" />
                </button>
              </div>
              <template #popper="{ hide }">
                <div class="bg-white flex flex-col shadow">
                  <NuxtLink
                    :to="`/admin/admin-list/${item.uuid}/edit`"
                    class="hover:bg-orange-400 hover:text-white py-2 px-3"
                  >
                    Edit
                  </NuxtLink>
                </div>
              </template>
            </VDropdown>
          </td> -->
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
    </div>
  </div>
</template>

<script setup>
const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const page = ref(1);
import { withQuery } from "ufo";

useHead({
  title: "Admin list",
});

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

if (route.query.page) {
  page.value = Number(route.query.page);
}

const { data, error } = await useAsyncData("admin-list", () =>
  $fetch(`/admins?page=${page.value}`, {
    method: "get",
    ...requestOptions,
  })
);

watch(page, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    router.replace(
      withQuery("/admin/admin-list", {
        page: newValue,
      })
    );
  }
});
</script>
