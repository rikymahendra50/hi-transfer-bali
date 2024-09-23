<template>
  <NuxtLink
    :to="link"
    class="border-2 py-4 px-6 rounded-[8px] shadow-xs font-medium text-black btn bg-transparent"
  >
    {{ name }}
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  name: { type: String },
  link: {
    type: String,
  },
});
</script>
