<template>
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
        <div
          class="w-full flex flex-col gap-2"
          v-if="
            dataForm.location_pickup_address || dataForm.location_return_address
          "
        >
          <div
            class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-4 text-lg 2xl:text-xl font-semibold"
          >
            <div class="text-start">
              {{ dataForm.location_pickup_address }}
            </div>
            <div class="hidden lg:block text-center">
              <Icon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </div>
            <div class="block lg:hidden text-center">
              <Icon name="i-heroicons-arrow-down" class="w-4 h-4" />
            </div>
            <div class="text-start">
              {{ dataForm.location_return_address }}
            </div>
          </div>
          <div
            class="text-zinc-400 text-sm whitespace-nowrap text-center lg:text-left"
          >
            {{ dataForm.pickup_date }} &nbsp; | &nbsp;
            {{ dataForm.passengers }}
            {{ $t("penumpang") }}
          </div>
        </div>
      </div>
    </UIContainer>
  </div>
  <UIContainer>
    <div class="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 divide-x-2">
      <div class="space-y-6 py-4">
        <h3 class="text-2xl font-semibold text-primary-dark">
          {{ $t("perjalanan-anda") }}
        </h3>
        <div
          class="space-y-4"
          v-if="dataForm.location_pickup_name && dataForm.location_return_name"
        >
          <VehicleAddressInformation
            :name="$t('penjemputan')"
            :locationName="dataForm.location_pickup_name"
            :locationAddress="dataForm.location_pickup_address"
          />
          <div class="divider text-xs text-zinc-400">
            {{ $t("perjalananmu-sekitar") }} {{ dataForm.distance }} Km
          </div>
          <VehicleAddressInformation
            :name="$t('tujuan')"
            :locationName="dataForm.location_return_name"
            :locationAddress="dataForm.location_return_address"
          />
        </div>
      </div>
      <div class="p-4">
        <div class="flex flex-col space-y-6">
          <div class="flex justify-between items-center">
            <div>
              {{ $t("menampilkan-mobil", { number: totalData }) }}
            </div>
            <div>
              <UIFormMGroup name="sort" :label="$t('urut-berdasarkan')">
                <UIFormMSelect v-model="filter.sort" name="sort" :class="true">
                  <option value="">{{ $t("semua") }}</option>
                  <option value="price">{{ $t("murah-ke-mahal") }}</option>
                  <option value="-price">{{ $t("mahal-ke-murah") }}</option>
                  <option value="recomended">{{ $t("rekomendasi") }}</option>
                </UIFormMSelect>
              </UIFormMGroup>
            </div>
          </div>
          <div class="space-y-4">
            <div v-if="apiData?.data.length > 0">
              <VehicleCard
                v-for="item in apiData?.data"
                :key="item.id"
                :id="item.id"
                :name="item.name"
                :image="item.image"
                :price="item.trip_price"
                :facilities="item.facilities"
                :maxPerson="item.max_person"
                class="mb-3"
              />
            </div>
            <Empty v-else :description="$t('mobil-tidak-ditemukan')" />
          </div>
        </div>
      </div>
    </div>
  </UIContainer>
</template>

<script setup>
const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const { locale, t: $t } = useI18n();

const selectedDistance = ref("");
const selectedPassenger = ref("");
const selectedTouristNumber = ref("");
const apiData = ref();
const totalData = ref();

const {
  dataForm,
  submitForm,
  saveFormData,
  showSavedCarData,
  clearSavedCarData,
} = useCarStore({
  callback: () => {
    console.log("Form has been submitted!");
  },
});

const filter = ref({
  sort: "",
});

// const totalData = computed(() => {
//   return apiData?.value.meta?.total;
// });

watch([() => selectedDistance, selectedPassenger], (newValues, oldValues) => {
  if (newValues !== oldValues) {
    replaceWindow();
  }
});

watch(
  () => filter.value.sort,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      replaceWindow();
    }
  }
);

onMounted(() => {
  if (route.query.sort) {
    filter.value.sort = route.query.sort;
  }
  if (route.query.distance && route.query.passengers) {
    selectedDistance.value = route.query.distance;
    selectedPassenger.value = route.query.passengers;
  }
  if (route.query.distance && !route.query.passengers) {
    selectedDistance.value = route.query.distance;
  }
  if (!route.query.distance && route.query.passengers) {
    selectedTouristNumber.value = route.query.passengers;
  }

  // replaceWindow();

  fetchData();

  showSavedCarData();
});

const fetchData = async () => {
  const { data, error, refresh } = await useAsyncData("cars", () =>
    $fetch(
      `/cars?sort=${filter.value.sort}&filter[passenger_count]=${selectedPassenger.value}&filter[distance]=${selectedDistance.value}&lang=${locale.value}`,
      {
        headers: {
          Accept: "application/json",
        },
        method: "get",
        ...requestOptions,
      }
    )
  );

  apiData.value = data.value;
  totalData.value = data?.value.meta?.total;
};

function replaceWindow() {
  let filters = [];
  if (selectedPassenger.value) {
    filters.push(`passengers=${selectedPassenger.value}`);
  }
  if (selectedDistance.value) {
    filters.push(`distance=${selectedDistance.value}`);
  }
  if (filter.value.sort) {
    filters.push(`sort=${filter.value.sort}`);
  }

  const queryString = filters.join("&");
  const url = `/vehicles?${queryString ? `${queryString}` : ""}`;

  fetchData();

  router.replace(url);
}

function goToHomePage() {
  clearSavedCarData();
  router.push({ path: "/?cars" });
}

useHead({
  title: "Vehicle",
  meta: [
    {
      name: "description",
      content:
        "Safe and Comfortable Transfer in Bali. A fleet of modern vehicles and experienced drivers are ready to take you wherever you want.",
    },
  ],
});
</script>

<style lang="scss" scoped></style>
