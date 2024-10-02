<template>
  <div class="h-44 sm:h-28"></div>
  <div class="w-full border-b">
    <!-- <pre>
      {{ cars?.data }}
    </pre> -->
    <UIContainer>
      <div class="text-black font-semibold text-2xl">
        {{ $t("order-saya") }}
      </div>
      <div
        class="w-fit flex items-center mt-5 rounded-[8px] bg-[#7878801F] bg-opacity-[12%] py-2 px-2 gap-2"
      >
        <div
          class="py-2 px-14 rounded-[7px] flex items-center cursor-pointer"
          :class="{
            'bg-transparent': currentOrder !== 'order-transport',
            'bg-white': currentOrder === 'order-transport',
          }"
          @click="choseOrder('order-transport')"
        >
          <p class="text-black font-semibold text-sm">{{ $t("transport") }}</p>
        </div>
        <div
          class="py-2 px-14 rounded-[7px] flex items-center cursor-pointer"
          :class="{
            'bg-transparent': currentOrder !== 'order-tourpackage',
            'bg-white': currentOrder === 'order-tourpackage',
          }"
          @click="choseOrder('order-tourpackage')"
        >
          <p class="text-black font-semibold text-sm">{{ $t("paket-tour") }}</p>
        </div>
      </div>

      <div
        class="overflow-x-auto rounded-lg mt-5 bg-white mb-5 md:w-[100%]"
        v-if="currentOrder === 'order-transport'"
      >
        <table
          class="table table-xs md:table-md md:w-full rounded-t-xl table-fixed w-[500px]"
        >
          <thead class="h-12">
            <tr>
              <th
                class="font-medium text-[#667085] bg-[#FCFCFD] whitespace-nowrap w-[200px]"
              >
                Booking ID
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD] w-[200px]">
                Destination
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD] w-[200px]">
                Type
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD] w-[200px]">
                Date
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD] w-[200px]">
                {{ $t("pricing") }}
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD] w-[200px]">
                {{ $t("order-status") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="last:border-b transition-colors duration-300 my-2 cursor-pointer"
              @click="
                changeRoute(
                  $event,
                  `/user/order/order-summary/car/${item.uuid}`
                )
              "
              v-for="item in cars?.data"
              :key="item.id"
            >
              <td>
                <div class="">#{{ item.uuid }}</div>
              </td>
              <td>
                <div class="font-semibold">
                  {{ item.destination }}
                </div>
              </td>
              <td>
                <div class="font-semibold">
                  {{ item.type }}
                </div>
              </td>
              <td>
                <div class="">
                  <!--                   {{ item.activity_date }} {{ $t("to") }}
                  {{ item.return_date }} -->

                  {{ formatDate(item.activity_date) }}
                  {{ "-" }} {{ formatDate(item.return_date) }}
                </div>
              </td>
              <td>
                <div class="">
                  {{ FormatMoneyDash(item.grand_total_purchased) }}
                </div>
              </td>
              <td>
                <div
                  class="flex items-center gap-1 bg-opacity-10 w-fit px-3 py-1 rounded-[16px]"
                  :class="{
                    'bg-[#22C55E] text-[#22C55E]': item.status === 'paid',
                    'bg-[#EF4444] bg-opacity-[12%] text-error':
                      item.status !== 'paid',
                    'bg-[#ffe922] text-black':
                      item.status == 'waiting_for_payment',
                  }"
                >
                  <Icon name="icon-park-outline:dot" />
                  <p class="font-medium text-[12px]">
                    {{ item.status }}
                  </p>
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
                {{ cars?.meta?.from }} - {{ cars?.meta?.to }} of
                {{ cars?.meta?.total }} data
              </p>
            </div>
          </div>
          <div
            class="font-medium text-[14px] text-[#344054] flex items-center gap-3"
          >
            <PaginationAdmin
              v-model="pageCars"
              :total="cars?.meta?.total"
              :includeFirstLast="false"
              :per-page="cars?.meta?.per_page"
              class="flex justify-center"
            />
          </div>
        </div>
      </div>
      <!-- end table -->

      <!-- table order tour -->
      <div
        class="overflow-x-auto border rounded-lg mt-5 bg-white mb-5 md:w-[100%]"
        v-else-if="currentOrder === 'order-tourpackage'"
      >
        <table
          class="table table-xs md:table-md md:w-full rounded-t-xl table-fixed w-[500px]"
        >
          <thead class="h-12">
            <tr>
              <th
                class="font-medium text-[#667085] bg-[#FCFCFD] whitespace-nowrap w-[200px]"
              >
                Booking ID
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD] w-[200px]">
                Destination
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD] w-[200px]">
                Departure Date & Time
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD] w-[200px]">
                {{ $t("pricing") }}
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD] w-[200px]">
                {{ $t("order-status") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="last:border-b transition-colors duration-300 my-2 cursor-pointer"
              @click="
                changeRoute(
                  $event,
                  `/user/order/order-summary/tour/${item.uuid}`
                )
              "
              v-for="item in tours?.data"
              :key="item.id"
            >
              <td>
                <div class="">#{{ item.uuid }}</div>
              </td>
              <td>
                <div class="line-clamp-2 font-semibold">
                  {{ item?.product_thumbnail.name }}
                </div>
              </td>
              <td>
                <div class="">{{ formatDate(item.activity_date) }}</div>
              </td>
              <td>
                <div class="">
                  {{ FormatMoneyDash(item.grand_total_purchased) }}
                </div>
              </td>
              <td>
                <div
                  class="flex items-center gap-1 bg-opacity-10 w-fit px-3 py-1 rounded-[16px]"
                  :class="{
                    'bg-[#22C55E] text-[#22C55E]': item.status == 'paid',
                    'bg-[#EF4444] bg-opacity-[12%] text-error':
                      item.status !== 'paid',
                    'bg-[#ffe922] text-black':
                      item.status == 'waiting_for_payment',
                  }"
                >
                  <Icon name="icon-park-outline:dot" />
                  <p class="font-medium text-[12px]">{{ item.status }}</p>
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
                {{ tours?.meta?.from }} - {{ tours?.meta?.to }} of
                {{ tours?.meta?.total }} item
              </p>
            </div>
          </div>
          <div
            class="font-medium text-[14px] text-[#344054] flex items-center gap-3"
          >
            <PaginationAdmin
              v-model="pageTours"
              :total="tours?.meta?.total"
              :includeFirstLast="false"
              :per-page="tours?.meta?.per_page"
              class="flex justify-center"
            />
          </div>
        </div>
      </div>
      <!-- end table -->
    </UIContainer>
  </div>
</template>

<script setup>
import { withQuery } from "ufo";

const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const { locale, t: $t } = useI18n();
const pageCars = ref(1);
const pageTours = ref(1);
const status = ref("Paid");
const { $logout, $user } = useAuth();
const { formatDate } = useFormatDate();

useHead({ title: "User" });

const currentOrder = ref("order-transport");

onMounted(() => {
  if (route.query.transport) {
    currentOrder.value = "order-transport";
  } else if (route.query.tour) {
    currentOrder.value = "order-tour";
  }
});

const {
  data: cars,
  error: errorCars,
  refresh: refreshCars,
} = await useAsyncData("cars", () =>
  $fetch(`/users/${$user.value?.uuid}/car-orders?page=${pageCars.value}`, {
    headers: {
      Accept: "application/json",
    },
    method: "get",
    ...requestOptions,
  })
);

const {
  data: tours,
  error: errorTours,
  refresh: refreshTours,
} = await useAsyncData("tours", () =>
  $fetch(`/users/${$user.value?.uuid}/tour-orders?page=${pageTours.value}`, {
    headers: {
      Accept: "application/json",
    },
    method: "get",
    ...requestOptions,
  })
);

function choseOrder(orderName) {
  currentOrder.value = orderName;
}

const changeRoute = async (e, route) => {
  e.preventDefault();
  await useRouter().push(route);
  // openMenu();
};

onMounted(async () => {
  await nextTick();
  stop();

  if (route.query.pagecars) {
    pageCars.value = Number(route.query.pagecars);
  }
  if (route.query.pagetours) {
    pageTours.value = Number(route.query.pagetours);
  }
});

watch(pageCars, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    replaceWindowCars();
  }
});

watch(pageTours, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    replaceWindowTours();
  }
});

function replaceWindowCars() {
  router.replace(
    withQuery("/user", {
      pagecars: pageCars.value,
    })
  );
  refreshCars();
}

function replaceWindowTours() {
  router.replace(
    withQuery("/user", {
      pagetours: pageTours.value,
    })
  );
  refreshTours();
}

definePageMeta({
  layout: "user",
  // @ts-ignore
  middleware: ["auth", "user"],
});
</script>

<style></style>
