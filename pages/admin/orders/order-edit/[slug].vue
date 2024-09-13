<template>
  <p>test</p>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  // @ts-ignore
  // middleware: ["auth", "admin"],
});

useHead({
  title: "Order edit",
});
</script>
