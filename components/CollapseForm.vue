<template>
  <details ref="details" class="p-2 transition-all duration-500 rounded">
    <summary
      class="flex flex-row items-center font-semibold cursor-pointer text-sm text-[#8C8C8C]"
    >
      <span
        class="grow relative after:w-full after:h-0.5 after:bg-[#8C8C8C]/20 after:absolute after:my-auto after:ml-3 after:mr-3 after:top-1/2 overflow-hidden"
      >
        {{ props.title }}
      </span>
      <Icon
        name="i-heroicons-chevron-down"
        :class="{ 'rotate-180': isOpen }"
        class="w-5 h-5 transition-all duration-300"
      />
    </summary>

    <div class="transition-all duration-500 mt-1">
      <slot></slot>
    </div>
  </details>
</template>

<script setup lang="ts">
import { useEventListener } from "@vueuse/core";

const props = defineProps({
  title: String,
});

const details = ref<HTMLDetailsElement | null>();

const isOpen = ref(false);

useEventListener(details, "toggle", () => {
  isOpen.value = details.value?.open ?? false;
});
</script>

<style scoped></style>
