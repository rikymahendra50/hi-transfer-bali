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


const input = ref<HTMLInputElement>()

</script>

<template>
    <label :class="clsx(
        'flex items-center  rounded-lg focus-within:outline-none w-full h-9 overflow-hidden',
        {
            'gap-2': !!$slots.leftSection || !!$slots.rightSection,
            'pl-0': !$slots.leftSection,
            'pr-0': !$slots.rightSection
        }
    )">
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
            :class="clsx('w-full h-full !outline-none focus:!border-none disabled:bg-gray-50', {
                'px-1': !$slots.leftSection || !$slots.rightSection
            })"
            v-bind="$attrs"
        />
        <slot
            v-if="$slots.rightSection"
            name="rightSection"
        />
    </label>
</template>
