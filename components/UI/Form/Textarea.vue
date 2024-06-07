<script setup lang="ts">

import clsx from "clsx";

import { useField } from "vee-validate";

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(defineProps<{
    modelValue: string | number
    name: string
    class?: string
    disabled?: boolean
    ariaLabel?: string
    placeholder?: string
    variant?: "primary" | "secondary" | "accent" | "accent" | "info" | "success" | "warning" | "error"
    rows?: number | string
    cols?: number | string
    ghost?: boolean
    bordered?: boolean
}>(), {
    type: "text",
    disabled: false,
    bordered: true,
}
)

const name = toRef(props, "name");

const {
    value: inputValue,
    errorMessage,
} = useField(name, undefined, {
    syncVModel: true,
});


const variant = [
    'textarea-neutral',
    'textarea-primary',
    'textarea-secondary',
    'textarea-accent',
    'textarea-info',
    'textarea-success',
    'textarea-warning',
    'textarea-error',
]



const className = computed(() => {
    const arr: string[] = [];

    const inputClass = []


    if (props.bordered && !props.ghost) {
        inputClass.push('textarea-bordered')
    }

    if (props.variant) {
        inputClass.push(variant[variant.indexOf(`textarea-${props.variant}`)])
    }


    if (props.ghost) {
        inputClass.push('textarea-ghost')
    }


    if (!!errorMessage.value) {
        arr.push("textarea-error");
    }


    return clsx(arr.join(" "), inputClass.join(" "), props.class);
});

const textareaInput = computed({
    get() {
        return inputValue.value as string;
    },
    set(value) {
        inputValue.value = value;
    },
});

onMounted(async () => {
    await nextTick();
})
</script>

<template>

    <textarea
        :class="clsx(
            'textarea',
            className
        )"
        :name="name"
        :id="name"
        v-model="textareaInput"
        :disabled="disabled"
        :aria-label="ariaLabel"
        :placeholder="placeholder"
        class="w-full"
        :rows="rows"
        :cols="cols"
    />



    <TransitionX>
        <VeeErrorMessage
            :name="name"
            class="form-error-message"
        />
    </TransitionX>
</template>
