<template>
  <input
    role="tab"
    type="radio"
    :class="
      clsx('tab', {
        'text-error': isError,
        '[--tab-border-color:border-red-500]': isError,
      })
    "
    ref="tab"
    :name="props.group"
    :checked="checked"
    :aria-label="name"
    :value="name"
  />
  <div
    role="tabpanel"
    :class="
      clsx('tab-content  p-2 rounded', {
        'border-base-200': !isError,
        'border-error': isError,
      })
    "
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

defineOptions({
  inheritAttrs: false,
});
const props = withDefaults(
  defineProps<{
    name: string;
    checked?: boolean;
    group?: string;
    isError?: boolean;
  }>(),
  {
    group: "tab",
  }
);

const checkedItem = ref(props.checked);

const tab = ref<HTMLInputElement | null>(null);

const toggleSwitch = () => {
  if (props.checked) {
    tab.value?.click();
  }
};
</script>

<style scoped></style>
