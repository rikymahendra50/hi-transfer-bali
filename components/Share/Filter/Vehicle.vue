<template>
  <div class="space-y-1">
    <div class="flex justify-center items-center">
      <div
        class="bg-primary flex justify-center rounded-full w-fit items-center px-2"
        v-if="dataForm.quantity"
      >
        <div class="p-1 text-sm text-white">
          <span> {{ dataForm.quantity }} Km</span>
        </div>
      </div>
    </div>
    <VeeForm
      @submit="onSubmit"
      v-slot="{ errors }"
      :validation-schema="carSearchSchemaShouldUse"
    >
      <div
        class="grid grid-cols-1 lg:grid-cols-[1fr_50px_1fr] gap-4 items-center"
      >
        <UIFormMGroup :label="$t('jemput-dimana')" name="pickup_address">
          <UIFormTextFieldWModal
            v-model="formDataJemput.locationAddress"
            v-model:latitude="formDataJemput.latitude"
            v-model:longitude="formDataJemput.longitude"
            v-model:locationAddress="formDataJemput.locationAddress"
            v-model:locationName="formDataJemput.locationName"
            :dataJikaSudahada="formDataJemput"
            name="pickup_address"
            placeholder="ex:Jalan Pahlawan No. 1"
          />
        </UIFormMGroup>

        <div class="flex flex-col gap-1 items-center">
          <div class="flex justify-center items-center">
            <Icon
              :name="
                isMobile
                  ? 'i-heroicons-arrows-up-down'
                  : 'i-heroicons-arrows-right-left'
              "
              class="w-6 h-6"
            />
          </div>
        </div>
        <UIFormMGroup :label="$t('mau-kemana')" name="return_address">
          <UIFormTextFieldWModal
            v-model="formDataTujuan.locationAddress"
            v-model:latitude="formDataTujuan.latitude"
            v-model:longitude="formDataTujuan.longitude"
            v-model:locationAddress="formDataTujuan.locationAddress"
            v-model:locationName="formDataTujuan.locationName"
            :dataJikaSudahada="formDataTujuan"
            name="return_address"
            placeholder="ex:Jalan Pahlawan No. 1"
          />
        </UIFormMGroup>
      </div>
      <div
        class="flex flex-wrap gap-6 mt-5 md:mt-7 items-center justify-evenly"
      >
        <div
          class=""
          :class="{
            'lg:w-[20%]': dateReturnDisabled,
            'lg:w-fit': !dateReturnDisabled,
          }"
        >
          <UIFormToggle
            name="round_trip"
            label="Pulang - Pergi"
            v-model="dataForm.round_trip"
            true-value="1"
            false-value="0"
            variant="primary"
          />
        </div>

        <div
          class="w-full"
          :class="{
            'lg:w-[30%]': dateReturnDisabled,
            'lg:w-fit': !dateReturnDisabled,
          }"
        >
          <UIFormMGroup name="pickup_date" :label="$t('jemput-tanggal')">
            <UIFormMTextField
              name="pickup_date"
              :min="today"
              v-model="dataForm.pickup_date"
              type="date"
              placeholder="ex:2024-01-01"
            />
          </UIFormMGroup>
        </div>

        <div
          class="relative w-full"
          :class="{
            'lg:w-[30%]': dateReturnDisabled,
            'lg:w-fit': !dateReturnDisabled,
          }"
          v-if="!dateReturnDisabled"
        >
          <UIFormMGroup name="return_date" :label="$t('pulang-balik')">
            <UIFormMTextField
              name="return_date"
              v-model="dataForm.return_date"
              type="date"
              :min="dataForm.pickup_date ?? today"
              :max="maxReturnDate"
              placeholder="ex:2024-01-02"
            />
          </UIFormMGroup>
        </div>

        <div
          class="w-full"
          :class="{
            'lg:w-[30%]': dateReturnDisabled,
            'lg:w-fit': !dateReturnDisabled,
          }"
        >
          <UIFormMGroup name="passengers" :label="$t('jumlah-penumpang')">
            <UIFormMSelect name="passengers" v-model="dataForm.passengers">
              <option value="1">1 {{ $t("penumpang") }}</option>
              <option value="2">2 {{ $t("penumpang") }}</option>
              <option value="3">3 {{ $t("penumpang") }}</option>
              <option value="4">4 {{ $t("penumpang") }}</option>
              <option value="5">5 {{ $t("penumpang") }}</option>
              <option value="6">6 {{ $t("penumpang") }}</option>
            </UIFormMSelect>
          </UIFormMGroup>
        </div>

        <div class="w-full md:w-fit">
          <div class="flex justify-end">
            <UIBtn
              variant="primary"
              type="submit"
              :disabled="loading && !dataForm.distance"
            >
              {{ $t("cari-mobil") }}
            </UIBtn>
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import axios from "axios";

const { requestOptions } = useRequestOptions();
const { loading, message, alertType, setErrorMessage, transformErrors } =
  useRequestHelper();
const { pushNotification } = useNotification();
const { carSearchSchema, carSearchSchemaIfPickUpTrue } = useSchema();
const { locale, t: $t } = useI18n();
const config = useRuntimeConfig();
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("lg");
const router = useRouter();
const { $toast } = useNuxtApp();

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

