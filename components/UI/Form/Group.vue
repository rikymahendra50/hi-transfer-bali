<template>
  <div class="grid grid-cols-1 gap-1 text-left">
    <label
      :for="props.name"
      class="tracking-wide font-medium"
    >
      {{ props.label }}
    </label>
    <div
      class="form-description"
      v-if="$slots.descriptionTop"
    >
      <slot name="descriptionTop" />
    </div>
    <slot />
    <div
      class="form-description"
      v-if="$slots.descriptionBottom"
    >
      <slot name="descriptionBottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  /**
   * input label
   * @type {string}
   * @example
   */
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

defineOptions({
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped></style>
