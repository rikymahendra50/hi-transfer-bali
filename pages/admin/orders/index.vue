<template>
  <div>
    <CommonHeadPage
      title="Manage Incoming Orders"
      description="Review, approve, and process orders with ease."
    >
    </CommonHeadPage>

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
              <div class="text-[#989393]">Order Type</div>
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
          <tr>
            <td class="text-sm font-normal text-[#989393]">TP12356780</td>
            <td class="">Cy Ganderton</td>
            <td>
              <div class="text-[#989393] !font-normal">Riky@gmail.com</div>
            </td>
            <td>
              <div class="text-[#989393] !font-normal">Transport</div>
            </td>
            <td>Rp.100.000</td>
            <td>
              <div class="">Paid</div>
            </td>
            <td>
              <div class="flex items-center">
                <VDropdown>
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
                        :to="`/admin/orders/order-detail-fastboat/slug`"
                        class="hover:bg-orange-400 hover:text-white py-3 px-5"
                      >
                        Detail
                      </NuxtLink>
                      <button
                        type="button"
                        class="hover:bg-red-600 hover:text-white py-3 px-5"
                      >
                        Delete
                      </button>
                    </div>
                  </template>
                </VDropdown>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Orders",
});
</script>

<style scoped></style>
