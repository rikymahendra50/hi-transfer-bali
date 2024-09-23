<template>
  <div class="space-y-6 py-6">
    <h3 class="text-[32px] leading-[40px] font-semibold text-primary-dark">
      {{ $t("pesan-di-hitravel") }}
    </h3>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <StepToJoinCard
        v-for="(step, index) in steps"
        :key="index"
        :step="step"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, t: $t } = useI18n();

const steps = ref([
  {
    title: "1." + $t("pesan-di-hitravel-list.list-1.title"),
    decription: $t("pesan-di-hitravel-list.list-1.desk"),
    image: "/hi-travel-feat-1.png",
  },
  {
    title: "2." + $t("pesan-di-hitravel-list.list-2.title"),
    decription: $t("pesan-di-hitravel-list.list-2.desk"),
    image: "/hi-travel-feat-2.png",
  },
  {
    title: "3." + $t("pesan-di-hitravel-list.list-3.title"),
    decription: $t("pesan-di-hitravel-list.list-3.desk"),
    image: "/hi-travel-feat-3.png",
  },
]);
</script>

<style scoped></style>
