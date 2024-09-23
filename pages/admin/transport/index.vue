<template>
  <TitleAdmin
    title="Kelola Produk: Transport"
    subTitle="Kelola daftar mobil Anda disini"
  >
    <ButtonAddAdmin link="/admin/transport/add" name="Tambah Mobil Baru" />
  </TitleAdmin>

  <table class="table">
    <thead>
      <tr>
        <th>
          <div class="text-[#989393]">Nama Mobil</div>
        </th>
        <th>
          <div>Harga Per KM</div>
        </th>
        <th>
          <div>Status mobil</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data?.data">
        <td class="text-sm font-normal">
          <div class="font-medium text-[14px] text-black">
            {{ item?.name }}
          </div>
        </td>
        <td class="text-sm font-normal text-[#989393]">
          {{ FormatMoneyDash(item?.price) }}
        </td>
        <td class="text-sm font-normal text-[#989393]">
          <StatusTrueOrFalse
            trueString="Tersedia"
            falseString="Tidak tersedia"
            :trueNumber="1"
            :falseNumber="0"
            :data="item.is_active"
          />
        </td>
        <td>
          <div class="flex items-center">
            <VDropdown>
              <div class="flex items-center justify-center">
                <button class="flex items-center justify-center cursor-pointer">
                  <Icon name="pepicons-pencil:dots-y" class="text-[#717171]" />
                </button>
              </div>
              <template #popper="{ hide }">
                <div class="bg-white flex flex-col shadow">
                  <NuxtLink
                    :to="`/admin/transport/edit/${item.slug}`"
                    class="hover:bg-orange-400 hover:text-white py-2 px-3"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="showModalDeleteFunc(hide, item.slug)"
                    type="button"
                    class="hover:bg-red-600 hover:text-white py-2 px-3"
                  >
                    Delete
                  </button>
                </div>
              </template>
            </VDropdown>
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
    <div class="font-medium text-[14px] text-[#344054] flex items-center gap-3">
      <PaginationAdmin
        v-model="page"
        :total="data?.meta?.total"
        :includeFirstLast="false"
        :per-page="data?.meta?.per_page"
        class="flex justify-center"
      />
    </div>
  </div>

  <!-- modal -->
  <modal
    v-model="showModalDelete"
    class="relative w-[90%] sm:w-[60%] lg:w-[40%]"
  >
    <div
      class="flex justify-center items-center flex-col p-2 sm:p-5 lg:p-10 overflow-auto"
    >
      <div
        class="flex flex-col items-center gap-3 lg:gap-5 text-center transition h-full"
      >
        <Icon
          name="ph:trash-duotone"
          style="color: #ff0000"
          class="w-12 h-12 md:w-20 md:h-20"
        />
        <p>Apakah anda yakin untuk menghapus transportasi ini ?</p>
      </div>
      <div
        class="grid grid-cols-1 lg:grid-cols-2 w-full gap-y-4 md:gap-x-6 mt-5"
      >
        <div
          class="btn bg-transparent border shadow"
          @click="showModalDelete = false"
        >
          <span>Batal</span>
        </div>
        <div
          @click.prevent="deleteTransport(currentId), (showModalDelete = false)"
          class="btn bg-red-600 text-white shadow"
        >
          <span>Hapus</span>
        </div>
      </div>
    </div>
  </modal>
  <!-- end modal -->
</template>

<script setup>
const { transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();

import { withQuery } from "ufo";

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Transport",
});

const page = ref(1);
const showModalDelete = ref(false);
const currentId = ref(undefined);

const { data, error, refresh } = await useAsyncData("transport", () =>
  $fetch(`/admins/cars?page=${page.value}`, {
    method: "get",
    ...requestOptions,
  })
);

const { selectedTransport, deleteTransport, loading } = useTransport({
  callback: refresh,
});

onMounted(async () => {
  if (route.query.page) {
    page.value = Number(route.query.page);
  }

  selectedTransport.value = data.value;
});

watch(page, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    start();
  }
});

const { start, stop } = useTimeoutFn(() => {
  replaceWindow();
}, 1000);

function replaceWindow() {
  router.replace(
    withQuery("/admin/transport", {
      page: page.value,
    })
  );
  refresh();
}

function showModalDeleteFunc(hide, id) {
  showModalDelete.value = !showModalDelete.value;
  hide();

  if (showModalDelete.value) {
    currentId.value = id;
  } else {
    currentId.value = undefined;
  }
}
</script>
