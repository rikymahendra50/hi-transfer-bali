<template>
    <div class="space-y-4">
        <div>
            <UIFormMGroup
                name="tour_id"
                label="Pilih Destinasi"
            >

                <VDropdown
                    placements="start"
                    distance="-10"
                    skidding="1"
                    arrow-padding="1"
                >
                    <button class="text-xs h-9  w-full flex justify-between items-center">
                        <div>Pilih Destinasi</div>
                        <div>
                            <Icon name="i-heroicons-chevron-down" />
                        </div>
                    </button>
                    <template #popper="{ hide }">
                        <div class="w-full p-4 space-y-4 max-w-5xl">
                            <input
                                placeholder="Cari"
                                class="input input-bordered input-sm w-full"
                            />
                            <div class="space-y-4 overflow-y-auto h-full lg:max-h-[500px]">
                                <div
                                    v-for="n in 5"
                                    :key="n"
                                    class="grid grid-cols-[150px_1fr] gap-4 hover:bg-primary/10 transition-all duration-300 p-4 rounded-md cursor-pointer"
                                    @click="hide()"
                                >
                                    <div>
                                        <img
                                            alt=""
                                            class="w-full h-full object-cover"
                                            src="https://placehold.co/100"
                                        />
                                    </div>
                                    <div class="space-y-2">
                                        <div class="text-sm">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, sint
                                            nobis?
                                            Quae iure aperiam culpa obcaecati consequatur temporibus nam fugiat dolore
                                            aliquam aut, aliquid omnis ut et rerum molestiae numquam.
                                        </div>

                                        <div>
                                            <div class="text-zinc-400 text-xs">Harga Mulai Dari</div>
                                            <h4 class="text-lg font-semibold text-primary">Rp. 1.000.000/Orang</h4>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </VDropdown>

            </UIFormMGroup>

        </div>
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr_100px] gap-4">

            <UIFormMGroup
                name="activity_date"
                label="Pilih Tanggal"
            >
                <UIFormMTextField
                    name="activity_date"
                    type="date"
                    v-model="dataForm.activity_date"
                    placeholder="ex:2024-01-01"
                />
            </UIFormMGroup>

            <UIFormMGroup
                name="total_passengers"
                label="Berapa Orang"
            >
                <UIFormMTextField
                    name="total_passengers"
                    v-model="dataForm.total_passengers"
                    placeholder="ex:1"
                />
            </UIFormMGroup>

            <div>
                <UIBtn variant="primary">Cari Tur</UIBtn>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

const dataForm = ref({
    tour_id: '',
    activity_date: '',
    total_passengers: 1
})

import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smaller("lg")

</script>

<style scoped></style>