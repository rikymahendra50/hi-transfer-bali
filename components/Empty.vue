<template>
  <div class="flex flex-col items-center">
    <img
      :src="imageSrc"
      :alt="imageAlt"
      class="w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
      :class="classCustom"
    />
    <p class="text-center" v-html="description"></p>
  </div>
</template>

<script setup>
const props = defineProps({
  imageSrc: {
    type: String,
    default: "/not-found-hi-travel.png",
  },
  imageAlt: {
    type: String,
    default: "not-found-hi-travel",
  },
  description: {
    type: String,
    default: "Empty Data",
  },
  classCustom: {
    type: String,
  },
});
</script>
