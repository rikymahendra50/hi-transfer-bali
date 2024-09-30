<template>
  <TitleAdmin
    title="Kelola Pengemudi"
    subTitle="Kelola daftar pengemudi Anda disini"
  >
    <ButtonAddAdmin link="/admin/driver/add" name="Tambah driver baru" />
  </TitleAdmin>
  <table class="table">
    <thead>
      <tr>
        <th>
          <div class="text-[#989393]">Nama Pengemudi</div>
        </th>
        <th>
          <div>Nomor Telepon</div>
        </th>
        <th>
          <div>Email</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data?.data" :key="item.id">
        <td class="text-sm font-normal">
          <div class="font-medium text-[14px] text-black">
            {{ item?.name }}
          </div>
        </td>
        <td class="text-sm font-normal text-[#989393]">{{ item?.phone }}</td>
        <td class="text-sm font-normal text-[#989393]">{{ item?.email }}</td>
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
                    :to="`/admin/driver/edit/${item.id}`"
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

  <!-- modal delete -->
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
        <p>Apakah anda yakin untuk menghapus driver ini ?</p>
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
          @click.prevent="deleteDriver(currentId), (showModalDelete = false)"
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
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const page = ref(1);
import { withQuery } from "ufo";

if (route.query.page) {
  page.value = Number(route.query.page);
}

const showModalDelete = ref(false);
const currentId = ref(undefined);

const { data, error, refresh } = await useAsyncData("driver", () =>
  $fetch(`/admins/drivers?page=${page.value}`, {
    method: "get",
    ...requestOptions,
  })
);

const { selectedDriver, deleteDriver, loading } = useDriver({
  callback: refresh,
});

watch(page, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    router.replace(
      withQuery("/admin/driver", {
        page: newValue,
      })
    );
  }
});

function showModalDeleteFunc(hide, id) {
  showModalDelete.value = !showModalDelete.value;
  hide();

  if (showModalDelete.value) {
    currentId.value = id;
  } else {
    currentId.value = undefined;
  }
}

useHead({
  title: "Driver",
});

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});
</script>
