<template>
  <div>
    <div class="h-32" id="learnmore"></div>
    <HeroHomeBanner />
    <UIContainer>
      <TourHighLight />
    </UIContainer>
    <UIContainer>
      <StepToJoin />
    </UIContainer>
    <ShareCtaSection />
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();

useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content:
        "Safe and Comfortable Transfer in Bali. A fleet of modern vehicles and experienced drivers are ready to take you wherever you want.",
    },
  ],
});
</script>

<style scoped></style>
