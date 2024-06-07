<template>

    <div class="form-control w-full ">
        <label class="py-0 label !justify-start cursor-pointer inline-flex space-x-4">
            <input
                type="radio"
                :class="radioClass"
                :name="props.name"
                :value="props.value"
                :disabled="props.disabled"
                v-model="value"
                :aria-label="ariaLabel"
                :readonly="props.readonly"
            />
            <span
                class="label-text"
                v-if="props.label || $slots.default"
            >
                <slot>
                    {{ props.label }}
                </slot>
            </span>
        </label>
    </div>


</template>

<script setup lang="ts">

import clsx from 'clsx';

import { useField } from "vee-validate";

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(defineProps<{
    name: string
    label?: string
    modelValue?: string | number
    value?: string | number
    disabled?: boolean
    ariaLabel?: string
    variant?: "primary" | "secondary" | "accent" | "accent" | "info" | "success" | "warning" | "error"
    size?: "xs" | "sm" | "md" | "lg"
    class?: string
    readonly?: boolean
}>(), {
    disabled: false,
    ariaLabel: "toggle",
})

const name = toRef(props, "name");

const variants = [
    'radio-primary',
    'radio-secondary',
    'radio-accent',
    'radio-info',
    'radio-success',
    'radio-warning',
    'radio-error',
]

const sizes = [
    'radio-xs',
    'radio-sm',
    'radio-md',
    'radio-lg',
]

const {
    value,
    errorMessage,
} = useField(name, undefined, {
    syncVModel: true,
    type: "radio"
});


const radioClass = computed(() => {
    return clsx('radio',
        variants[variants.indexOf(`radio-${props.variant}`)],
        sizes[sizes.indexOf(`radio-${props.size}`)],
        props.class
    )
})






</script>

<style scoped></style>