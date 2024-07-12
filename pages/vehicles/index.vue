<template>
    <div class="flex flex-col space-y-6">
        <div class="flex justify-between items-center">
            <div>
                Menampilkan 7 mobil
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

        <div class="space-y-4">
            <VehicleCard
                v-for="n in 4"
                :key="n"
            />
        </div>
    </div>
</template>

<script setup>

const filter = ref({
    sort: ""
})

</script>

<style lang="scss" scoped></style>