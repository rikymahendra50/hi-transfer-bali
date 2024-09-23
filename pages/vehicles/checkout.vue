<template>
  <div class="h-28"></div>
  <div class="w-full border-b">
    <UIContainer>
      <div
        class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full"
      >
        <div>
          <UIBtn
            @click="goToHomePage"
            variant="primary"
            outlined
            class="whitespace-nowrap"
            >{{ $t("kembali-ke-beranda") }}</UIBtn
          >
        </div>
        <div class="w-full flex flex-col gap-2">
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
        <div class="space-y-4">
          <VehicleAddressInformation
            :name="$t('penjemputan')"
            :locationName="dataForm.location_pickup_name"
            :locationAddress="dataForm.location_pickup_address"
          />
          <div class="divider text-xs text-zinc-400">
            {{ $t("perjalananmu-sekitar") }} {{ dataForm.distance_text }}
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
            <div class="text-2xl font-semibold">{{ $t("data-pemesan") }}</div>
          </div>
          <div class="space-y-4">
            <VehicleOrdererCard
              :name="dataFormT.name"
              :email="dataFormT.email"
              :phone="dataFormT.phone"
              @update:name="dataFormT.name = $event"
              @update:email="dataFormT.email = $event"
              @update:phone="dataFormT.phone = $event"
            />
          </div>
          <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">{{ $t("detail-mobil") }}</div>
          </div>
          <div class="space-y-4">
            <VehicleSelectedCard
              :name="dataForm.name_car"
              :image="dataForm.image"
              :facilities="dataForm.facilities"
            />
          </div>
          <TourPriceCheckoutInformation :price="dataForm.price" />
        </div>
        <div class="flex items-center justify-end mt-5">
          <div class="btn btn-primary" @click="submitFormOrder">
            <p>{{ $t("pesan-dan-bayar") }}</p>
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
const { $isLoggedIn, $isUser, $logout } = useAuth();

const {
  dataForm,
  submitFormOrder,
  saveFormData,
  showSavedCarData,
  clearSavedCarData,
  submitForm,
} = useCarStore({
  callback: () => {
    alert("Form has been submitted!");
  },
});

const dataFormT = ref({
  name: dataForm.value.name,
  email: dataForm.value.email,
  phone: dataForm.value.phone,
});

onMounted(() => {
  showSavedCarData();
  dataFormT.value.name = dataForm.value.name;
  dataFormT.value.email = dataForm.value.email;
  dataFormT.value.phone = dataForm.value.phone;

  console.log(dataForm.value);
});

useHead({
  title: "Checkout",
});

const filter = ref({
  sort: "",
});

function goToHomePage() {
  clearSavedCarData();
  router.push({ path: "/?cars" });
}
</script>

<style lang="scss" scoped></style>
