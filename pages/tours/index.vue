<template>
  <div>
    <div class="h-28"></div>
    <div class="w-full border-b">
      <UIContainer>
        <div
          class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full"
        >
          <div>
            <UIBtn
              @click="goToHomePage()"
              variant="primary"
              outlined
              class="whitespace-nowrap"
              >{{ $t("kembali-ke-beranda") }}</UIBtn
            >
          </div>
          <div class="w-full">
            <div
              class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-4 text-lg lg:text-xl font-semibold"
            >
              <div class="text-center">Bandara Int'l I Gusti Ngurah Rai</div>
            </div>
            <div
              class="text-zinc-400 text-sm whitespace-nowrap text-center lg:text-left"
            >
              21 Juni 2024 | 2 {{ $t("orang") }}
            </div>
          </div>
        </div>
      </UIContainer>
    </div>
    <UIContainer>
      <div class="flex flex-col space-y-6 mt-4">
        <div class="flex justify-between items-center">
          <div>
            {{ $t("menampilkan-paket-tur", { number: dataT?.meta?.total }) }}
          </div>
          <div>
            <!-- <UIFormMGroup name="sort" label="Urut berdasarkan">
              <UIFormMSelect v-model="filter.sort" name="sort">
                <option value="">Semua</option>
                <option value="recommended">Rekomendasi</option>
              </UIFormMSelect>
            </UIFormMGroup> -->
          </div>
        </div>
        <div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            v-if="dataT?.data?.length > 0"
          >
            <TourCard
              v-for="item in dataT?.data"
              :key="item.id"
              :description="item.locations"
              :price="item.price"
              :name="item.name"
              :image="item.thumbnail_image?.image"
              :slug="'/tours/' + item.slug"
            />
          </div>
          <Empty v-else :description="$t('paket-tur-tidak-ditemukan')" />
        </div>
      </div>
    </UIContainer>
    <div class="h-10"></div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { requestOptions } = useRequestOptions();
const { locale, t: $t } = useI18n();

useHead({
  title: "Tours",
  meta: [
    {
      name: "description",
      content:
        "Safe and Comfortable Transfer in Bali. A fleet of modern vehicles and experienced drivers are ready to take you wherever you want.",
    },
  ],
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

useHead({ title: "Tours" });

const param = ref();
const selectedLocation = ref();
const selectedTouristNumber = ref();
const dataT = ref();

onMounted(async () => {
  if (route.query.location && route.query.tourist_numbers) {
    selectedLocation.value = route.query.location;
    selectedTouristNumber.value = route.query.tourist_numbers;
  }
  if (route.query.location && !route.query.tourist_numbers) {
    selectedLocation.value = route.query.location;
  }
  if (!route.query.location && route.query.tourist_numbers) {
    selectedTouristNumber.value = route.query.tourist_numbers;
  }

  fetchData();
});

const filter = ref({ sort: "" });

watch(
  [() => filter.value.sort, selectedLocation, selectedTouristNumber],
  fetchData
);

async function fetchData() {
  const { data, error, refresh } = await useAsyncData("tours", () =>
    $fetch(
      `/tours?sort=${filter.value.sort}&lang=${locale.value}&filter[location_id]=${selectedLocation.value}&filter[tourist_numbers]=${selectedTouristNumber.value}`,
      {
        headers: {
          Accept: "aplication/json",
        },
        method: "get",
        ...requestOptions,
      }
    )
  );
  dataT.value = data.value;
}

function goToHomePage() {
  clearSavedTourData();
  router.push({ path: "/?tours" });
}

// onMounted(() => {
//   const savedFormData = localStorage.getItem("vehicleFormData");
//   if (savedFormData) {
//     vehicleForm.dataForm = JSON.parse(savedFormData);
//   }
//   console.log(savedFormData);
// });
</script>
