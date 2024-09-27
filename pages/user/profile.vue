<template>
  <div>
    <div class="h-28"></div>
    <div class="flex justify-center">
      <div class="max-w-xl space-y-8 p-4">
        <UIFormProfile @reload="$fetchAuthProfile()" used-by="user" />
        <UIFormChangePassword used-by="user" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { $fetchAuthProfile } = useAuth();

useHead({
  title: "User",
});

definePageMeta({
  layout: "user",
  // @ts-ignore
  middleware: ["auth", "user"],
});
</script>

<style scoped></style>
