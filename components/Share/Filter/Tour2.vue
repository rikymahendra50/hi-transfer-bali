<template>
  <VeeForm
    @submit="onSubmit"
    v-slot="{ errors }"
    :validation-schema="tourSearchSchema2"
    class="space-y-4 w-full"
  >
    <div class="grid md:grid-cols-1 w-full gap-4">
      <UIFormMGroup name="activity_date" :label="$t('pilih-tanggal')">
        <UIFormMTextField
          name="activity_date"
          type="date"
          :min="today"
          v-model="formData.activity_date"
          placeholder="ex:2024-01-01"
        />
      </UIFormMGroup>
      <div class="flex justify-end">
        <UIBtn variant="primary" type="submit">{{ $t("select-date") }}</UIBtn>
      </div>
    </div>
  </VeeForm>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  dataLocation: {
    type: Array,
  },
});

const emit = defineEmits(["update:modelValue", "functiSave"]);

const { locale, t: $t } = useI18n();
const { transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const { tourSearchSchema, tourSearchSchema2 } = useSchema();
const router = useRouter();

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
    alert("Form has been submitted!");
  },
});

// const {
//   data: locations,
//   refresh,
//   pending,
// } = await useAsyncData(`locations`, () =>
//   $fetch(`/locations`, {
//     method: "GET",
//     ...requestOptions,
//   })
// );

function replaceWindow() {
  const queryParams = {
    location: dataForm.value.location_id || undefined,
    // tourist_numbers: dataForm.value.tourist_numbers || undefined,
  };

  router.replace({ query: queryParams });
}

function selectLocation(location) {
  formData.value.location_id = location.id;
  selectedLocationName.value = location.name;
}

function onSubmit() {
  dataForm.value.location_id = formData.value.location_id;
  dataForm.value.location_name = selectedLocationName.value;
  dataForm.value.activity_date = formData.value.activity_date;
  // dataForm.value.tourist_numbers = formData.value.tourist_numbers;

  // console.log("test");
  // console.log("ini untuk cek location", formData.value.location_id);

  saveFormData();

  location.reload();

  emit("update:modelValue", false);
}

onMounted(() => {
  showSavedTourData();
});

const today = new Date().toISOString().split("T")[0];
</script>

<style scoped></style>
