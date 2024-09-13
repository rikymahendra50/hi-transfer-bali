<template>
  <div class="h-28"></div>
  <div class="w-full border-b">
    <UIContainer>
      <div class="flex items-center gap-4">
        <div class="">
          <Icon name="formkit:arrowleft" class="text-black w-7 h-7" />
        </div>

        <div class="flex flex-col gap-1">
          <p class="text-black text-[18px] font-medium">Ringkasan Pesanan</p>
          <span>Informasi lengkap untuk pesanan #12345</span>
        </div>
      </div>

      <div class="py-10">
        <div class="px-5 py-4 flex flex-col gap-3 border-b">
          <div class="text-gray-500 uppercase text-sm">Informasi Pelanggan</div>
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
          <div class="text-gray-500 uppercase text-sm">Informasi Pemesanan</div>
          <div class="grid gap-3 md:grid-cols-2">
            <div class="flex flex-col gap-1 text-sm">
              <p class="text-[#121212] font-semibold">Penjemputan</p>
              <p class="font-normal">Bandara Int'l I Gusti Ngurah Rai</p>
              <p class="font-normal text-[#16161697]">
                Jln. Raya Gusti Ngurah Rai, Tuban, Kec. Kuta, Kabupaten Badung,
                Bali 80362
              </p>
            </div>
            <div class="flex flex-col gap-1 text-sm">
              <p class="text-[#121212] font-semibold">Pengantaran</p>
              <p class="font-normal">The Trans Resort Bali</p>
              <p class="font-normal text-[#16161697]">
                Jl. Sunset Road No.30, Kerobokan Kelod, Kec. Kuta Utara,
                Kabupaten Badung, Bali 80361
              </p>
            </div>
          </div>
        </div>

        <div class="px-5 py-4 flex flex-col gap-3 border-b">
          <div class="text-gray-500 uppercase text-sm">Payment Information</div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">Payment Method</p>
            <p>Bank Transfer</p>
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold">Payment Channel</p>
            <p>Bank BCA</p>
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold text-sm">Payment Status</p>
            <p>Paid</p>
          </div>
          <div class="grid grid-cols-2 w-full md:w-[40%] items-center text-sm">
            <p class="font-semibold text-sm">Total Price</p>
            <p>Rp.1.700.000</p>
          </div>
        </div>
      </div>
    </UIContainer>
  </div>
</template>

<script setup>
useHead({ title: "Order Summary" });
</script>
