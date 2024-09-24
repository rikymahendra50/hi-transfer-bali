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

const {
  dataForm,
  submitFormOrder,
  saveFormData,
  showSavedCarData,
  clearSavedCarData,
} = useCarStore({
  callback: () => {
    alert("Form has been submitted!");
  },
});

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

onMounted(() => {
  clearSavedCarData();
});
</script>

<style scoped></style>
