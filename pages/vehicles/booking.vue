<template>
    <div class="flex flex-col space-y-6">
        <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">
                Data Pemesan
            </div>
        </div>

        <div class="space-y-4">
            <VehicleOrdererForm />
        </div>
        <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">
                Detail Mobil
            </div>
        </div>
        <div class="space-y-4">
            <VehicleSelectedCard />
        </div>
    </div>
</template>

<script setup>

const filter = ref({
    sort: ""
})

</script>

<style lang="scss" scoped></style>