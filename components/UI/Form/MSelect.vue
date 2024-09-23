<script setup lang="ts">
import clsx from "clsx";

import { useField } from "vee-validate";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue: string | number | Array<string | number>;
    name: string;
    class?: string;
    disabled?: boolean;
    ariaLabel?: string;
    placeholder?: string;
    readonly?: boolean;
    multiple?: boolean;
  }>(),
  {
    type: "text",
    disabled: false,
    bordered: true,
  }
);

const name = toRef(props, "name");

const { value, errorMessage } = useField(name, undefined, {
  syncVModel: true,
});

const { setError }: any = inject("group-form");

watch(errorMessage, (value) => {
  if (value) {
    setError(true);
  } else {
    setError(false);
  }
});

onMounted(async () => {
  await nextTick();
});
</script>

<template>
  <select
    :class="
      clsx(
        'w-full min-w-[140px] h-9 !outline-none focus:!border-none disabled:bg-gray-50'
      )
    "
    :name="name"
    :id="name"
    v-model="value"
    :readonly="readonly"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :placeholder="placeholder"
    :multiple="multiple"
    v-bind="$attrs"
  >
    <slot></slot>
  </select>
</template>
