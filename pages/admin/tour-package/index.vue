<template>
  <TitleAdmin
    title="Kelola Produk: Paket Tur"
    subTitle="Kelola paket tur Anda disini"
  >
    <NuxtLink
      to="/admin/tour-package/add"
      class="border-2 py-4 px-6 rounded-[8px] shadow-xs font-medium text-black"
    >
      Tambah Paket tur
    </NuxtLink>
  </TitleAdmin>

  <table class="table">
    <thead>
      <tr>
        <th>
          <div class="text-[#989393]">Nama Tur</div>
        </th>
        <th>
          <div>Harga</div>
        </th>
        <th>
          <div>Status tur</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-sm font-normal">
          <div class="font-medium text-[14px] text-black">Paket Tour</div>
        </td>
        <td class="text-sm font-normal text-[#989393]">Rp. 50.000</td>
        <td class="text-sm font-normal text-[#989393]">Tersedia</td>
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
                    :to="`/admin/tour-package/slug/images`"
                    class="hover:bg-orange-400 hover:text-white py-3 px-5 text-sm"
                  >
                    Upload Gambar
                  </NuxtLink>
                  <NuxtLink
                    :to="`/admin/tour-package/slug/edit`"
                    class="hover:bg-orange-400 hover:text-white py-3 px-5 text-sm"
                  >
                    Edit
                  </NuxtLink>
                  <div
                    class="flex items-start justify-start w-full hover:bg-red-600 hover:text-white text-sm"
                  >
                    <button type="button" class="py-3 px-5">Delete</button>
                  </div>
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
          <!-- {{ decks?.meta?.from }} - {{ decks?.meta?.to }} of
              {{ decks?.meta?.total }} card decks -->
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
  <!-- {{ data }} -->
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Tour Package",
});

const page = ref(1);
const showModalDelete = ref(false);
const currentId = ref(undefined);

const { data, error, refresh } = await useAsyncData("tours", () =>
  $fetch(`/admins/tours?page=${page.value}`, {
    method: "get",
    ...requestOptions,
  })
);

function showModalDeleteFunc(hide, id) {
  showModalDelete.value = !showModalDelete.value;
  hide();

  if (showModalDelete.value) {
    currentId.value = id;
  }
}
</script>
