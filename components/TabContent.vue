<template>
  <ClientOnly>
    <form @submit.prevent="onSubmit">
      <div role="tablist" class="tabs tabs-lifted !rounded-lg">
        <slot></slot>
      </div>
    </form>
  </ClientOnly>
</template>

<script setup lang="ts">
function onSubmit() {}
onMounted(async () => {
  await nextTick();
});
</script>

<style scoped></style>
