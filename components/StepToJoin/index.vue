<template>
    <div class="space-y-6 py-6">
        <h3 class="text-[32px] leading-[40px] font-semibold text-primary-dark">

            Pesan di Hi Travel Bali dalam 3 Langkah Mudah
        </h3>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StepToJoinCard
                v-for="(step, index) in steps"
                :key="index"
                :step="step"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const steps = ref([
    {
        title: '1.Temukan',
        decription: "Cari mobil penjemputan atau paket tur yang sesuai yang kamu inginkan, ada banyak pilihan buatmu.",
        image: '/hi-travel-feat-1.png'
    },
    {
        title: '2.Bayar',
        decription: 'Lakukan pembayaran dengan berbagai metode bayar yang aman, cepat, dan mudah.',
        image: '/hi-travel-feat-2.png'
    },
    {
        title: "3. Selesai",
        decription: 'Kamu sudah siap untuk liburan! Informasi tranksasi akan dikirimkan ke emailmu.',
        image: '/hi-travel-feat-3.png'
    }
])
</script>

<style scoped></style>