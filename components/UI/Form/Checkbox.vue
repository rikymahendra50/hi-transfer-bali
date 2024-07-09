<template>

    <div class="form-control max-w-full ">
        <label class="py-0 label !justify-start cursor-pointer inline-flex gap-4">
            <input
                type="checkbox"
                :class="checkboxClass"
                :name="props.name"
                :disabled="props.disabled"
                v-model="value"
                :aria-label="ariaLabel"
                :value="props.value"
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

defineOptions({
    inheritAttrs: false
})

import { useField } from "vee-validate";

const props = withDefaults(defineProps<{
    name: string
    label?: string
    modelValue?: string[] | number[]
    disabled?: boolean
    ariaLabel?: string
    value?: string | number
    variant?: "primary" | "secondary" | "accent" | "accent" | "info" | "success" | "warning" | "error"
    size?: "xs" | "sm" | "md" | "lg"
    class?: string
    readonly?: boolean
}>(), {
    disabled: false,
    trueValue: 1,
    falseValue: 0,
    ariaLabel: "checkbox",
})

const name = toRef(props, "name");

const variants = [
    'checkbox-primary',
    'checkbox-secondary',
    'checkbox-accent',
    'checkbox-info',
    'checkbox-success',
    'checkbox-warning',
    'checkbox-error',
]

const sizes = [
    'checkbox-xs',
    'checkbox-sm',
    'checkbox-md',
    'checkbox-lg',
]

const {
    value,
    errorMessage,
} = useField(name, undefined, {
    syncVModel: true,
    type: "checkbox"
});


const checkboxClass = computed(() => {
    return clsx('checkbox  [--chkfg:white]',
        variants[variants.indexOf(`checkbox-${props.variant}`)],
        sizes[sizes.indexOf(`checkbox-${props.size}`)],
        props.class
    )
})






</script>

<style scoped></style>