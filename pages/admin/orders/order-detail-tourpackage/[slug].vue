<template>
  <TitleAdminBack
    title="Ringkasan Pesanan"
    :subTitle="`Informasi lengkap untuk pesanan #${data?.data?.uuid}`"
    link="/admin/orders"
  >
    <div>
      <!-- <UIFormMGroup name="sort" label="Urut berdasarkan">
        <UIFormMSelect v-model="status.sort" name="sort">
          <option value="">Sudah Bayar</option>
          <option value="recommended">Belum bayar</option>
        </UIFormMSelect>
      </UIFormMGroup> -->
      <div
        class="shadow-xs p-3 rounded-xl"
        :style="{
          backgroundColor:
            data?.data?.status === 'waiting_for_payment'
              ? '#f2ec72'
              : data?.data?.status === 'canceled'
              ? '#f2727b'
              : data?.data?.status === 'paid'
              ? '#f2ec72'
              : data?.data?.status === 'failed'
              ? '#f2727b'
              : 'transparent',
        }"
      >
        {{ data?.data?.status }}
      </div>
    </div>
  </TitleAdminBack>

  <div class="px-5 py-4 flex flex-col gap-3 border-b">
    <div class="text-gray-500 uppercase text-[12px] font-semibold">
      Informasi Pelanggan
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Nama pelanggan:</p>
      <p>
        {{ data?.data?.user?.first_name + " " + data?.data?.user?.last_name }}
      </p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Email:</p>
      <p>{{ data?.data?.user?.email }}</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold text-sm">Nomor Telepon:</p>
      <p>{{ data?.data?.user?.phone }}</p>
    </div>
  </div>

  <div class="px-5 py-4 flex flex-col gap-3 border-b">
    <div class="text-gray-500 uppercase text-[12px] font-semibold">
      Informasi Pemesanan
    </div>

    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <div class="text-[#121212] font-semibold text-sm">Nama Tur</div>
            </th>
            <th>
              <div class="text-[#121212] font-semibold text-sm">
                Tanggal tur
              </div>
            </th>
            <th>
              <div class="text-[#121212] font-semibold text-sm">Quantity</div>
            </th>
            <th>
              <div class="text-[#121212] font-semibold text-sm">
                Total price
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data?.data?.details">
            <td>{{ item.name }}</td>
            <td>
              {{ data?.data?.activity_date }}
            </td>
            <td>{{ item.quantity ?? "-" }}</td>
            <td>{{ FormatMoneyDash(item.total_price.toString()) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="px-5 py-4 flex flex-col gap-3 border-b">
    <div class="text-gray-500 uppercase text-[12px] font-semibold">
      Informasi Peserta
    </div>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <div class="text-[#121212] font-semibold text-sm">
                Nama Peserta
              </div>
            </th>
            <th>
              <div class="text-[#121212] font-semibold text-sm">Kebangsaan</div>
            </th>
            <!-- <th>
              <div class="text-[#121212] font-semibold text-sm">Kategori</div>
            </th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data?.data?.forms">
            <td>{{ item.name }}</td>
            <td>{{ item.nationality ?? "-" }}</td>
            <!-- <td>-</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="px-5 py-4 flex flex-col gap-3">
    <div class="text-gray-500 uppercase text-[12px] font-semibold">
      Payment Information
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Payment Method</p>
      <p>{{ data?.data?.payment?.payment_method ?? "-" }}</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Payment Channel</p>
      <p>{{ data?.data?.payment?.payment_channel ?? "-" }}</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Payment Status</p>
      <p>{{ data?.data?.payment?.status }}</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Total Price</p>
      <p>
        {{ FormatMoneyDash(data?.data?.payment?.total_purchased.toString()) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withQuery } from "ufo";

// @ts-ignore
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

// @ts-ignore
useHead({
  title: "Order detail",
});

const status = ref({
  sort: "",
});

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Orders",
});

const { transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const page = ref(1);
const showModalDelete = ref(false);
const currentId = ref(undefined);
const slug = computed(() => route.params.slug);

const { data, error, refresh } = await useAsyncData("ordersDetail", () =>
  $fetch(`/admins/tour-orders/${slug.value}`, {
    method: "get",
    ...requestOptions,
  })
);
</script>
