<template>
    <div>
        <div class="h-28"></div>
        <TourSwiper />
        <div class="h-5"></div>
        <UIContainer>
            <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full">
                <div class="flex flex-col space-y-2">
                    <h1 class="text-xl lg:text-[32px] lg:leading-[40px] font-semibold">West Nusa Penida Tour</h1>
                    <div class="inline-flex space-x-2">
                        <div>
                            <Icon
                                name="ph:map-pin-line-fill"
                                class="w-5 h-5 text-[#00A59A]"
                            />
                        </div>
                        <div class="text-zinc-400">
                            Kelingking Cliff - Angel's Billabong - Broken Beach - Crystal Bay Beach
                        </div>


                    </div>
                    <div>
                        <div class="text-zinc-400 text-xs">Harga Mulai Dari</div>
                        <h4 class="text-xl font-semibold text-primary">Rp. 1.000.000/Orang</h4>
                    </div>
                </div>
                <div class="flex justify-end w-full">
                    <div>
                        <button class="btn btn-primary">Booking Sekarang
                            <Icon
                                name="i-heroicons-arrow-right"
                                class="w-5 h-5 -rotate-45"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div class="h-5"></div>
            <div class="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4">
                <div class="text-2xl font-semibold">Ringkasan</div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam commodi nihil provident?
                    Blanditiis ab corporis cum fugit repudiandae reiciendis quam accusantium. Officia quam facilis
                    ducimus veniam ut autem dolores fuga!
                </div>
            </div>
        </UIContainer>
        <ShareCtaSection />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>