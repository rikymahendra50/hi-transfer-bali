<template>
  <div
    :class="
      clsx(
        'inline-flex space-x-2 items-center text-zinc-400 hover:border-b-2 py-2 hover:bg-green-100 transition-colors duration-300 px-2 hover:text-primary hover:border-primary hover:bg-opacity-30 cursor-pointer',
        {
          'border-b-2 border-primary bg-opacity-30 !text-primary bg-green-100':
            props.isActive,
        }
      )
    "
  >
    <Icon :name="props.icon" class="h-5 w-5" />
    <div class="">{{ props.label }}</div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

const props = withDefaults(
  defineProps<{
    label: string;
    icon: string;
    isActive?: boolean;
  }>(),
  {
    isActive: false,
  }
);
</script>

<style scoped></style>
