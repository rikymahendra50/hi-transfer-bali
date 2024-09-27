<template>
  <div class="rounded-lg overflow-hidden relative p-3">
    <div class="relative z-[10000] grid md:flex gap-3 items-center">
      <!-- test -->
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
      style="width: 100%; height: 250px"
      :options="{
        disableDefaultUi: true,
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const center = ref({ lat: -8.417347915171359, lng: 115.19596919507471 });
const currentMarkerPosition = ref({
  lat: -8.417347915171359,
  lng: 115.19596919507471,
});

const latitudeFix = ref(-8.417347915171359);
const longitudeFix = ref(115.19596919507471);
const locationAddress = ref();
const locationName = ref();

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
  dataJikaSudahAda4: {
    type: Array,
  },
});

const emit = defineEmits([
  "update:longitude",
  "update:latitude",
  "update:locationAddress",
  "update:locationName",
  "hideModal",
]);

// Fungsi untuk mengambil lokasi pengguna dengan Geolocation API
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitudeFix.value = position.coords.latitude;
        longitudeFix.value = position.coords.longitude;

        center.value = { lat: latitudeFix.value, lng: longitudeFix };
        currentMarkerPosition.value = {
          lat: latitudeFix.value,
          lng: longitudeFix,
        };

        // console.log(position.coords.latitude);

        // updateValue(latitude, longitude);
        // fetchAddress(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// function updateValue(latitude, longitude) {
//   emit("update:longitude", longitude.toString());
//   emit("update:latitude", latitude.toString());
//   // dataForm.value.latitude = latitude;
//   // dataForm.value.longitude = longitude;
// }

// Fungsi untuk mendapatkan alamat dari koordinat menggunakan Geocoding API
async function fetchAddress(latitude, longitude) {
  const geocoder = new google.maps.Geocoder();
  const latLng = {
    lat: parseFloat(latitude.value),
    lng: parseFloat(longitude.value),
  };

  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === "OK" && results[1]) {
      locationAddress.value = results[1].formatted_address;
      locationName.value = results[1].address_components[0].long_name;
      // console.log("Ini merupakan", results[1]);
    } else {
      alert("Geocode was not successful: " + status);
    }
  });
}

function handleMapClick(event) {
  const latitude = event.latLng.lat();
  const longitude = event.latLng.lng();

  currentMarkerPosition.value = { lat: latitude, lng: longitude };
  center.value = { lat: latitude, lng: longitude };

  latitudeFix.value = latitude;
  longitudeFix.value = longitude;
}

function setPlace(ctx) {
  const latitude = ctx.geometry?.location?.lat();
  const longitude = ctx.geometry?.location?.lng();

  currentMarkerPosition.value = { lat: latitude, lng: longitude };
  center.value = { lat: latitude, lng: longitude };

  latitudeFix.value = latitude;
  longitudeFix.value = longitude;
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
