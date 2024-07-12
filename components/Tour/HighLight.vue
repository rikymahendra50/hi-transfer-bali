<template>
    <div class="space-y-6 py-6">
        <h3 class="text-[32px] leading-[40px] font-semibold text-primary-dark">

            Paket Tur
        </h3>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <TourCard
                v-for="n in 4"
                :key="n"
            />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>