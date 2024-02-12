<template>
    <div class="rounded-lg overflow-hidden">
        <div class="w-full inline-flex space-x-1.5">
            <div
                class="h-9 w-full bg-gray-300/80 animate-pulse border"
                v-for="h in 6"
                :key="h"
            ></div>
        </div>

        <div
            class="w-full inline-flex space-x-1.5 animate-pulse"
            v-for="b in 5"
            :key="b"
        >
            <div
                class="h-8 w-full bg-gray-200/80   border"
                v-for="r in 6"
                :key="r"
            ></div>
        </div>

        <div class="w-full inline-flex space-x-1.5">
            <div
                class="h-6 w-6 bg-gray-100/80 animate-pulse  border rounded-sm"
                v-for="r in 6"
                :key="r"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>