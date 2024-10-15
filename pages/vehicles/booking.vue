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
      <VeeForm
        @submit="submitFormT"
        class="p-4"
        :validation-schema="orderCarSchema"
        v-slot="{ errors }"
      >
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
            <!-- <VehicleOrdererForm
              ref="vehicleForm"
              :name="dataFormT.name"
              :email="dataFormT.email"
              :phone="dataFormT.phone"
              @update:name="dataFormT.name = $event"
              @update:email="dataFormT.email = $event"
              @update:phone="dataFormT.phone = $event"
            /> -->
            <!-- test -->
            <div>
              <div class="space-y-4 p-4 border rounded-xl">
                <UIFormMGroup name="name" :label="$t('nama-lengkap')">
                  <UIFormMTextField
                    v-model="dataFormT.name"
                    name="name"
                    class="input-bordered"
                    :placeholder="$t('ketik-nama-lengkap')"
                  />
                </UIFormMGroup>

                <UIFormMGroup name="email" label="Email">
                  <UIFormMTextField
                    v-model="dataFormT.email"
                    name="email"
                    class="input-bordered"
                    :placeholder="$t('ketik-email-anda')"
                  />
                </UIFormMGroup>

                <UIFormMGroup name="phone" :label="$t('nomor-telepon')">
                  <UIFormMTextField
                    v-model="dataFormT.phone"
                    name="phone"
                    class="input-bordered"
                    :placeholder="$t('ketik-no-telepon')"
                  />
                </UIFormMGroup>

                <UIFormMGroup
                  name="flight_number"
                  :label="$t('nomor-penerbangan')"
                >
                  <UIFormMTextField
                    v-model="dataFormT.flight_number"
                    name="flight_number"
                    class="input-bordered"
                    :placeholder="$t('ketik-nomor-penerbangan')"
                  />
                </UIFormMGroup>

                <div class="hidden">
                  <button ref="internalSubmit" type="submit">submit</button>
                </div>
              </div>
            </div>
            <!-- end test -->
          </div>
          <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">{{ $t("detail-mobil") }}</div>
          </div>
          <div class="space-y-4">
            <!-- <VehicleSelectedCard
              :name="dataForm.name_car"
              :image="dataForm.image"
              :facilities="dataForm.facilities"
            /> -->
            <VehicleSelectedCard
              :name="dataDetail?.data?.name"
              :image="dataDetail?.data?.image"
              :facilities="dataDetail?.data?.facilities"
            />
          </div>
          <div class="flex items-center justify-end">
            <button
              class="btn btn-primary"
              type="submit"
              :disabled="$isUser === false"
            >
              <p>{{ $t("lanjutkan") }}</p>
            </button>
          </div>
        </div>
      </VeeForm>
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

const { orderCarSchema } = useSchema();

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

const slug = ref(undefined);
const distance = ref(undefined);
const dataDetail = ref();

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

const vehicleForm = ref(null);

const dataFormT = ref({
  user_uuid: undefined,
  name: undefined,
  email: undefined,
  phone: undefined,
  flight_number: undefined,
});

function submitFormT() {
  dataForm.value.user_uuid = dataFormT.value.user_uuid;
  dataForm.value.name = dataFormT.value.name;
  dataForm.value.email = dataFormT.value.email;
  dataForm.value.phone = dataFormT.value.phone;
  dataForm.value.flight_number = dataFormT.value.flight_number;

  saveFormData();

  router.push("/vehicles/checkout");
}

onMounted(async () => {
  if ($isUser.value) {
    await fetchUserData();
  }

  showSavedCarData();

  slug.value = dataForm.value.slug;
  distance.value = dataForm.value.distance;

  // fetchData();
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
