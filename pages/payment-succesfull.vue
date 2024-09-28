<template>
  <div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-3xl font-bold">
            {{ $t("payment_success_page.title") }}
          </h1>
          <h3 class="text-2xl font-bold"># {{ order_id }}</h3>
          <p class="py-6">
            {{ $t("payment_success_page.description") }}
          </p>
          <NuxtLink to="/" class="btn btn-primary">{{
            $t("get_started_txt")
          }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t: $t } = useI18n();
const route = useRoute();

const order_id = computed(() => {
  return route.query.order ?? "";
});

useHead({
  title: $t("payment_success_page.title"),
});
</script>

<style scoped></style>
