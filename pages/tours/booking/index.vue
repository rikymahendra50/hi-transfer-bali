<template>
  <div class="h-28"></div>
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
            <div class="text-2xl font-semibold">{{ $t("data-pemesan") }}</div>
          </div>
          <div class="space-y-4 relative">
            <NuxtLink
              to="/sign-in"
              class="absolute w-full h-full z-[200] bg-opacity-0"
              v-if="!$isUser"
            ></NuxtLink>
            <TourOrdererForm
              :name="dataFormT.name"
              :email="dataFormT.email"
              :phone="dataFormT.phone"
              @update:name="dataFormT.name = $event"
              @update:email="dataFormT.email = $event"
              @update:phone="dataFormT.phone = $event"
            />
          </div>
          <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">{{ $t("data-peserta") }}</div>
          </div>
          <div class="space-y-4">
            <!-- test -->
            <div>
              <VeeForm @submit="onSubmit">
                <div
                  class="rounded-xl grid grid-cols-1 divide-y"
                  v-for="(item, variantIndex) in dataForm.variants"
                  :key="variantIndex"
                >
                  <div class="my-3">
                    {{ item.quantity > 0 ? item.description : "" }}
                  </div>
                  <div
                    class="p-4"
                    v-for="(n, participantIndex) in item.quantity"
                    :key="participantIndex"
                  >
                    <!-- ini dimasukan kedalam VeeField -->
                    <VeeField
                      v-model="
                        dataFormParticitpant[
                          getParticipantIndex(variantIndex, participantIndex)
                        ].variant_id
                      "
                      type="text"
                      name="variant_id"
                      class="border-2 hidden"
                      id="variant_id"
                    />
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <UIFormMGroup
                        :name="
                          `name` +
                          getParticipantIndex(variantIndex, participantIndex)
                        "
                        label="Nama Lengkap"
                      >
                        <UIFormMTextField
                          v-model="
                            dataFormParticitpant[
                              getParticipantIndex(
                                variantIndex,
                                participantIndex
                              )
                            ].name
                          "
                          :name="
                            `name` +
                            getParticipantIndex(variantIndex, participantIndex)
                          "
                          class="input-bordered"
                          placeholder="ex:John Doe"
                        />
                      </UIFormMGroup>
                      <UIFormMGroup
                        :name="
                          `nationality` +
                          getParticipantIndex(variantIndex, participantIndex)
                        "
                        label="Kebangsaan"
                      >
                        <UIFormMSelect
                          v-model="
                            dataFormParticitpant[
                              getParticipantIndex(
                                variantIndex,
                                participantIndex
                              )
                            ].nationality
                          "
                          :name="
                            `nationality` +
                            getParticipantIndex(variantIndex, participantIndex)
                          "
                          class="input-bordered"
                          placeholder="ex: Indonesia"
                        >
                          <option value="">Pilih Kebangsaan</option>
                          <option
                            :value="item.name"
                            v-for="item in dataCountry"
                            :key="item.name"
                          >
                            {{ item.name }}
                          </option>
                        </UIFormMSelect>
                      </UIFormMGroup>

                      <UIFormMGroup
                        :name="
                          `category` +
                          getParticipantIndex(variantIndex, participantIndex)
                        "
                        label="Kategori"
                      >
                        <UIFormMSelect
                          v-model="
                            dataFormParticitpant[
                              getParticipantIndex(
                                variantIndex,
                                participantIndex
                              )
                            ].category
                          "
                          :name="
                            `category` +
                            getParticipantIndex(variantIndex, participantIndex)
                          "
                          class="input-bordered"
                          placeholder="ex: Dewasa"
                        >
                          <option value="">Kategori</option>
                          <option value="dewasa">Dewasa</option>
                          <option value="anak">Anak</option>
                        </UIFormMSelect>
                      </UIFormMGroup>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end">
                  <div class="btn btn-md bg-primary">
                    <button ref="btnSubmit" type="submit" class="text-white">
                      Continue
                    </button>
                  </div>
                </div>
              </VeeForm>
            </div>
            <!-- end test -->
          </div>
        </div>
      </div>
    </div>
  </UIContainer>
</template>

<script setup>
const { $isLoggedIn, $isUser, $logout } = useAuth();
const { requestOptions } = useRequestOptions();
const router = useRouter();

const { data: dataCountry } = await useFetch("/api/country");

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

const tourForm = ref(null);

const dataFormT = ref({
  user_uuid: undefined,
  name: undefined,
  email: undefined,
  phone: undefined,
});

const dataFormParticitpant = ref([]);

const filter = ref({
  sort: "",
});

let participantsInitialized = false;

onMounted(async () => {
  if ($isUser.value) {
    const {
      data: userProfile,
      error: errorUsers,
      refresh: refreshUsers,
    } = await useAsyncData("userProfile3", () =>
      $fetch(`/users/profile`, {
        headers: {
          Accept: "application/json",
        },
        method: "get",
        ...requestOptions,
      })
    );

    if (userProfile.value && userProfile.value.data) {
      dataFormT.value.name = `${userProfile.value.data?.first_name} ${userProfile.value.data?.last_name}`;
      dataFormT.value.email = userProfile.value.data?.email;
      dataFormT.value.phone = userProfile.value.data?.phone;
      dataFormT.value.user_uuid = userProfile.value.data?.uuid;
    }
  }
  showSavedTourData();

  console.log(
    "ini untuk melihat hasil dari yang sudah dikerjakan",
    dataForm.value
  );

  if (!participantsInitialized) {
    initializeParticipants();
    participantsInitialized = true;
  }
});

function initializeParticipants() {
  dataFormParticitpant.value = [];
  dataForm.value.variants.forEach((variant) => {
    for (let i = 0; i < variant.quantity; i++) {
      dataFormParticitpant.value.push({
        variant_id: variant.id, // Ini adalah perubahan utama
        name: "",
        nationality: "",
        category: "",
      });
    }
  });
}

function getParticipantIndex(variantIndex, participantIndex) {
  let index = 0;
  for (let i = 0; i < variantIndex; i++) {
    index += dataForm.value.variants[i].quantity;
  }
  return index + participantIndex;
}

function onSubmit() {
  dataForm.value.user_uuid = dataFormT.value.user_uuid;
  dataForm.value.name = dataFormT.value.name;
  dataForm.value.email = dataFormT.value.email;
  dataForm.value.phone = dataFormT.value.phone;
  dataForm.value.forms = dataFormParticitpant.value;

  console.log(dataFormParticitpant.value);

  saveFormData();

  console.log("ini adalah dataFormT", dataFormT.value);

  console.log("ini di booking", dataForm.value);

  router.push("/tours/booking/checkout");
}

useHead({
  title: "Booking tours",
});
</script>
