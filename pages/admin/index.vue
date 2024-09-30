<template>
  <div>
    <CommonHeadPage
      title="Manage Incoming Order"
      description="Review, approve, and process orders with ease."
    >
    </CommonHeadPage>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});
</script>

<style scoped></style>
