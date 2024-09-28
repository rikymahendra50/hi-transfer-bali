<template>
  <!-- <div class="space-y-4 border rounded-xl p-4 divide-y">
    <div class="grid grid-cols-[100px_1fr] space-x-2">
      <div class="rounded-xl overflow-hidden w-[100px] h-[100px]">
        <img :src="image" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col justify-between space-y-4">
        <div class="text-lg font-semibold">{{ name }}</div>
        <div>
          <div class="text-zinc-400 text-xs">{{ $t("destinasi") }}</div>
          <div class="text-sm">
            {{ desk }}
          </div>
        </div>
      </div>
    </div>
    <div class="font-semibold py-2">{{ $t("detail-harga") }}</div>
    <div
      class="flex justify-between items-center py-2"
      v-for="item in dataListPrice"
    >
      <div class="font-semibold">{{ item.name }}</div>
      <div>
        {{ FormatMoneyDash(item?.totalItemPrice?.toString()) }}
      </div>
    </div>
  </div> -->

  <div class="space-y-4 border rounded-xl p-4 divide-y">
    <div class="grid grid-cols-[100px_1fr] space-x-2">
      <div class="rounded-xl overflow-hidden w-[100px] h-[100px]">
        <img :src="image" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col justify-between space-y-4">
        <div class="text-lg font-semibold">{{ name }}</div>
        <div>
          <div class="text-zinc-400 text-xs">{{ $t("destinasi") }}</div>
          <div class="text-sm">
            {{ desk }}
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <div class="font-semibold pt-2 pb-4">{{ $t("detail-harga") }}</div>
      <div
        class="flex justify-between items-center pt-3 border-t"
        v-for="item in dataListPrice"
      >
        <div class="font-semibold">{{ item.name }}</div>
        <div>
          {{ FormatMoneyDash(item?.totalItemPrice?.toString()) }}
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
  dataListPrice: {
    type: Array,
  },
});
</script>

<style scoped></style>
