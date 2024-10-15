<template>
  <div class="h-44 sm:h-28"></div>
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
          v-if="
            dataForm.location_pickup_name ||
            dataForm.location_pickup_address ||
            dataForm.location_return_name ||
            dataForm.location_return_address
          "
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
              :name="dataDetail?.data?.name"
              :image="dataDetail?.data?.image"
              :facilities="dataDetail?.data?.facilities"
            />
          </div>
        </div>
        <div class="space-y-6 py-4">
          <h3 class="text-2xl font-semibold text-primary-dark">
            {{ $t("rincian-harga") }}
          </h3>
          <div class="space-y-4">
            <div class="border p-4 rounded-[8px] flex flex-col gap-3">
              <div
                class="flex flex-col sm:flex-row sm:items-center gap-2 justify-between"
              >
                <h4 class="font-semibold text-lg">
                  {{ $t("yang-harus-kamu-bayar") }}
                </h4>
                <p class="text-primary text-lg font-semibold">
                  {{ dataForm.distance }} Km
                </p>
                <p class="text-primary text-lg font-semibold">
                  <!-- {{ FormatMoneyDash(String(dataForm.price)) }} -->
                  {{
                    FormatMoneyDash(
                      String(dataDetail?.data?.trip_price),
                      locale == "id" ? "IDR" : "usd"
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end mt-5">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading"
            @click="submitFormOrder"
          >
            <p>{{ $t("pesan-dan-bayar") }}</p>
          </button>
        </div>
      </div>
    </div>
  </UIContainer>
</template>

<script setup>
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const { locale, t: $t } = useI18n();
const { $isLoggedIn, $isUser, $logout } = useAuth();
const dataDetail = ref(null);
const slug = ref(undefined);
const distance = ref(undefined);

const {
  dataForm,
  submitForm,
  saveFormData,
  loading,
  showSavedCarData,
  clearSavedCarData,
  submitFormOrder,
} = useCarStore({
  callback: () => {
    console.log("Form has been submitted!");
  },
});

watch(
  [() => slug.value, distance.value, locale.value],
  (newValues, oldValues) => {
    fetchData();
  }
);

const fetchData = async () => {
  const { data, error, refresh } = await useAsyncData("carsDetail", () =>
    $fetch(
      `/cars/${dataForm.value.slug}?lang=${locale.value}&filter[distance]=${dataForm.value.distance}`,
      {
        headers: {
          Accept: "application/json",
        },
        method: "get",
        ...requestOptions,
      }
    )
  );

  dataDetail.value = data.value;
};

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

  slug.value = dataForm.value.slug;
  distance.value = dataForm.value.distance;

  fetchData();
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
