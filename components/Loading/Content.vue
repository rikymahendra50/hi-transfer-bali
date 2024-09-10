<template>
    <div :class="clsx({
        'relative h-screen overflow-hidden': props.pending
    })">
        <div
            class="absolute !z-[9999] top-0 left-0 w-full h-full bg-opacity-80 bg-white flex justify-center items-center"
            v-if="props.pending"
        >
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <slot />

    </div>
</template>

<script setup lang="ts">
import clsx from 'clsx';

const props = withDefaults(defineProps<{
    pending?: boolean
}>(), {
    pending: false
})
</script>

<style scoped></style>