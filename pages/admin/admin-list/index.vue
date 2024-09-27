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
    <table class="table">
      <thead>
        <tr>
          <th>
            <div class="text-[#989393]">Profile picture</div>
          </th>
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
            <img
              :src="item.profile_picture ?? '-'"
              alt=""
              class="rounded-full w-10 h-10"
            />
          </td>
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
            <div class="font-medium text-[14px] text-black">
              {{ item.is_active === 0 ? "Tidak aktif" : "Aktif" }}
            </div>
          </td>
          <td class="text-sm font-normal">
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
                  <button
                    @click="showModalDeleteFunc(hide, item.id)"
                    type="button"
                    class="hover:bg-red-600 hover:text-white py-2 px-3"
                  >
                    Delete
                  </button>
                </div>
              </template>
            </VDropdown>
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
    </div>
  </div>
</template>

<script setup>
const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const { locale, t: $t } = useI18n();
const page = ref(1);

useHead({
  title: "Admin list",
});

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

const { data, error, refresh } = await useAsyncData("admin-list", () =>
  $fetch(`/admins?page=${page.value}`, {
    method: "get",
    ...requestOptions,
  })
);

onMounted(async () => {
  await nextTick();

  stop();

  if (route.query.page) {
    page.value = Number(route.query.page);
  }
});

const { start, stop } = useTimeoutFn(() => {
  replaceWindow();
}, 1000);

watch(page, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    start();
  }
});

function replaceWindow() {
  router.replace(
    withQuery("/admin/user-admin", {
      page: page.value,
    })
  );
  refresh();
}
</script>
