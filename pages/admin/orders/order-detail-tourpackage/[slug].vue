<template>
  <TitleAdmin
    title="Ringkasan Pesanan"
    subTitle="Informasi lengkap untuk pesanan TP12356780"
  >
    <div>
      <UIFormMGroup name="sort" label="Urut berdasarkan">
        <UIFormMSelect v-model="status.sort" name="sort">
          <option value="">Sudah Bayar</option>
          <option value="recommended">Belum bayar</option>
        </UIFormMSelect>
      </UIFormMGroup>
    </div>
  </TitleAdmin>

  <div class="px-5 py-4 flex flex-col gap-3 border-b">
    <div class="text-gray-500 uppercase text-[12px] font-semibold">
      Informasi Pelanggan
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Nama pelanggan:</p>
      <p>Lorem, ipsum.</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Email:</p>
      <p>coopertorff@mail.com</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold text-sm">Nomor Telepon:</p>
      <p>+6281234567890</p>
    </div>
  </div>

  <div class="px-5 py-4 flex flex-col gap-3 border-b">
    <div class="text-gray-500 uppercase text-[12px] font-semibold">
      Informasi Pemesanan
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Nama Tur</p>
      <p>West Nusa Penida Tour</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Tanggal Tur</p>
      <p>24 Juni 2024</p>
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
            <th>
              <div class="text-[#121212] font-semibold text-sm">Kategori</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cooper Torff</td>
            <td>Indonesia</td>
            <td>Dewasa</td>
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
      <p>Bank Transfer</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Payment Channel</p>
      <p>Bank BCA</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Payment Status</p>
      <p>Paid</p>
    </div>
    <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
      <p class="font-semibold">Total Price</p>
      <p>Rp1.700.000</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
definePageMeta({
  layout: "admin",
  // @ts-ignore
  // middleware: ["auth", "admin"],
});

// @ts-ignore
useHead({
  title: "Order detail",
});

const status = ref({
  sort: "",
});
</script>
