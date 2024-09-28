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
        <!-- <div
          class="w-full flex flex-col gap-2"
          v-if="
            dataForm.location_pickup_address || dataForm.location_return_address
          "
        >
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
        </div> -->
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
          v-if="dataForm.location_pickup_name && dataForm.location_return_name"
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
          <div class="space-y-4 relative">
            <NuxtLink
              to="/sign-in"
              class="absolute w-full h-full z-[200] bg-opacity-0"
              v-if="!$isUser"
            ></NuxtLink>
            <VehicleOrdererForm
              ref="vehicleForm"
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
          <div class="flex items-center justify-end">
            <div class="btn btn-primary" @click="submitFormT">
              <p>{{ $t("lanjutkan") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UIContainer>
</template>

<script setup>
useHead({
  title: "Booking Detail",
});

const filter = ref({
  sort: "",
});

const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const { locale, t: $t } = useI18n();
const { $isLoggedIn, $isUser, $logout } = useAuth();

const selectedDistance = ref("");
const selectedPassenger = ref("");

useHead({
  title: "Vehicle",
});

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

const vehicleForm = ref(null);

const dataFormT = ref({
  user_uuid: undefined,
  name: undefined,
  email: undefined,
  phone: undefined,
});

function submitFormT() {
  vehicleForm.value.$refs.internalSubmit.click();

  dataForm.value.user_uuid = dataFormT.value.user_uuid;
  dataForm.value.name = dataFormT.value.name;
  dataForm.value.email = dataFormT.value.email;
  dataForm.value.phone = dataFormT.value.phone;

  saveFormData();

  router.push("/vehicles/checkout");
}

onMounted(async () => {
  if ($isUser.value) {
    await fetchUserData();
  }

  showSavedCarData();

  // console.log("ini dari booking", dataForm.value);
});

const fetchUserData = async (ctx) => {
  await $fetch(`/users/profile`, {
    headers: {
      Accept: "application/json",
    },
    method: "get",
    ...requestOptions,
  })
    .catch((error) => {
      console.error("User profile data is missing or incomplete");
    })
    .then((data) => {
      dataFormT.value.name = `${data?.data?.first_name} ${data.data?.last_name}`;
      dataFormT.value.email = data?.data?.email;
      dataFormT.value.phone = data?.data?.phone;
      dataFormT.value.user_uuid = data?.data?.uuid;
    });
};

function goToHomePage() {
  clearSavedCarData();
  router.push({ path: "/?cars" });
}
</script>

<style lang="scss" scoped></style>
