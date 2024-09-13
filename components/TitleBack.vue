<template>
  <NuxtLink
    :to="link"
    class="font-semibold text-[18px] md:text-[24px] mb-4 flex items-center gap-2 w-fit"
  >
    <Icon name="mingcute:arrow-left-fill" class="text-black" />
    <span>{{ title }}</span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  link: {
    type: String,
  },
  title: {
    type: String,
  },
});
</script>
