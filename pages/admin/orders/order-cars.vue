<template>
  <CommonHeadPage title="Order mobil" description="Kelola order mobil">
    <div class="flex flex-row gap-2">
      <NuxtLink
        to="/admin/orders"
        class="border-2 px-3 py-2 rounded-lg btn bg-primary text-white"
      >
        <p class="text-sm">Lihat Orders tour >></p>
      </NuxtLink>
    </div>
  </CommonHeadPage>

  <!-- list for car -->
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>
            <div class="text-[#989393]">OrderID</div>
          </th>
          <th>
            <div class="text-[#989393]">Customers Name</div>
          </th>
          <th>
            <div class="text-[#989393]">Contact Information</div>
          </th>
          <th>
            <div class="text-[#989393]">Phone</div>
          </th>
          <th>
            <div class="text-[#989393]">Total Price</div>
          </th>
          <th>Payment Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="item in data?.data">
          <td class="text-sm font-normal text-[#989393]">#{{ item.uuid }}</td>
          <td class="">{{ item.name ?? "-" }}</td>
          <td>
            <div class="text-[#989393] !font-normal">
              {{ item.email ?? "-" }}
            </div>
          </td>
          <td>
            <div class="text-[#989393] !font-normal">
              {{ item.phone_number ?? "-" }}
            </div>
          </td>
          <td>
            {{ FormatMoneyDash(item.grand_total_purchased.toString(), "IDR") }}
          </td>
          <td>
            <div
              class="w-fit py-2 px-3 rounded-xl text-black"
              :style="{
                backgroundColor:
                  item.status === 'waiting_for_payment'
                    ? '#f2ec72'
                    : item.status === 'canceled'
                    ? '#f2727b'
                    : item.status === 'paid'
                    ? '#f2ec72'
                    : item.status === 'failed'
                    ? '#f2727b'
                    : item.status === 'refunding'
                    ? '#f2727b'
                    : 'transparent',
              }"
            >
              {{ item.status }}
            </div>
          </td>
          <td>
            <div class="flex items-center">
              <!-- <VDropdown>
                <div class="flex items-center justify-center">
                  <button
                    class="flex items-center justify-center cursor-pointer"
                  >
                    <Icon
                      name="pepicons-pencil:dots-y"
                      class="text-[#717171]"
                    />
                  </button>
                </div>
                <template #popper="{ hide }">
                  <div class="bg-white flex flex-col shadow">
                    <NuxtLink
                      :to="`/admin/orders/order-detail-car/${item.uuid}`"
                      class="hover:bg-orange-400 hover:text-white py-3 px-5"
                    >
                      Detail
                    </NuxtLink>
                  </div>
                </template>
              </VDropdown> -->
              <NuxtLink
                :to="`/admin/orders/order-detail-car/${item?.uuid}`"
                class="btn bg-transparent"
              >
                <Icon name="fluent:eye-12-regular" class="text-primary" />
              </NuxtLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- end list for car -->

  <!-- pagination -->
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
  <!-- end pagination -->
</template>

<script setup>
import { withQuery } from "ufo";
const { locale, t: $t } = useI18n();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Orders car",
});

const { transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();

const page = ref(1);
const showModalDelete = ref(false);
const currentId = ref(undefined);

const { data, error, refresh } = await useAsyncData("orders", () =>
  $fetch(`/admins/car-orders?page=${page.value}`, {
    method: "get",
    ...requestOptions,
  })
);

onMounted(async () => {
  if (route.query.page) {
    page.value = Number(route.query.page);
  }
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
    withQuery("/admin/orders/order-cars", {
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
