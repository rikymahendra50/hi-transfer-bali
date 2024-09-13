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
    variant?:
      | "primary"
      | "secondary"
      | "accent"
      | "accent"
      | "info"
      | "success"
      | "warning"
      | "error";
    size?: "xs" | "sm" | "md" | "lg";
    ghost?: boolean;
    bordered?: boolean;
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

const { value, errorMessage, meta } = useField(name, undefined, {
  syncVModel: true,
});

const variant = [
  "select-neutral",
  "select-primary",
  "select-secondary",
  "select-accent",
  "select-info",
  "select-success",
  "select-warning",
  "select-error",
];

const size = ["select-xs", "select-sm", "select-md", "select-lg"];

const className = computed(() => {
  const arr: string[] = [];

  const inputClass = [];

  if (props.bordered && !props.ghost) {
    inputClass.push("select-bordered");
  }

  if (props.variant) {
    inputClass.push(variant[variant.indexOf(`select-${props.variant}`)]);
  }

  if (props.size) {
    inputClass.push(size[size.indexOf(`select-${props.size}`)]);
  }

  if (props.ghost) {
    inputClass.push("select-ghost");
  }

  if (!!errorMessage.value) {
    arr.push("select-error");
  }

  return clsx(arr.join(" "), inputClass.join(" "), props.class);
});

onMounted(async () => {
  await nextTick();
});
</script>

<template>
  <select
    :class="clsx('select', className)"
    :name="name"
    :id="name"
    v-model="value"
    :readonly="readonly"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :placeholder="placeholder"
    :multiple="multiple"
    class="w-full"
    v-bind="$attrs"
  >
    <slot></slot>
  </select>
  <TransitionX>
    <VeeErrorMessage :name="name" class="form-error-message" />
  </TransitionX>
</template>
