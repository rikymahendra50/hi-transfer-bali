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
              {{ tourOrderDetail?.data?.activity_date }}
            </div>
          </div>

          <div class="flex flex-col gap-1 text-sm">
            <!-- <p class="text-[#121212] font-semibold">Details :</p> -->
            <!-- <div class="">
              <div
                class="py-4 flex flex-col gap-3 border-b mb-4"
                v-for="item in tourOrderDetail?.data?.details"
              >
                <div
                  class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm"
                >
                  <p class="font-semibold">Name :</p>
                  <p>{{ item.name }}</p>
                </div>
                <div
                  class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm"
                >
                  <p class="font-semibold">Quantity :</p>
                  <p>{{ item.quantity }}</p>
                </div>
                <div
                  class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm"
                >
                  <p class="font-semibold">Price :</p>
                  <p>{{ FormatMoneyDash(item.price) }}</p>
                </div>
                <div
                  class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm"
                >
                  <p class="font-semibold">Total Price :</p>
                  <p>{{ FormatMoneyDash(item.total_price) }}</p>
                </div>
              </div>
            </div> -->
            <div class="flex flex-col gap-3 border-b my-4">
              <div class="text-black uppercase text-[12px] font-semibold">
                Details :
              </div>

              <div class="overflow-x-auto">
                <table class="table">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th>
                        <div class="text-[#121212] font-semibold text-sm">
                          Name
                        </div>
                      </th>
                      <th>
                        <div class="text-[#121212] font-semibold text-sm">
                          Quantity
                        </div>
                      </th>
                      <th>
                        <div class="text-[#121212] font-semibold text-sm">
                          Price
                        </div>
                      </th>
                      <th>
                        <div class="text-[#121212] font-semibold text-sm">
                          Total Price
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
                        {{ FormatMoneyDash(item.price) }}
                      </td>
                      <td>
                        {{ FormatMoneyDash(item.total_price) }}
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
              Informasi Participant :
            </div>

            <div class="overflow-x-auto">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr>
                    <th>
                      <div class="text-[#121212] font-semibold text-sm">
                        Name
                      </div>
                    </th>
                    <th>
                      <div class="text-[#121212] font-semibold text-sm">
                        Nationality
                      </div>
                    </th>
                    <!-- <th>
                      <div class="text-[#121212] font-semibold text-sm">
                        Variant
                      </div>
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tourOrderDetail?.data?.forms">
                    <td>{{ item.name }}</td>
                    <td>
                      {{ item.nationality }}
                    </td>
                    <!-- <td>
                      {{ item }}
                    </td> -->
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
            <p>{{ FormatMoneyDash(tourOrderDetail?.data?.total_purchased) }}</p>
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
          <p>Cancel</p>
        </button>
        <a
          v-if="tourOrderDetail?.data?.payment_status === 'waiting_for_payment'"
          :href="tourOrderDetail?.data?.payment_url"
          target="_blank"
          class="border-2 shadow-sm rounded-lg py-2 px-4 btn bg-white"
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
  <!-- <pre>
    {{ tourOrderDetail?.data?.details }}
  </pre> -->
</template>

<script setup>
const route = useRoute();
const slug = computed(() => route?.params?.slug);
const { requestOptions } = useRequestOptions();
const { $user } = useAuth();
const page = ref(1);
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
  showModalRefund.value = !showModalRefund.value;

  const { data, error } = await useFetch(
    `/users/${$user.value.uuid}/tour-orders/${tourOrderDetail.value.data?.uuid}/refund-request`,
    {
      method: "post",
      ...requestOptions,
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message ?? "Something went wrong");
    $toast.error(error.value?.data?.message ?? "Something went wrong.");
  } else {
    $toast.success(
      data.value?.data?.message ?? "Cancel tour order successfully"
    );
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
    $toast.success(
      data.value?.data?.message ?? "Cancel tour order successfully"
    );
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
