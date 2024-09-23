<template>
  <div>
    <div class="space-y-4 p-4 border rounded-xl">
      <div class="flex flex-col lg:flex-row lg:justify-between item-center">
        <div class="text-lg font-semibold flex items-center">
          {{ name }}
        </div>
        <div
          class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 space-x-0 lg:space-x-4"
        >
          <div class="flex flex-col space-y-1">
            <div class="text-xs text-zinc-400">Email</div>
            <div>{{ email }}</div>
          </div>
          <div class="flex flex-col space-y-1">
            <div class="text-xs text-zinc-400">Nomor Telepon</div>
            <div>{{ phone }}</div>
          </div>
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
  email: {
    type: String,
  },
  phone: {
    type: [Number, String],
  },
});
</script>

<style scoped></style>
