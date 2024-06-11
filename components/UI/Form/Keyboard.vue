<script setup lang="ts">
import Keyboard from 'simple-keyboard';
import type { SimpleKeyboard } from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

import { onClickOutside } from "@vueuse/core"

const keyboard = ref<HTMLDivElement>()

const props = defineProps<{
    input: string
    isOpen: boolean
}>()

const emit = defineEmits<{
    (e: '@change', value: string): void,
    (e: '@keypress', value: string): void,
}>()

const simpleKeyboard = ref<SimpleKeyboard>()

function onChange(input: string) {
    emit('@change', input)
}



function onKeyPress(button: string) {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();


}

function handleShift() {
    let currentLayout = simpleKeyboard.value?.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    simpleKeyboard.value?.setOptions({
        layoutName: shiftToggle,
    });
}

watch(() => props.input, (val) => {
    simpleKeyboard.value?.setInput(val)
})

onMounted(async () => {
    await nextTick()
    simpleKeyboard.value = new Keyboard('.keyboard', {
        onChange,
        onKeyPress,
        newLineOnEnter: true,
        display: {
            "{bksp}": "←",
            "{tab}": "Tab ⇄",
            "{lock}": "Caps Lock",
            "{enter}": "Enter↵",
            "{shift}": "⇑Shift",
            "{space}": "Space",
        },
    })
})


</script>

<template>
    <div
        ref="keyboard"
        class="keyboard"
    ></div>
</template>