<template>

    <div class="form-control w-full ">
        <label class="label !justify-start cursor-pointer inline-flex gap-4">
            <input
                type="checkbox"
                :class="toggleClass"
                :name="props.name"
                :disabled="props.disabled"
                v-model="value"
                :true-value="props.trueValue"
                :false-value="props.falseValue"
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
});

const props = withDefaults(defineProps<{
    name: string
    label?: string
    modelValue?: string | number
    disabled?: boolean
    trueValue?: string | number
    falseValue?: string | number
    ariaLabel?: string
    variant?: "primary" | "secondary" | "accent" | "accent" | "info" | "success" | "warning" | "error"
    size?: "xs" | "sm" | "md" | "lg"
    class?: string
    readonly?: boolean
}>(), {
    disabled: false,
    trueValue: 1,
    falseValue: 0,
    ariaLabel: "toggle",
})

const name = toRef(props, "name");

const variants = [
    'toggle-primary',
    'toggle-secondary',
    'toggle-accent',
    'toggle-info',
    'toggle-success',
    'toggle-warning',
    'toggle-error',
]

const sizes = [
    'toggle-xs',
    'toggle-sm',
    'toggle-md',
    'toggle-lg',
]

const {
    value,
    errorMessage,
} = useField(name, undefined, {
    syncVModel: true,
});


const toggleClass = computed(() => {
    return clsx('toggle',
        variants[variants.indexOf(`toggle-${props.variant}`)],
        sizes[sizes.indexOf(`toggle-${props.size}`)],
        props.class
    )
})






</script>

<style scoped></style>