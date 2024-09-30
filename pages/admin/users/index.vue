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
        <th>
          <div>Status</div>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data?.data">
        <td class="text-sm font-normal">
          <div class="font-medium text-[14px] text-black">
            {{ item?.first_name }} {{ item?.last_name }}
          </div>
        </td>
        <td class="text-sm font-normal text-[#989393]">{{ item?.email }}</td>
        <td class="text-sm font-normal text-[#989393]">
          <div class="px-3 py-1 w-fit rounded-xl">{{ item?.phone }}</div>
        </td>
        <td>
          <div>
            {{ item?.is_active === 1 ? "Aktif" : "Tidak Aktif" }}
          </div>
        </td>
        <!-- <td>
          <div class="flex items-center">
          </div>
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
          {{ data?.meta?.total }} Pengguna
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

const { data, error, refresh } = await useAsyncData("users", () =>
  $fetch(`/admins/users?page=${page.value}`, {
    method: "get",
    ...requestOptions,
  })
);
</script>
