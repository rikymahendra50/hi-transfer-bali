<template>
  <div
    class="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between py-3 px-5 border-b items-center"
  >
    <div class="flex flex-col gap-1">
      <p class="text-[#121212] text-[18px] font-semibold text-lg md:text-xl">
        {{ title }}
      </p>
      <p class="text-[14px] text-gray-500">
        {{ subTitle }}
      </p>
    </div>

    <div class="">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String },
  subTitle: {
    type: String,
  },
});
</script>
