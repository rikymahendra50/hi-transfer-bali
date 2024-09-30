<template>
  <div class="rounded-lg overflow-hidden relative">
    <div
      class="my-2 bg-yellow-600 w-fit px-2 py-1 rounded-lg text-gray-100 text-sm md:text-base"
    >
      <p>{{ $t("pastikan-lokasi") }}</p>
    </div>
    <div class="relative z-[10000] grid md:flex gap-3 items-center">
      <button
        @click="getUserLocation"
        class="btn border-primary border bg-white text-primary md:mb-3"
      >
        {{ $t("dapatkan-lokasi-anda") }}
      </button>
      <GMapAutocomplete
        class="input input-bordered flex-grow mb-3"
        placeholder="Search Location"
        @place_changed="setPlace"
        :select-first-on-enter="true"
      >
      </GMapAutocomplete>
    </div>

    <GMapMap
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 270px"
      :options="{
        disableDefaultUi: false,
        draggableCursor: 'pointer',
      }"
      @click="handleMapClick"
    >
      <GMapMarker
        :key="'current'"
        :position="currentMarkerPosition"
        :icon="{
          url: '/marker-red.svg',
          scaledSize: { width: 50, height: 50 },
        }"
        :clickable="true"
      >
      </GMapMarker>
    </GMapMap>

    <div class="flex justify-between mt-3 items-center gap-3">
      <div class="grid gap-1">
        <p class="font-semibold lg:text-[20px]">{{ $t("location") }} :</p>
        <p class="text-sm">{{ locationName }}</p>
        <p class="text-sm">{{ locationAddress }}</p>
      </div>

      <button
        @click="submitKoordinat"
        type="submit"
        class="bg-primary text-sm text-white normal-case !font-medium hover:bg-primary whitespace-nowrap md:col-span-2 btn"
      >
        {{ $t("pilih-lokasi-ini") }}
      </button>

      <!-- <div class="border-2 border-red-500">
        {{ props.latitude }}
        <p>test</p>
      </div> -->
      <!-- {{ props.dataJikaSudahada3 }} -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  latitude: {
    type: [String, Number],
  },
  longitude: {
    type: [String, Number],
  },
  locationAddress: {
    type: [String, Number],
  },
  locationName: {
    type: String,
  },
  dataJikaSudahada3: {
    type: [Array, Object],
  },
});

import { ref, watch } from "vue";

const { $toast } = useNuxtApp();

const center = ref({
  lat: props.dataJikaSudahada3?.latitude ?? -8.417347915171359,
  lng: props.dataJikaSudahada3?.longitude ?? 115.19596919507471,
});
const currentMarkerPosition = ref({
  lat: props.dataJikaSudahada3?.latitude ?? -8.417347915171359,
  lng: props.dataJikaSudahada3?.longitude ?? 115.19596919507471,
});

const latitudeFix = ref(
  props.dataJikaSudahada3?.latitude ?? -8.417347915171359
);
const longitudeFix = ref(
  props.dataJikaSudahada3?.longitude ?? 115.19596919507471
);
const locationAddress = ref(props.dataJikaSudahada3?.locationAddress ?? "");
const locationName = ref(props.dataJikaSudahada3?.locationName ?? "");

const emit = defineEmits([
  "update:longitude",
  "update:latitude",
  "update:locationAddress",
  "update:locationName",
  "hideModal",
]);

// Batas koordinat Bali
const baliBounds = {
  minLat: -9.0, // Menambah area ke selatan
  maxLat: -8.0, // Memperbaiki area utara
  minLng: 114.0, // Menambah area ke barat
  maxLng: 115.7, // Memperbaiki area timur
};

