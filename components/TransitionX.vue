<template>
    <Transition
        enter-from-class="opacity-0"
        enter-to-class="transition-all duration-1000 animate-popup"
        leave-from-class="transition-all duration-1000 animate-popin"
        leave-to-class="opacity-0"
    >
        <slot />
    </Transition>
</template>

<script setup></script>

<style
    lang="scss"
    scoped
></style>