<template>
  <div class="h-44 sm:h-28"></div>
  <UIContainer>
    <div class="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 divide-x-2">
      <div class="space-y-6 py-4">
        <h3 class="text-2xl font-semibold text-primary-dark">
          {{ $t("pesanan-anda") }}
        </h3>
        <div class="space-y-4">
          <TourSelectedCard
            :image="dataForm.tour_image"
            :name="dataForm.tour_name"
            :desk="dataForm.list_location_string"
          />
        </div>
      </div>
      <div class="p-4">
        <div class="flex flex-col space-y-6">
          <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">{{ $t("data-peserta") }}</div>
          </div>
          <div class="space-y-4">
            <TourParticipantCard :dataParticipant="dataForm.forms" />
          </div>
          <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">{{ $t("data-pemesan") }}</div>
          </div>

          <div class="space-y-4">
            <TourOrdererCard
              :name="dataForm.name"
              :email="dataForm.email"
              :phone="dataForm.phone"
            />
          </div>

          <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">{{ $t("detail-harga") }}</div>
          </div>

          <div class="space-y-4">
            <TourDetailCheckoutInformation
              :name="dataForm.tour_name"
              :desk="dataForm.list_location_string"
              :image="dataForm.tour_image"
              :dataListPrice="dataForm.variants"
            />
            <div>
              <div class="space-y-4 p-4 border rounded-xl">
                <div
                  class="flex flex-col lg:flex-row lg:justify-between item-center"
                >
                  <div>{{ $t("yang-harus-kamu-bayar") }}</div>
                  <div class="text-lg font-semibold text-primary">
                    {{
                      // FormatMoneyDash(
                      //   dataForm?.price?.toString(),
                      //   locale == "id" ? "IDR" : "usd"
                      // )
                      locale == "en"
                        ? FormatMoneyDash(
                            dataForm?.usd_price?.toString(),
                            "USD"
                          )
                        : FormatMoneyDash(dataForm?.price?.toString(), "IDR")
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-end justify-end" @click="onSubmit">
            <button
              type="submit"
              class="btn btn-md bg-primary text-white"
              :disabled="loading"
            >
              <p>{{ $t("pesan-dan-bayar") }}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </UIContainer>
</template>

<script setup>
const { locale, t: $t } = useI18n();

const filter = ref({
  sort: "",
});

const {
  dataForm,
  submitForm,
  saveFormData,
  showSavedTourData,
  clearSavedTourData,
  loading,
} = useTourStore({
  callback: () => {
    console.log("Form has been submitted!");
  },
});

onMounted(() => {
  showSavedTourData();

  console.log(dataForm.value);
});

function onSubmit() {
  // console.log("ini adalah dataForm final", dataForm.value);
  saveFormData();
  submitForm();
  clearSavedTourData();
}

useHead({
  title: "Checkout",
});
</script>

<style lang="scss" scoped></style>
