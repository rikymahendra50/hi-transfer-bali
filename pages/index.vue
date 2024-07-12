<template>
  <div>
    <div class="h-32"></div>
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

useHead({
  title: "Home",
})
</script>

<style scoped></style>