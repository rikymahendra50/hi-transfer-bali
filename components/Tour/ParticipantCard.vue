<template>
  <div>
    <div class="grid grid-cols-1 divide-y border rounded-xl">
      <div class="p-4" v-for="item in dataParticipant" :key="item">
        <div class="flex flex-col lg:flex-row lg:justify-between item-center">
          <div class="text-lg font-semibold flex items-center">
            {{ item.name }}
          </div>
          <div class="flex flex-row justify-between space-x-4">
            <div class="flex flex-col space-y-1">
              <div class="text-xs text-zinc-400">Kebangsaan</div>
              <div>{{ item.nationality }}</div>
            </div>
            <div class="flex flex-col space-y-1">
              <div class="text-xs text-zinc-400">Kategori</div>
              <div>{{ item.category }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ dataParticipant: { type: Array } });
</script>

<style scoped></style>
