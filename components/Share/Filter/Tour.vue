<template>
  <div class="space-y-4">
    <div>
      <UIFormMGroup name="tour_id" :label="$t('pilih-destinasi')">
        <VDropdown
          v-model="dataForm.location_id"
          placements="start"
          distance="-10"
          skidding="1"
          arrow-padding="1"
        >
          <button class="text-xs h-9 w-full flex justify-between items-center">
            <div>
              {{ selectedLocationName ?? $t("pilih-destinasi") }}
            </div>
            <div>
              <Icon name="i-heroicons-chevron-down" />
            </div>
          </button>
          <template #popper="{ hide }">
            <div class="w-full p-4 space-y-4 max-w-5xl">
              <!-- <input
                placeholder="Cari"
                class="input input-bordered input-sm w-full"
                v-model="searchQuery"
              /> -->
              <div class="space-y-4 overflow-y-auto h-full lg:max-h-[200px]">
                <div
                  v-for="location in locations?.data"
                  :key="location.id"
                  class="grid grid-cols-[150px_1fr] gap-4 hover:bg-primary/10 transition-all duration-300 p-4 rounded-md cursor-pointer"
                  @click="
                    selectLocation(location);
                    hide();
                  "
                >
                  <div>{{ location.name }}</div>
                </div>
              </div>
            </div>
          </template>
        </VDropdown>
      </UIFormMGroup>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr_110px] gap-4">
      <UIFormMGroup name="activity_date" :label="$t('pilih-tanggal')">
        <UIFormMTextField
          name="activity_date"
          type="date"
          v-model="dataForm.activity_date"
          placeholder="ex:2024-01-01"
        />
      </UIFormMGroup>

      <UIFormMGroup name="total_passengers" :label="$t('beberapa-orang')">
        <UIFormMTextField
          name="total_passengers"
          v-model="dataForm.tourist_numbers"
          placeholder="ex:1"
        />
      </UIFormMGroup>
      <div>
        <UIBtn variant="primary" @click="onSubmit">{{ $t("cari-tur") }}</UIBtn>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale, t: $t } = useI18n();
const { transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();

const selectedLocationName = ref();

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

const {
  data: locations,
  refresh,
  pending,
} = await useAsyncData(`locations`, () =>
  $fetch(`/locations`, {
    method: "GET",
    ...requestOptions,
  })
);

function replaceWindow() {
  const queryParams = {
    location: dataForm.value.location_id || undefined,
    tourist_numbers: dataForm.value.tourist_numbers || undefined,
  };

  router.replace({ query: queryParams });
}

function selectLocation(location) {
  dataForm.value.location_id = location.id;
  selectedLocationName.value = location.name;
}

function onSubmit() {
  let filters = [];
  if (dataForm.value.location_id) {
    filters.push(`location=${dataForm.value.location_id}`);
  }
  if (dataForm.value.tourist_numbers) {
    filters.push(`tourist_numbers=${dataForm.value.tourist_numbers}`);
  }

  const queryString = filters.join("&");
  const url = `/tours?${queryString ? `&${queryString}` : ""}`;

  saveFormData();

  // console.log(dataForm.value);

  router.replace(url);
}

onMounted(() => {
  showSavedTourData();
});
</script>

<style scoped></style>
