<script setup lang="ts">

import clsx from "clsx";

import { useField } from "vee-validate";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  type?: "text" | "number" | "email" | "password" | "date" | "time" | "datetime-local" | "search",
  modelValue: string | number
  name: string
  class?: string
  disabled?: boolean
  ariaLabel?: string
  placeholder?: string
  variant?: "primary" | "secondary" | "accent" | "accent" | "info" | "success" | "warning" | "error"
  size?: "xs" | "sm" | "md" | "lg"
  ghost?: boolean
  bordered?: boolean
  readonly?: boolean
}>(), {
  type: "text",
  disabled: false,
  bordered: true,
}
)

const name = toRef(props, "name");

const {
  value,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  syncVModel: true,
});


const variant = [
  'input-neutral',
  'input-primary',
  'input-secondary',
  'input-accent',
  'input-info',
  'input-success',
  'input-warning',
  'input-error',
]

const size = [
  'input-xs',
  'input-sm',
  'input-md',
  'input-lg',
]

const className = computed(() => {
  const arr: string[] = [];

  const inputClass = []




  if (props.bordered && !props.ghost) {
    inputClass.push('input-bordered')
  }

  if (props.variant) {
    inputClass.push(variant[variant.indexOf(`input-${props.variant}`)])
  }

  if (props.size) {
    inputClass.push(size[size.indexOf(`input-${props.size}`)])
  }

  if (props.ghost) {
    inputClass.push('input-ghost')
  }


  if (!!errorMessage.value) {
    arr.push("input-error");
  }


  return clsx(arr.join(" "), inputClass.join(" "), props.class);
});


const input = ref<HTMLInputElement>()

</script>

<template>
  <label
    ref="focusIn"
    :class="clsx(
      'flex items-center input',
      className,
      {
        'gap-2': !!$slots.leftSection || !!$slots.rightSection,
        'pl-0': !$slots.leftSection,
        'pr-0': !$slots.rightSection
      }
    )"
  >
    <slot
      v-if="$slots.leftSection"
      name="leftSection"
    />
    <input
      :name="name"
      :id="name"
      :type="type"
      v-model="value"
      :readonly="readonly"
      :disabled="disabled"
      :aria-label="ariaLabel"
      :placeholder="placeholder"
      :class="clsx('w-full h-full', {
        'px-4': !$slots.leftSection || !$slots.rightSection
      })"
      v-bind="$attrs"
    />
    <slot
      v-if="$slots.rightSection"
      name="rightSection"
    />
  </label>

  <TransitionX>
    <VeeErrorMessage
      :name="name"
      class="form-error-message"
    />
  </TransitionX>
</template>
