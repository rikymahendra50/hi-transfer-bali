<template>
  <TitleAdmin title="Pengguna" subTitle="Kelola daftar pengguna Anda disini">
  </TitleAdmin>

  <table class="table">
    <thead>
      <tr>
        <th>
          <div class="text-[#989393]">Full Name</div>
        </th>
        <th>
          <div>Email</div>
        </th>
        <th>
          <div>Phone Number</div>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-sm font-normal">
          <div class="font-medium text-[14px] text-black">Nama users</div>
        </td>
        <td class="text-sm font-normal text-[#989393]">@gmail.com</td>
        <td class="text-sm font-normal text-[#989393]">
          <div class="px-3 py-1 w-fit rounded-xl">0880</div>
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
                    :to="`/admin/transport/edit/`"
                    class="hover:bg-orange-400 hover:text-white py-2 px-3"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="showModalDeleteFunc(hide, 'test')"
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
          {{ data?.meta?.total }} Pengguna
        </p>
      </div>
    </div>
    <div class="font-medium text-[14px] text-[#344054] flex items-center gap-3">
      <PaginationAdmin
        v-model="page"
        :total="5"
        :includeFirstLast="false"
        :per-page="5"
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
        <p>Apakah anda yakin untuk menghapus user ini ?</p>
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
          @click.prevent="deleteItemFunc"
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
const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Destinasi",
});

const page = ref(1);
const showModalDelete = ref(false);
const currentId = ref(undefined);

function showModalDeleteFunc(hide, id) {
  showModalDelete.value = !showModalDelete.value;
  hide();

  if (showModalDelete.value) {
    currentId.value = id;
  }
}

async function deleteItemFunc() {
  // loading.value = true;
  // const { error } = await useFetch(`/api/v1/admin/deck/${currentId.value}`, {
  //   method: "delete",
  //   ...requestOptions,
  // });
  // if (error.value) {
  //   snackbar.add({
  //     type: "error",
  //     text: error.value?.message ?? "Something went wrong",
  //   });
  // } else {
  //   snackbar.add({
  //     type: "success",
  //     text: "Delete Decks Success",
  //   });
  //   showModalDelete.value = false;
  //   start();
  // }
  // loading.value = false;
}
</script>
