<template>
  <div class="grid grid-cols-[100px_1fr] border rounded-xl p-2 space-x-2">
    <div class="flex items-center">
      <div class="rounded-xl overflow-hidden w-[100px] h-[100px]">
        <img :src="props.image" alt="" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="flex flex-col justify-between space-y-4">
      <div class="text-lg font-semibold">{{ props.name }}</div>
      <div>
        <div class="text-zinc-400 text-xs">Destinasi</div>
        <div class="text-sm">
          {{ props.desk }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
  },
  desk: {
    type: String,
  },
  image: {
    type: String,
  },
});
</script>

<style scoped></style>
