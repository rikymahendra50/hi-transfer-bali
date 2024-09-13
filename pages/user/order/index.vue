<template>
  <div class="h-28"></div>
  <div class="w-full border-b">
    <UIContainer>
      <div class="text-black font-semibold text-2xl">My Order</div>

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
          <p class="text-black font-semibold text-sm">Transport</p>
        </div>
        <div
          class="py-2 px-14 rounded-[7px] flex items-center cursor-pointer"
          :class="{
            'bg-transparent': currentOrder !== 'order-tourpackage',
            'bg-white': currentOrder === 'order-tourpackage',
          }"
          @click="choseOrder('order-tourpackage')"
        >
          <p class="text-black font-semibold text-sm">Tour Package</p>
        </div>
      </div>

      <!-- table order transport -->
      <div
        class="overflow-x-auto border rounded-lg mt-5 bg-white mb-5"
        v-if="currentOrder === 'order-transport'"
      >
        <table
          class="table table-xs md:table-md md:w-full rounded-t-xl table-fixed w-[500px]"
        >
          <thead class="h-12">
            <tr>
              <th
                class="font-medium text-[#667085] bg-[#FCFCFD] whitespace-nowrap"
              >
                Booking ID
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">
                Destination
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">
                Departure Date & Time
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">Car Type</th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">Type</th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">Passenger</th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">Pricing</th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="last:border-b transition-colors duration-300 my-2 cursor-pointer"
              @click="changeRoute($event, '/user/order/order-summary/slug')"
            >
              <td>
                <div class="">#12345</div>
              </td>
              <td>
                <div class="line-clamp-2 font-semibold">
                  Bandara Int'l I Gusti Ngurah Rai - The Trans Resort Bali
                </div>
              </td>
              <td>
                <div class="">23 Aug 2024; 08:00 WITA</div>
              </td>
              <td>
                <div class="">Standar</div>
              </td>
              <td>
                <div class="">Roundtrip</div>
              </td>
              <td>
                <div class="">2 passanger</div>
              </td>
              <td>
                <div class="">Rp800.000</div>
              </td>
              <td>
                <div
                  class="flex items-center gap-1 bg-opacity-10 w-fit px-3 py-1 rounded-[16px]"
                  :class="{
                    'bg-[#22C55E] text-[#22C55E]': status == 'Paid',
                    'bg-[#EF4444] bg-opacity-[12%] text-error':
                      status !== 'Paid',
                  }"
                >
                  <Icon name="icon-park-outline:dot" />
                  <p class="font-medium text-[12px]">{{ status }}</p>
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
              <!-- <p class="font-medium text-[12px] md:text-sm text-[#121212]">
                  {{ decks?.meta?.from }} - {{ decks?.meta?.to }} of
                  {{ decks?.meta?.total }} card decks
                </p> -->
            </div>
          </div>
          <div
            class="font-medium text-[14px] text-[#344054] flex items-center gap-3"
          >
            <PaginationAdmin
              v-model="page"
              :total="5"
              :includeFirstLast="false"
              :per-page="5"
              class="flex justify-center"
            />
          </div>
        </div>
      </div>
      <!-- end table -->

      <!-- table tour package -->
      <div
        class="overflow-x-auto border rounded-lg mt-5 bg-white mb-5"
        v-else-if="currentOrder === 'order-tourpackage'"
      >
        <table
          class="table table-xs md:table-md md:w-full rounded-t-xl table-fixed w-[500px]"
        >
          <thead class="h-12">
            <tr>
              <th
                class="font-medium text-[#667085] bg-[#FCFCFD] whitespace-nowrap"
              >
                Booking IDD
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">
                Package Name
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">Tour Date</th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">
                Participant
              </th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">Pricing</th>
              <th class="font-medium text-[#667085] bg-[#FCFCFD]">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="last:border-b transition-colors duration-300 my-2"
              @click="changeRoute($event, '/user/order/order-summary/slug')"
            >
              <td>
                <div class="">#12345</div>
              </td>
              <td>
                <div class="line-clamp-2 font-semibold">
                  West Nusa Penida Tour
                </div>
              </td>
              <td>
                <div class="">23 Aug 2024</div>
              </td>
              <td>
                <div class="">2 Participant</div>
              </td>
              <td>
                <div class="">Rp. 80.000</div>
              </td>
              <td>
                <div
                  class="flex items-center gap-1 bg-opacity-10 w-fit px-3 py-1 rounded-[16px]"
                  :class="{
                    'bg-[#22C55E] text-[#22C55E]': status == 'Paid',
                    'bg-[#EF4444] bg-opacity-[12%] text-error':
                      status !== 'Paid',
                  }"
                >
                  <Icon name="icon-park-outline:dot" />
                  <p class="font-medium text-[12px]">{{ status }}</p>
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
              <!-- <p class="font-medium text-[12px] md:text-sm text-[#121212]">
                  {{ decks?.meta?.from }} - {{ decks?.meta?.to }} of
                  {{ decks?.meta?.total }} card decks
                </p> -->
            </div>
          </div>
          <div
            class="font-medium text-[14px] text-[#344054] flex items-center gap-3"
          >
            <PaginationAdmin
              v-model="page"
              :total="5"
              :includeFirstLast="false"
              :per-page="5"
              class="flex justify-center"
            />
          </div>
        </div>
      </div>
      <!-- end table -->
    </UIContainer>
  </div>
</template>

<script setup lang="ts">
const page = ref(1);
const status = ref("Paid");

const router = useRouter();

useHead({ title: "Order Fastboat" });

const currentOrder = ref("order-transport");

function choseOrder(orderName) {
  currentOrder.value = orderName;
}

const changeRoute = async (e: Event, route: string) => {
  e.preventDefault();
  await useRouter().push(route);
  openMenu();
};
</script>

<style></style>
