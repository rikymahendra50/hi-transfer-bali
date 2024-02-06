<template>
  <Transition
    enter-active-class="transition-all duration-300 opacity-0 ease-in"
    leave-active-class="transition-all duration-300 opacity-0 ease-out"
    enter-from-class="transition-all duration-500 opacity-0 -translate-x-20"
    leave-to-class="transition-all duration-1000 opacity-0 translate-x-20"
  >
    <slot />
  </Transition>
</template>

<script setup></script>

<style lang="scss" scoped></style>
