<template>
  <div class="p-4 border-b flex justify-between items-center">
    <div class="flex flex-col gap-1">
      <div class="text-xl font-semibold">{{ props.title }}</div>
      <div class="text-sm md:text-base opacity-80">
        {{ props.description }}
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: "title",
    description: "description",
  }
);
</script>

<style scoped></style>
