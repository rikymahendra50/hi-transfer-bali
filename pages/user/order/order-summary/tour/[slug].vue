<template>
  <div class="h-44 sm:h-28"></div>
  <div class="w-full border-b">
    <UIContainer>
      <div class="flex items-center gap-4">
        <NuxtLink to="/user">
          <Icon name="formkit:arrowleft" class="text-black w-7 h-7" />
        </NuxtLink>
        <div class="flex flex-col gap-1">
          <p class="text-black text-[18px] font-medium">
            {{ $t("ringkasan-pesanan") }}
          </p>
          <span class="text-sm">
            {{ $t("informasi-lengkap-pesanan") }} #{{
              tourOrderDetail?.data?.uuid
            }}</span
          >
        </div>
      </div>
      <div class="py-10">
        <div class="px-5 py-4 flex flex-col gap-3 border-b">
          <div class="text-gray-500 uppercase text-sm">
            {{ $t("informasi-pelanggan") }}
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">{{ $t("nama-pelanggan") }}:</p>
            <p>
              {{ tourOrderDetail?.data?.user?.first_name }}&nbsp;{{
                tourOrderDetail?.data?.user?.last_name
              }}
            </p>
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">Email:</p>
            <p>{{ tourOrderDetail?.data?.user?.email }}</p>
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold text-sm">{{ $t("nomor-telepon") }}:</p>
            <p>{{ tourOrderDetail?.data?.user?.phone }}</p>
          </div>
        </div>

        <div class="px-5 py-4 flex flex-col gap-3 border-b">
          <div class="text-gray-500 uppercase text-sm">
            {{ $t("informasi-pemesanan") }}
          </div>
          <div class="grid gap-3 md:grid-cols-2">
            <div class="flex flex-col gap-1 text-sm">
              <p class="text-[#121212] font-semibold">Activity Date</p>
              {{ formatDate(tourOrderDetail?.data?.activity_date) }}
            </div>
          </div>

          <div class="flex flex-col gap-1 text-sm">
            <div class="flex flex-col gap-3 border-b my-4">
              <div class="text-black uppercase text-[12px] font-semibold">
                {{ $t("details") }} :
              </div>
              <div class="overflow-x-auto">
                <table class="table">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th>
                        <div class="text-[#121212] font-semibold text-sm">
                          {{ $t("name") }}
                        </div>
                      </th>
                      <th>
                        <div class="text-[#121212] font-semibold text-sm">
                          {{ $t("quantity") }}
                        </div>
                      </th>
                      <th>
                        <div class="text-[#121212] font-semibold text-sm">
                          {{ $t("price") }}
                        </div>
                      </th>
                      <th>
                        <div class="text-[#121212] font-semibold text-sm">
                          Total {{ $t("price") }}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in tourOrderDetail?.data?.details">
                      <td>{{ item.name }}</td>
                      <td>
                        {{ item.quantity }}
                      </td>
                      <td>
                        {{
                          FormatMoneyDash(
                            locale == "id" ? item.price : item.usd_price,
                            locale == "id" ? "IDR" : "usd"
                          )
                        }}
                      </td>
                      <td>
                        {{
                          FormatMoneyDash(
                            locale == "id"
                              ? item.total_price
                              : item.total_usd_price,
                            locale == "id" ? "IDR" : "usd"
                          )
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- test -->
          <div class="flex flex-col gap-3 border-b my-4">
            <div class="text-black uppercase text-[12px] font-semibold">
              {{ $t("informasi-participant") }} :
            </div>
            <div class="overflow-x-auto">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr>
                    <th>
                      <div class="text-[#121212] font-semibold text-sm">
                        {{ $t("name") }}
                      </div>
                    </th>
                    <th>
                      <div class="text-[#121212] font-semibold text-sm">
                        {{ $t("nationality") }}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tourOrderDetail?.data?.forms">
                    <td>{{ item.name }}</td>
                    <td>
                      {{ item.nationality }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- end test -->
        </div>

        <div class="px-5 py-4 flex flex-col gap-3 border-b">
          <div class="text-gray-500 uppercase text-sm">
            {{ $t("payment-information") }}
          </div>
          <!-- <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">{{ $t("payment-method") }}</p>
            <p>{{ tourOrderDetail?.data?.payment_method }}</p>
          </div> -->
          <!-- <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">Promo</p>
            <p>{{ tourOrderDetail?.data?.promo_amount }}</p>
          </div> -->
          <div
            class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm"
            v-if="tourOrderDetail?.data?.refund_status"
          >
            <p class="font-semibold">Refund status</p>
            <p>{{ tourOrderDetail?.data?.refund_status }}</p>
          </div>
          <!-- <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">{{ $t("payment-channel") }}</p>
            <p>--------------</p>
          </div> -->
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold text-sm">{{ $t("payment-status") }}</p>
            <p>{{ tourOrderDetail?.data?.payment_status }}</p>
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold text-sm">{{ $t("total-price") }}</p>
            <p>
              {{
                FormatMoneyDash(
                  locale == "id"
                    ? tourOrderDetail?.data?.total_purchased
                    : tourOrderDetail?.data?.total_usd_purchased,
                  locale == "id" ? "IDR" : "usd"
                )
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-2">
        <!--  -->
        <button
          v-if="tourOrderDetail?.data?.payment_status === 'paid'"
          type="button"
          @click="showModalRefundFunc()"
          :disabled="loading"
          class="border-2 shadow-sm rounded-lg py-2 px-4 btn bg-white"
        >
          <!-- <p>{{ $t("pengembalian-pembayaran") }}</p> -->
          <p>{{ $t("cancel") }}</p>
        </button>
        <a
          v-if="tourOrderDetail?.data?.payment_status === 'pending'"
          :href="tourOrderDetail?.data?.payment_url"
          target="_blank"
          class="border-2 shadow-sm rounded-lg py-2 px-4 btn text-white bg-primary"
        >
          <p>Payment url</p>
        </a>

        <!-- <button
          v-else-if="
            tourOrderDetail?.data?.status === 'waiting_for_payment' &&
            tourOrderDetail?.data?.status !== 'cancel'
          "
          type="button"
          @click="cancelOrder()"
          :disabled="loading"
          class="border-2 shadow-sm rounded-lg py-2 px-4 btn bg-white"
        >
          <p>Cancel Order</p>
        </button> -->
        <!-- <div v-else-if="tourOrderDetail?.data?.status == 'completed'">
          Completed
        </div> -->
      </div>
    </UIContainer>
  </div>

  <modal
    v-model="showModalRefund"
    class="relative w-[90%] sm:w-[60%] lg:w-[40%]"
  >
    <div
      class="flex justify-center items-center flex-col px-2 sm:px-4 lg:px-5 overflow-auto"
    >
      <div class="flex flex-col gap-3 lg:gap-5 transition h-full">
        <p class="font-semibold text-xl">{{ $t("pengembalian-pembayaran") }}</p>
        <p class="text-[12px] border-b border-gray-500 pb-3">
          {{ $t("silakan-periksa-kotak-masuk") }}
        </p>
      </div>
      <div class="w-full">
        <Verified
          :uuidData="tourOrderDetail.data?.uuid"
          @sukses="getSuskes"
          carOrTour="tour-orders"
        />
      </div>
    </div>
  </modal>
</template>

<script setup>
const route = useRoute();
const slug = computed(() => route?.params?.slug);
const { requestOptions } = useRequestOptions();
const { $user } = useAuth();
const { formatDate } = useFormatDate();
const page = ref(1);
const { locale, t: $t } = useI18n();
const showModalRefund = ref(false);
const { $toast } = useNuxtApp();
const currentId = ref(undefined);

const { loading, message, alertType, setErrorMessage, transformErrors } =
  useRequestHelper();

const {
  data: tourOrderDetail,
  error: errorOrderTour,
  refresh: refreshOrderTour,
} = await useAsyncData("toursOrderDetail", () =>
  $fetch(`/users/${$user.value?.uuid}/tour-orders/${slug.value}`, {
    headers: {
      Accept: "application/json",
    },
    method: "get",
    ...requestOptions,
  })
);

async function showModalRefundFunc(id) {
  const { data, error } = await useFetch(
    `/users/${$user.value.uuid}/tour-orders/${tourOrderDetail.value.data?.uuid}/refund-request`,
    {
      method: "post",
      ...requestOptions,
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message ?? $t("something-error"));
    $toast.error(error.value?.data?.message ?? $t("something-error"));
  } else {
    showModalRefund.value = !showModalRefund.value;
    $toast.success(data.value?.data?.message ?? $t("cancel-tour-order-sukses"));
  }
  loading.value = false;
}

async function cancelOrder() {
  loading.value = true;
  const { data, error } = await useFetch(
    `/users/${$user.value.uuid}/tour-orders/${tourOrderDetail.value.data?.uuid}/cancel`,
    {
      method: "post",
      ...requestOptions,
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message ?? "Something went wrong");
    $toast.error(error.value?.data?.message ?? "Something went wrong.");
  } else {
    $toast.success(data.value?.data?.message ?? $t("cancel-tour-order-sukses"));
  }
  loading.value = false;

  refreshOrderTour();
  window.location.reload();
}

function getSuskes(data) {
  showModalRefund.value = data;
  // window.location.reload();
  refresh();
}

useHead({ title: "Order detail tour" });
</script>
