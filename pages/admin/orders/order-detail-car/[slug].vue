<template>
  <TitleAdminBack
    title="Ringkasan Pesanan"
    :subTitle="`Informasi lengkap untuk pesanan #${data?.data?.uuid ?? ''}`"
    link="/admin/orders/order-cars"
  >
    <div>
      <div
        class="border-2 shadow-xs p-3 rounded-xl"
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
              : data?.data?.status === 'refunding'
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

  <div class="px-5 py-6 flex flex-col gap-3 border-b">
    <div class="text-gray-500 uppercase text-[12px] font-semibold">
      Informasi Pemesanan
    </div>
    <div class="grid md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <p class="font-semibold text-sm">Penjemputan</p>
        <p class="text-sm">{{ data?.data?.details[0]?.pickup_name }}</p>
        <div class="text-sm opacity-50">
          <a
            class="hover:text-primary font-medium"
            :href="`https://maps.google.com/?q=${data?.data?.details[0]?.pickup_latitude},${data?.data?.details[0]?.pickup_longitude}`"
            target="_blank"
          >
            {{ data?.data?.details[0]?.pickup_address }}
          </a>
        </div>
        <div class="text-sm">
          {{ formatDate(data?.data?.details[0]?.activity_date) ?? "" }}
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="font-semibold text-sm">Pengantaran</p>
        <p class="text-sm">
          {{ data?.data?.details[0]?.destination_name }}
        </p>
        <div class="text-sm opacity-50">
          <a
            target="_blank"
            class="hover:text-primary font-medium"
            :href="`https://maps.google.com/?q=${data?.data?.details[0]?.destination_latitude},${data?.data?.details[0]?.destination_longitude}`"
            >{{ data?.data?.details[0]?.destination_address }}</a
          >
        </div>
        <div class="text-sm">
          <div class="text-sm">
            {{
              data?.data?.details[1]?.activity_date
                ? formatDate(data?.data?.details[1]?.activity_date)
                : formatDate(data?.data?.details[0]?.activity_date)
            }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="data?.data?.details">
      <div
        class="bg-primary py-2 px-4 rounded-xl text-white w-fit"
        v-if="data?.data?.details?.length > 1"
      >
        <p>Bolak balik</p>
      </div>
      <div
        class="bg-primary py-2 px-4 rounded-xl text-white w-fit"
        v-else-if="data?.data?.details?.length == 1"
      >
        <p>Satu arah</p>
      </div>
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

<script setup>
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

const { transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const page = ref(1);
const showModalDelete = ref(false);
const currentId = ref(undefined);
const slug = computed(() => route.params.slug);
const { formatDate } = useFormatDate();

const { data, error, refresh } = await useAsyncData("ordersDetail", () =>
  $fetch(`/admins/car-orders/${slug.value}`, {
    method: "get",
    ...requestOptions,
  })
);
</script>
