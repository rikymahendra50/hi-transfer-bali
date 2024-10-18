<template>
  <div>
    <div class="h-44 lg:h-32" id="learnmore"></div>
    <HeroHomeBanner />
    <UIContainer>
      <TourHighLight />
    </UIContainer>
    <UIContainer>
      <StepToJoin />
    </UIContainer>
    <ShareCtaSection />

    <pre>
      {{ routes }}
    </pre>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const config = useRuntimeConfig();
import axios from "axios";

const routes = ref([]);

try {
  const response = await axios.get(
    `${config.public.API_ENDPOINT}/popular-tours?lang=en`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  const popularTours = response.data;

  console.log(popularTours.data[0].slug);

  if (popularTours && Array.isArray(popularTours)) {
    popularTours.forEach((tour: any) => {
      routes.push(`/tours/${tour.slug}`);
    });
  }
} catch (error) {
  console.error("Error fetching popular tours:", error);
}

const {
  dataForm,
  submitForm,
  saveFormData,
  showSavedTourData,
  clearSavedTourData,
} = useTourStore({
  callback: () => {
    console.log("Form has been submitted!");
  },
});

const {
  dataForm: dataFormCar,
  saveFormData: saveFormDataCar,
  showSavedCarData,
  clearSavedCarData,
} = useCarStore({
  callback: () => {
    console.log("Form has been submitted!");
  },
});

useHead({
  title: "Hai Transfer Bali",
  meta: [
    {
      name: "description",
      content:
        "Safe and Comfortable Transfer in Bali. A fleet of modern vehicles and experienced drivers are ready to take you wherever you want.",
    },
  ],
});

onMounted(() => {
  clearSavedTourData();
  clearSavedCarData();
});

definePageMeta({
  layout: "default",
});
</script>

<style scoped></style>
