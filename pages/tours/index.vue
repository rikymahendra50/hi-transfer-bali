<template>
    <div>
        <div class="h-28"></div>
        <div class="w-full border-b">
            <UIContainer>

                <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full">
                    <div>
                        <UIBtn
                            variant="primary"
                            outlined
                            class="whitespace-nowrap"
                        >Kembali ke Beranda</UIBtn>
                    </div>
                    <div class="w-full">
                        <div
                            class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-4 text-lg lg:text-xl font-semibold">
                            <div class="text-center">
                                Bandara Int'l I Gusti Ngurah Rai
                            </div>

                        </div>
                        <div class="text-zinc-400 text-sm whitespace-nowrap text-center lg:text-left ">
                            21 Juni 2024 | 2 Orang
                        </div>

                    </div>

                </div>
            </UIContainer>
        </div>
        <UIContainer>
            <div class="flex flex-col space-y-6 mt-4">
                <div class="flex justify-between items-center">
                    <div>
                        Menampilkan 7 paket tur
                    </div>
                    <div>
                        <UIFormMGroup
                            name="sort"
                            label="Urut berdasarkan"
                        >
                            <UIFormMSelect
                                v-model="filter.sort"
                                name="sort"
                            >
                                <option value="">Semua</option>
                                <option value="recommended">Rekomendasi</option>
                            </UIFormMSelect>
                        </UIFormMGroup>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <TourCard
                        v-for="n in 4"
                        :key="n"
                    />
                </div>
            </div>
        </UIContainer>
        <div class="h-10"></div>

    </div>
</template>

<script setup lang="ts">
const filter = ref({
    sort: ""
})
</script>

<style scoped></style>