<template>
  <NuxtLink
    :to="slug"
    @click="goToTourBooking(props.id, props.image, name, price, description)"
    class="overflow-hidden rounded-xl space-y-2 border border-zinc-200 shadow-sm group"
  >
    <div class="h-[300px] overflow-hidden">
      <img
        :src="props.image ?? 'https://placehold.co/150'"
        :alt="image"
        class="h-[300px] w-full object-cover group-hover:scale-125 transition-all duration-300"
      />
    </div>
    <div class="p-3 space-y-4">
      <div>
        <h4 class="text-xl font-semibold text-primary-dark">
          {{ name }}
        </h4>
        <div class="text-zinc-400 text-sm line-clamp-2">
          {{ result }}
        </div>
      </div>
      <div>
        <div class="text-zinc-400 text-xs">{{ $t("harga-mulai-dari") }}</div>
        <h4 class="text-xl font-semibold text-primary">
          {{ FormatMoneyDash(price.toString()) }} /{{ $t("orang") }}
        </h4>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const { locale, t: $t } = useI18n();

const props = defineProps({
  id: { type: [String, Number] },
  name: { type: String },
  slug: { type: String },
  description: { type: [String, Array] },
  image: { type: String },
  price: { type: [String, Number] },
});

const result = computed(() => {
  return props.description.map((item) => item.name).join(" - ");
});

const {
  dataForm,
  submitForm,
  saveFormData,
  showSavedTourData,
  clearSavedTourData,
} = useTourStore({
  callback: () => {
    alert("Form has been submitted!");
  },
});

function goToTourBooking(id, image, name, price, description) {
  showSavedTourData();

  dataForm.value.tour_id = id;
  dataForm.value.tour_image = image;
  dataForm.value.tour_name = name;
  dataForm.value.price = price;
  dataForm.value.list_location = description;
  dataForm.value.list_location_string = result.value;

  console.log("ini untuk cek tur id", dataForm.value.tour_id, id);

  saveFormData();

  console.log(
    "Ini dari card tour, harusnya menyimpan image, name dan harga dari tour",
    dataForm.value
  );

  router.push("/vehicles/booking");
}
</script>

<style scoped></style>
