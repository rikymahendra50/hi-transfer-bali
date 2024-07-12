<template>
    <div class="space-y-4 border rounded-xl p-4">
        <h4 class="text-primary-dark text-2xl font-bold">{{ props.step.title }}</h4>
        <div class="text-zinc-400">
            {{ props.step.decription }}
        </div>
        <img
            :src="props.step.image"
            :alt="props.step.title"
            class="w-full h-[350px] object-cover"
        >
    </div>
</template>

<script setup lang="ts">
interface Step {
    title: string
    decription: string
    image: string
}
const props = defineProps<{ step: Step }>()

</script>

<style scoped></style>