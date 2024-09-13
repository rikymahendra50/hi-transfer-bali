<template>
  <div class="h-28"></div>
  <div class="w-full border-b"></div>
</template>

<script setup lang="ts">
const { $logout } = useAuth();

useHead({ title: "Users" });
</script>
