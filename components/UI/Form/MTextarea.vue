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
    rows?: number | string
    cols?: number | string
    readonly?: boolean
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

const { setError }: any = inject('group-form')

watch(errorMessage, (value) => {

    if (value) {
        setError(true)
    } else {
        setError(false)
    }
})




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
            'w-full h-full !outline-none focus:!border-none disabled:bg-gray-50',
        )"
        :name="name"
        :id="name"
        v-model="textareaInput"
        :readonly="readonly"
        :disabled="disabled"
        :aria-label="ariaLabel"
        :placeholder="placeholder"
        class="w-full h-full"
        :rows="rows"
        :cols="cols"
        v-bind="$attrs"
    />



    <TransitionX>
        <VeeErrorMessage
            :name="name"
            class="form-error-message"
        />
    </TransitionX>
</template>
