<template>
  <div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-3xl font-bold">
            {{ $t("payment_failed_page.title") }}
          </h1>
          <h3 class="text-2xl font-bold"># {{ order_id }}</h3>
          <p class="py-6">
            {{ $t("payment_failed_page.description") }}
          </p>
          <NuxtLink to="/contact" class="btn btn-primary">{{
            $t("contact_us_txt")
          }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { t: $t } = useI18n();

const order_id = computed(() => {
  return route.query.order ?? "";
});

useHead({
  title: $t("payment_failed_page.title"),
});
</script>

<style scoped></style>
