<template>
  <div class="border rounded-xl p-4 space-y-2">
    <div class="text-xs text-zinc-400">{{ props.name }}</div>
    <div>{{ props.locationName }}</div>
    <div class="text-sm text-zinc-400">
      {{ props.locationAddress }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
  },
  locationName: {
    type: String,
  },
  locationAddress: {
    type: String,
  },
});
</script>

<style scoped></style>
