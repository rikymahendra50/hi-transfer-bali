<template>
    <div class="flex flex-col space-y-6">
        <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">
                Data Pemesan
            </div>
        </div>

        <div class="space-y-4">
            <TourOrdererForm />
        </div>
        <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">
                Data Peserta
            </div>
        </div>
        <div class="space-y-4">
            <TourParticipantForm />
        </div>
    </div>
</template>

<script setup>

const filter = ref({
    sort: ""
})

</script>

<style lang="scss" scoped></style>