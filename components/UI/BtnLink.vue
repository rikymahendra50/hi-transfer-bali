<template>
  <NuxtLink
    :to="link"
    :class="buttonClass"
    :disabled="disabledButton"
    :aria-label="props.ariaLabel"
    v-bind="$attrs"
  >
    <span v-if="props.loading" class="loading loading-spinner"></span>

    <slot>
      {{ props.label }}
    </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import clsx from "clsx";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    type?: "submit" | "button";
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    class?: string;
    ariaLabel?: string;
    variant?:
      | "neutral"
      | "primary"
      | "secondary"
      | "accent"
      | "accent"
      | "info"
      | "success"
      | "warning"
      | "error";
    size?: "xs" | "sm" | "md" | "lg";
    noAnimation?: boolean;
    shape?: "square" | "circle";
    outlined?: boolean;
  }>(),
  {
    type: "button",
  }
);

const disabledButton = computed(() => props.disabled || props.loading);

const variant = [
  "btn-neutral",
  "btn-primary",
  "btn-secondary",
  "btn-accent",
  "btn-info",
  "btn-success",
  "btn-warning",
  "btn-error",
];

const size = ["btn-xs", "btn-sm", "btn-md", "btn-lg"];

const shape = ["btn-square", "btn-circle"];

const buttonClass = computed(() => {
  const classBtn: string[] = [];

  if (props.variant) {
    classBtn.push(variant[variant.indexOf(`btn-${props.variant}`)]);
  }

  if (props.size) {
    classBtn.push(size[size.indexOf(`btn-${props.size}`)]);
  }

  if (props.noAnimation) {
    classBtn.push("no-animation");
  }

  if (props.shape) {
    classBtn.push(shape[shape.indexOf(`btn-${props.shape}`)]);
  }

  if (props.outlined) {
    classBtn.push("btn-outline");
  }

  return clsx("btn", classBtn, props.class);
});
</script>

<style scoped></style>
