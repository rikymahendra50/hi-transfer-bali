<template>
  <TitleAdmin
    title="Kelola Fasilitas Mobil"
    subTitle="Kelola daftar fasilitas untuk daftar mobil disini"
  >
    <ButtonAddAdmin
      link="/admin/facility-car/add"
      name="Tambah Fasilitas mobil"
    />
  </TitleAdmin>

  <table class="table">
    <thead>
      <tr>
        <th>
          <div class="text-[#989393] md:ml-1">Nama Fasilitas</div>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data?.data" :key="item.id">
        <td class="text-sm font-normal md:pl-5">
          <div class="font-medium text-[14px] text-black">
            {{ item?.description }}
          </div>
        </td>
        <td>
          <div class="flex justify-center">
            <VDropdown>
              <div class="flex items-center justify-center">
                <button class="flex items-center justify-center cursor-pointer">
                  <Icon name="pepicons-pencil:dots-y" class="text-[#717171]" />
                </button>
              </div>
              <template #popper="{ hide }">
                <div class="bg-white flex flex-col shadow">
                  <NuxtLink
                    :to="`/admin/facility-car/edit/${item.id}`"
                    class="hover:bg-orange-400 hover:text-white py-2 px-3"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="showModalDeleteFunc(hide, item?.id)"
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
          class="w-12 h-12 md:w-20 md:h-20 text-[#ff0000]"
        />
        <p>Apakah anda yakin untuk menghapus fasilitas mobil ini ?</p>
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
          @click.prevent="deleteFacility(currentId), (showModalDelete = false)"
          class="btn bg-red-600 text-white shadow"
        >
          <span>Hapus</span>
        </div>
      </div>
    </div>
  </modal>
  <!-- end modal -->

  <!-- <pre>
    {{ data }}
  </pre> -->
</template>

<script setup>
const { transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Facility Car",
});

const page = ref(1);
const showModalDelete = ref(false);
const currentId = ref(undefined);

function showModalDeleteFunc(hide, id) {
  showModalDelete.value = !showModalDelete.value;
  hide();

  if (showModalDelete.value) {
    currentId.value = id;
  } else {
    currentId.value = undefined;
  }
}

const { data, error, refresh } = await useAsyncData("facility", () =>
  $fetch(`/admins/facilities?page=${page.value}`, {
    method: "get",
    ...requestOptions,
  })
);

const { selectedFacility, deleteFacility, loading } = useFacility({
  callback: refresh,
});

onMounted(async () => {
  selectedFacility.value = data.value;
});
</script>
