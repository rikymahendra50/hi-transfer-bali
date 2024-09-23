<template>
  <div>
    <div class="space-y-4 p-4 border rounded-xl">
      <div class="flex flex-col lg:flex-row lg:justify-between item-center">
        <div>{{ $t("yang-harus-kamu-bayar") }}</div>
        <div class="text-lg font-semibold text-primary">
          {{ FormatMoneyDash(props.price) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale, t: $t } = useI18n();

const props = defineProps({
  price: {
    type: [String, Number],
  },
});
</script>

<style scoped></style>