const formDataJemput = ref({
  latitude: undefined,
  longitude: undefined,
  locationAddress: undefined,
  locationName: undefined,
});

const formDataTujuan = ref({
  latitude: undefined,
  longitude: undefined,
  locationAddress: undefined,
  locationName: undefined,
});

const distance = ref();
const distanceRound = ref();

const dateReturnDisabled = computed(() => {
  if (dataForm.value.round_trip == 1) {
    dataForm.value.return_date = undefined;
    return false;
  } else if (dataForm.value.round_trip == 0) {
    return true;
  }
});

const carSearchSchemaShouldUse = computed(() => {
  if (dateReturnDisabled.value) {
    return carSearchSchema;
  } else {
    return carSearchSchemaIfPickUpTrue;
  }
});

watch(
  () => dataForm.value.pickup_date,
  (newPickupDate) => {
    if (newPickupDate && dataForm.value.return_date < newPickupDate) {
      dataForm.value.return_date = "";
    }
  }
);

watch(
  () => formDataJemput.value.longitude,
  (newValue, oldValue) => {
    formDataJemput.value.longitude = newValue;
    calculateDistanceMatrix();
  }
);

watch(
  () => formDataJemput.value.latitude,
  (newValue, oldValue) => {
    formDataJemput.value.latitude = newValue;
    calculateDistanceMatrix();
  }
);

watch(
  () => formDataTujuan.value.longitude,
  (newValue, oldValue) => {
    formDataTujuan.value.longitude = newValue;
    calculateDistanceMatrix();
  }
);

watch(
  () => formDataTujuan.value.latitude,
  (newValue, oldValue) => {
    formDataTujuan.value.latitude = newValue;
    calculateDistanceMatrix();
  }
);

watch(
  () => dataForm.value.round_trip,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      calculateDistanceMatrix();
    }
  }
);

const maxReturnDate = ref("");

watch(
  () => dataForm.value.pickup_date,
  (newPickupDate) => {
    if (newPickupDate) {
      const pickupDate = new Date(newPickupDate);
      // Tambahkan 7 hari ke pickup_date
      const returnDate = new Date(pickupDate);
      returnDate.setDate(pickupDate.getDate() + 7);
      // Formatkan tanggal menjadi YYYY-MM-DD
      maxReturnDate.value = returnDate.toISOString().split("T")[0];
    } else {
      maxReturnDate.value = "";
    }
  }
);

async function calculateDistanceMatrix() {
  if (formDataJemput.value.latitude && formDataTujuan.value.latitude) {
    const lat1 = parseFloat(formDataJemput.value.latitude);
    const lng1 = parseFloat(formDataJemput.value.longitude);
    const lat2 = parseFloat(formDataTujuan.value.latitude);
    const lng2 = parseFloat(formDataTujuan.value.longitude);

    const origin = { lat: lat1, lng: lng1 };
    const destination = { lat: lat2, lng: lng2 };

    const service = new window.google.maps.DistanceMatrixService();

    await service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK" && lat1 !== lat2 && lat2 !== lng2) {
          const result = response.rows[0].elements[0];
          distance.value =
            result?.distance?.value <= 1000
              ? 1000
              : Math.ceil(result?.distance?.value);
          distanceRound.value = result?.distance?.text;

          // alert("ini adalah math ceil", distance.value);

          // alert("ini adalah distance not round", result?.distance?.text);

          dataForm.value.distance = parseInt(distance.value / 1000);
          dataForm.value.quantity = parseInt(distance.value / 1000);
          dataForm.value.distance_text = distanceRound.value;

          if (dataForm.value.round_trip == 1) {
            const test = parseInt(distance.value / 1000);
            dataForm.value.distance = test.toFixed(1) * 2;
            dataForm.value.quantity = test.toFixed(1) * 2;
          }
        } else {
          $toast.error($t("lokasi-tidak-boleh-sama"));
          dataForm.value.distance = "";
          dataForm.value.quantity = "";
          dataForm.value.distance_text = "";

          formDataJemput.value = {};
          formDataTujuan.value = {};
        }
      }
    );
  }
}

function onSubmit() {
  if (formDataJemput.value.latitude == formDataTujuan.value.latitude) {
    $toast.error($t("lokasi-tidak-boleh-sama"));
  } else {
    // jemput
    dataForm.value.location_pickup_address =
      formDataJemput.value.locationAddress;
    dataForm.value.location_pickup_name = formDataJemput.value.locationName;
    dataForm.value.location_pickup_latitude = formDataJemput.value.latitude;
    dataForm.value.location_pickup_longitude = formDataJemput.value.longitude;

    // destinasi
    dataForm.value.location_return_address =
      formDataTujuan.value.locationAddress;
    dataForm.value.location_return_name = formDataTujuan.value.locationName;
    dataForm.value.location_return_latitude = formDataTujuan.value.latitude;
    dataForm.value.location_return_longitude = formDataTujuan.value.longitude;

    saveFormData();

    window.location.href = "/vehicles";
  }
}

const today = new Date().toISOString().split("T")[0];
</script>

<style scoped></style>