// Fungsi untuk mengambil lokasi pengguna dengan Geolocation API
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (isWithinBaliBounds(lat, lng)) {
          latitudeFix.value = lat;
          longitudeFix.value = lng;

          center.value = { lat, lng };
          currentMarkerPosition.value = { lat, lng };
        } else {
          $toast.error($t("lokasi-harus-dibali"));
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  } else {
    // alert("Geolocation tidak didukung di browser ini.");
    $toast.error($t("geolocation-tidak-didukung"));
  }
}

// Fungsi untuk mendapatkan alamat dari koordinat menggunakan Geocoding API
async function fetchAddress(latitude, longitude) {
  const geocoder = new google.maps.Geocoder();
  const latLng = {
    lat: parseFloat(latitude.value),
    lng: parseFloat(longitude.value),
  };

  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === "OK" && results.length > 0) {
      locationAddress.value = results[0].formatted_address;
      locationName.value = getDescriptiveLocationName(
        results[0].address_components
      );
    } else {
      alert("Geocode was not successful: " + status);
    }
  });
}

function handleMapClick(event) {
  const latitude = event.latLng.lat();
  const longitude = event.latLng.lng();

  if (isWithinBaliBounds(latitude, longitude)) {
    currentMarkerPosition.value = { lat: latitude, lng: longitude };
    center.value = { lat: latitude, lng: longitude };

    latitudeFix.value = latitude;
    longitudeFix.value = longitude;
  } else {
    $toast.error($t("lokasi-harus-dibali"));
  }
}

function setPlace(ctx) {
  const latitude = ctx.geometry?.location?.lat();
  const longitude = ctx.geometry?.location?.lng();

  if (isWithinBaliBounds(latitude, longitude)) {
    currentMarkerPosition.value = { lat: latitude, lng: longitude };
    center.value = { lat: latitude, lng: longitude };

    latitudeFix.value = latitude;
    longitudeFix.value = longitude;
  } else {
    $toast.error($t("lokasi-harus-dibali"));
  }
}

function isWithinBaliBounds(lat, lng) {
  return (
    lat >= baliBounds.minLat &&
    lat <= baliBounds.maxLat &&
    lng >= baliBounds.minLng &&
    lng <= baliBounds.maxLng
  );
}

function getDescriptiveLocationName(addressComponents) {
  const types = [
    "establishment",
    "point_of_interest",
    // "locality",
    // "administrative_area_level_1",
    "country",
    // "administrative_area_level_2",
    // "administrative_area_level_3",
    // "administrative_area_level_4",
    // "administrative_area_level_5",
    // "administrative_area_level_6",
    // "administrative_area_level_7",
    "archipelago",
    // "colloquial_area",
    "continent",
    "food",
    "floor",
    "general_contractor",
    "geocode",
    "health",
    // "intersection",
    "landmark",
    "natural_feature",
    "neighborhood",
    "place_of_worship",
    "political",
    // "plus_code",
    // "postal_code",
    // "postal_code_prefix",
    // "postal_code_suffix",
    // "postal_town",
    // "premise",
    // "room",
    // "route",
    // "street_address",
    // "street_number",
    // "sublocality",
    // "sublocality_level_1",
    // "sublocality_level_2",
    // "sublocality_level_3",
    // "sublocality_level_4",
    // "sublocality_level_5",
    // "subpremise",
    // "town_square",
  ];

  // console.log(addressComponents);

  for (const component of addressComponents) {
    if (types.some((type) => component.types.includes(type))) {
      console.log(component);
      return component.long_name;
    }
  }

  return addressComponents[0].long_name;
}

watch(
  () => latitudeFix.value,
  () => {
    fetchAddress(latitudeFix, longitudeFix);
  }
);

function submitKoordinat() {
  fetchAddress(latitudeFix, longitudeFix);
  emit("hideModal", true);
  emit("update:longitude", longitudeFix.value);
  emit("update:latitude", latitudeFix.value);
  emit("update:locationAddress", locationAddress.value);
  emit("update:locationName", locationName.value);
}
</script>

<style scoped>
.input {
  @apply bg-white z-10;
}
</style>
