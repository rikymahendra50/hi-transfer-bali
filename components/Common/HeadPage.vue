<template>
  <div class="p-4 border-b flex justify-between items-center">
    <div>
      <div>{{ props.title }}</div>
      <div class="text-sm opacity-80">
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
