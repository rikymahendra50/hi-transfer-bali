<template>
  <VeeForm
    v-slot="{ errors }"
    @submit="onSubmit"
    :validation-schema="tourSearchSchema"
    class="space-y-4"
  >
    <div class="grid lg:grid-cols-12 gap-4">
      <div class="lg:col-span-5">
        <UIFormMGroup name="tour_id" :label="$t('pilih-destinasi')">
          <VDropdown
            v-model="formData.location_id"
            placements="start"
            distance="-10"
            skidding="1"
            arrow-padding="1"
          >
            <button
              type="button"
              class="text-xs h-9 w-full flex justify-between items-center"
            >
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
                    @click.prevent="
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
        <VeeField
          type="text"
          name="location"
          class="hidden"
          id="location"
          v-model="formData.location_id"
        />
        <VeeErrorMessage name="location" class="form-error-message" />
      </div>
      <div class="lg:col-span-5">
        <UIFormMGroup name="activity_date" :label="$t('pilih-tanggal')">
          <UIFormMTextField
            name="activity_date"
            type="date"
            :min="today"
            v-model="formData.activity_date"
            placeholder="ex:2024-01-01"
          />
        </UIFormMGroup>
      </div>
      <div class="lg:col-span-2 flex items-center justify-end">
        <UIBtn variant="primary" type="submit">
          {{ $t("cari-tur") }}
        </UIBtn>
      </div>
    </div>
  </VeeForm>
</template>

<script setup>
const { locale, t: $t } = useI18n();
const { transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const { tourSearchSchema } = useSchema();
const router = useRouter();

const changeRoute = async (route) => {
  // e.preventDefault();
  await useRouter().push(route);
};

const selectedLocationName = ref();

const formData = ref({
  location_id: undefined,
  activity_date: undefined,
  // tourist_numbers: undefined,
});

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
  data: locations,
  refresh,
  pending,
} = await useAsyncData(`locations`, () =>
  $fetch(`/locations`, {
    method: "GET",
    ...requestOptions,
  })
);

// function replaceWindow() {
//   const queryParams = {
//     location: dataForm.value.location_id || undefined,
//     // tourist_numbers: dataForm.value.tourist_numbers || undefined,
//   };

//   router.replace({ query: queryParams });
// }

function selectLocation(location) {
  formData.value.location_id = location.id;
  selectedLocationName.value = location.name;
}

function onSubmit() {
  dataForm.value.location_id = formData.value.location_id;
  dataForm.value.location_name = selectedLocationName.value;
  dataForm.value.activity_date = formData.value.activity_date;

  let filters = [];
  if (dataForm.value.location_id) {
    filters.push(`location=${dataForm.value.location_id}`);
  }

  const queryString = filters.join("&");
  const url = `/tours?${queryString ? `&${queryString}` : ""}`;

  saveFormData();

  // router.push(url);
  // window.location.replace(url);
  // changeRoute(url);
  window.location.href = url;
}

onMounted(() => {
  showSavedTourData();
});

const today = new Date().toISOString().split("T")[0];
</script>

<style scoped></style>
