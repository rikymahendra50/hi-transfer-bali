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
              carsOrderDetail?.data?.uuid
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
              {{ carsOrderDetail?.data?.user?.first_name }}&nbsp;{{
                carsOrderDetail?.data?.user?.last_name
              }}
            </p>
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">Email:</p>
            <p>{{ carsOrderDetail?.data?.user?.email }}</p>
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold text-sm">{{ $t("nomor-telepon") }}:</p>
            <p>{{ carsOrderDetail?.data?.user?.phone }}</p>
          </div>
        </div>

        <div class="px-5 py-4 flex flex-col gap-3 border-b">
          <div class="text-gray-500 uppercase text-sm">
            {{ $t("informasi-pemesanan") }}
          </div>
          <div class="grid gap-3 md:grid-cols-2">
            <div class="flex flex-col gap-1 text-sm">
              <p class="text-[#121212] font-semibold">{{ $t("penjeputan") }}</p>
              <p class="font-normal">
                {{ carsOrderDetail?.data?.details[0].pickup_name }}
              </p>
              <p class="font-normal text-[#16161697]">
                {{ carsOrderDetail?.data?.details[0].pickup_address }}
              </p>
            </div>
            <div class="flex flex-col gap-1 text-sm">
              <p class="text-[#121212] font-semibold">
                {{ $t("pengantaran") }}
              </p>
              <p class="font-normal">
                {{ carsOrderDetail?.data?.details[0].destination_name }}
              </p>
              <p class="font-normal text-[#16161697]">
                {{ carsOrderDetail?.data?.details[0].destination_address }}
              </p>
            </div>
          </div>

          <div v-if="carsOrderDetail?.data?.details">
            <!-- <pre>
              {{ carsOrderDetail?.data?.details }}
            </pre> -->
            <div
              class="bg-primary py-2 px-4 rounded-xl text-white w-fit"
              v-if="carsOrderDetail?.data?.details.length > 1"
            >
              <p>Round trip</p>
            </div>
            <div
              class="bg-primary py-2 px-4 rounded-xl text-white w-fit"
              v-else-if="carsOrderDetail?.data?.details.length == 1"
            >
              <p>One way</p>
            </div>
          </div>
        </div>

        <div class="px-5 py-4 flex flex-col gap-3 border-b">
          <div class="text-gray-500 uppercase text-sm">
            {{ $t("payment-information") }}
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">{{ $t("payment-method") }}</p>
            <p>{{ carsOrderDetail?.data?.payment_method }}</p>
          </div>
          <!-- <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">Promo</p>
            <p>{{ carsOrderDetail?.data?.promo_amount }}</p>
          </div> -->
          <div
            class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm"
            v-if="carsOrderDetail?.data?.refund_status"
          >
            <p class="font-semibold">Refund status</p>
            <p>{{ carsOrderDetail?.data?.refund_status }}</p>
          </div>
          <!-- <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">{{ $t("payment-channel") }}</p>
            <p>--------------</p>
          </div> -->
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold text-sm">{{ $t("payment-status") }}</p>
            <p>{{ carsOrderDetail?.data?.payment_status }}</p>
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold text-sm">{{ $t("total-price") }}</p>
            <p>{{ FormatMoneyDash(carsOrderDetail?.data?.total_purchased) }}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2">
        <button
          v-if="carsOrderDetail?.data?.payment_status === 'paid'"
          type="button"
          @click="showModalRefundFunc()"
          class="border-2 shadow-sm rounded-lg py-2 px-4 btn bg-white"
        >
          <!-- <p>{{ $t("pengembalian-pembayaran") }}</p> -->
          <p>Cancel</p>
        </button>
        <!-- <button
          v-else-if="
            carsOrderDetail?.data?.status === 'waiting_for_payment' &&
            carsOrderDetail?.data?.status !== 'cancel'
          "
          type="button"
          @click="cancelOrder()"
          class="border-2 shadow-sm rounded-lg py-2 px-4 btn bg-white"
        >
          <p>Cancel Order</p>
        </button> -->
        <!-- <div v-else-if="carsOrderDetail?.data?.status == 'completed'">
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
          :uuidData="carsOrderDetail.data?.uuid"
          @sukses="getSuskes"
          carOrTour="car-orders"
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
const page = ref(1);
const { locale, t: $t } = useI18n();
const showModalRefund = ref(false);
const currentId = ref(undefined);
const { $toast } = useNuxtApp();
const { loading, message, alertType, setErrorMessage, transformErrors } =
  useRequestHelper();

const { pushNotification } = useNotification();

const {
  data: carsOrderDetail,
  error: errorCars,
  refresh: refreshCar,
} = await useAsyncData("carsOrderDetail", () =>
  $fetch(`/users/${$user.value?.uuid}/car-orders/${slug.value}`, {
    headers: {
      Accept: "application/json",
    },
    method: "get",
    ...requestOptions,
  })
);

async function showModalRefundFunc(id) {
  loading.value = true;

  showModalRefund.value = !showModalRefund.value;

  const { data, error } = await useFetch(
    `/users/${$user.value.uuid}/car-orders/${carsOrderDetail.value.data?.uuid}/refund-request`,
    {
      method: "post",
      ...requestOptions,
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message ?? "Something went wrong");
    $toast.error(error.value?.data?.message ?? "Something went wrong. ");
  } else {
    $toast.success(
      data.value?.data?.message ?? "Sending request refund sucsess"
    );
  }
  loading.value = false;
}

async function cancelOrder() {
  loading.value = true;
  const { error, data } = await useFetch(
    `/users/${$user.value.uuid}/car-orders/${carsOrderDetail.value.data?.uuid}/cancel`,
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
      data.value?.data?.message ?? "Cancel car order successfully"
    );
  }
  loading.value = false;

  refreshCar();
  window.location.reload();
}

function getSuskes(data) {
  showModalRefund.value = data;
  // window.location.reload();
  refresh();
}

useHead({ title: "Order detail car" });
</script>
