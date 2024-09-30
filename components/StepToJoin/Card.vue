<template>
  <div class="space-y-4 border rounded-xl pt-4 px-4 flex flex-col">
    <h4 class="text-primary-dark text-2xl font-bold">{{ props.step.title }}</h4>
    <div class="text-zinc-400">
      {{ props.step.decription }}
    </div>
    <div class="h-full flex items-end">
      <img
        :src="props.step.image"
        :alt="props.step.title"
        class="w-full h-[350px] object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Step {
  title: string;
  decription: string;
  image: string;
}
const props = defineProps<{ step: Step }>();
</script>

<style scoped></style>
