<template>
    <div class="relative">
        <div class="absolute w-full h-full bg-black/50 grid place-items-center">
            <div class="max-w-xl text-center space-y-6">
                <h3 class="text-4xl lg:text-5xl font-semibold text-white">Sudah siap menjelajahi
                    keajaiban Bali?</h3>
                <p class="text-base lg:text-xl text-white">
                    Enjoy a holiday experience in Bali with exciting activities
                    and easy access to purchasing transport with Hi Travel Bali
                </p>
                <div>
                    <NuxtLink
                        to="/"
                        class="btn btn-primary text-white font-medium leading-4 "
                    >Jelajahi Lebih Lanjut
                        <Icon
                            name="i-heroicons-arrow-right-20-solid"
                            class="-rotate-45 h-5 w-5"
                        />
                    </NuxtLink>
                </div>
            </div>


        </div>
        <img
            src="/hi-travel-cta.png"
            alt="cta"
            class="w-full h-[490px]"
        >
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>