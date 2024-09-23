<script setup lang="ts">
import { useImage } from "@vueuse/core";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{ src: string; alt: string; heightLoadingClass?: string }>(),
  {
    heightLoadingClass: () => "min-h-[300px]",
  }
);

const { isLoading } = useImage({ src: props.src });
</script>

<template>
  <div
    v-if="isLoading"
    class="grid place-items-center bg-stone-100 w-full h-full animate-pulse"
    :class="[props.heightLoadingClass]"
  >
    <Icon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin" />
  </div>
  <img v-else :src="props.src" :alt="props.alt" v-bind="$attrs" />
</template>
