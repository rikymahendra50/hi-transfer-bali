<template>
  <div class="flex items-center justify-between border-b mx-3">
    <div class="flex items-center gap-3">
      <NuxtLink :to="link">
        <Icon name="mingcute:arrow-left-fill" class="text-black w-5 h-5" />
      </NuxtLink>

      <div class="flex flex-col gap-1">
        <p class="text-[#121212] text-[18px] font-semibold text-lg md:text-xl">
          {{ title }}
        </p>
        <p class="text-[14px] text-gray-500">
          {{ subTitle }}
        </p>
      </div>
    </div>
    <div
      class="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between px-5 items-end md:items-center py-6 md:py-4"
    >
      <div class="">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String },
  subTitle: {
    type: String,
  },
  link: {
    type: String,
  },
});
</script>
