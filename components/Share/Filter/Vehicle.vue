<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_50px_1fr] gap-4">
      <UIFormMGroup label="Jemput Dimana ?" name="pickup_address">
        <UIFormTextFieldWModal
          v-model="dataForm.pickup_address"
          name="pickup_address"
          placeholder="ex:Jalan Pahlawan No. 1"
        />
      </UIFormMGroup>
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
      <UIFormMGroup label="Mau Kemana ?" name="destination_address">
        <UIFormMTextField
          v-model="dataForm.destination_address"
          name="destination_address"
          placeholder="ex:Jalan Pahlawan No. 1"
        />
      </UIFormMGroup>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <UIFormToggle
        name="round_trip"
        label="Pulang - Pergi"
        v-model="dataForm.round_trip"
        true-value="1"
        false-value="0"
        variant="primary"
      />
      <UIFormMGroup name="pickup_date" label="Jemput Tanggal">
        <UIFormMTextField
          name="pickup_date"
          v-model="dataForm.pickup_date"
          type="date"
          placeholder="ex:2024-01-01"
        />
      </UIFormMGroup>
      <UIFormMGroup name="return_date" label="Pulang Balik">
        <UIFormMTextField
          name="return_date"
          v-model="dataForm.return_date"
          type="date"
          placeholder="ex:2024-01-02"
        />
      </UIFormMGroup>
      <UIFormMGroup name="passengers" label="Jumlah Penumpang">
        <UIFormMSelect name="passengers" v-model="dataForm.passengers">
          <option value="1">1 Penumpang</option>
          <option value="2">2 Penumpang</option>
          <option value="3">3 Penumpang</option>
          <option value="4">4 Penumpang</option>
          <option value="5">5 Penumpang</option>
          <option value="6">6 Penumpang</option>
        </UIFormMSelect>
      </UIFormMGroup>
      <div>
        <UIBtn variant="primary">Cari Mobil</UIBtn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dataForm = ref({
  pickup_address: "",
  pickup_latitude: 0,
  pickup_longitude: 0,
  destination_address: "",
  destination_latitude: 0,
  destination_longitude: 0,
  round_trip: 0,
  pickup_date: "",
  return_date: "",
  passengers: 1,
});

import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);

const isMobile = breakpoints.smaller("lg");
</script>

<style scoped></style>
