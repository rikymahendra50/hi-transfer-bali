<template>
  <VeeForm
    :validation-schema="transportSchema"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
    <div class="border shadow-sm rounded-[8px] py-4 px-4">
      <p class="text-black font-semibold">General</p>
      <div>
        <div class="hidden">
          <VeeField
            type="file"
            name="image_thumbnail"
            id="image_thumbnail"
            v-model="selectedImageThumbnail"
          />
        </div>
        <UIFormInputImageCropAdmin
          :loading="loading"
          label="Foto mobil"
          name="image_thumbnail"
          v-model="selectedImageThumbnail"
          :existingimage="existingImage"
        />
        <VeeErrorMessage name="image" class="text-red-500" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-4">
        <UIFormTextFieldWLabel
          label="Nama Mobil"
          name="mobil"
          placeholder="Input Mobil"
          v-model="dataForm.name"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />

        <!-- <UIFormDropdown
          label="Status Mobil"
          name="status_mobil"
          placeholder="Status Mobil"
          @getId="funcGetIdStatus"
          v-model="dataForm.is_active"
          :dataDropdown="dataDropdown"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        /> -->

        <UIFormDropdownOnlyTwo
          label="Status Mobil"
          name="is_active"
          placeholder="Status Mobil"
          @getId="funcGetIdStatus"
          v-model="statusIsActive"
          :dataDropdown="dataDropdown"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />

        <!-- <UIFormDropdown
          label="Pengemudi"
          name="pengemudi"
          placeholder="Pilih Pengemudi"
          @getId="funcGetIdDriver"
          v-model="dataForm.driver"
          :dataDropdown="dataDropdownPengemudi"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        /> -->

        <UIFormInputNumber
          label="Maksimal Penumpang"
          name="maxpenumpang"
          placeholder="12"
          v-model="dataForm.max_person"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <!-- <UIFormInputNumber
          label="Maksimal Penumpang"
          name="maxpenumpang"
          placeholder="12"
          v-model="dataForm.maxpenumpang"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        /> -->

        <!-- <UIFormInputNumber
          label="Maksimal Koper"
          name="maxkoper"
          placeholder="12"
          v-model="dataForm.maxkoperkg"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        /> -->
      </div>

      <UIFormDropdowns
        label="Fasilitas mobil"
        name="fasilitas_mobil"
        placeholder="Fasilitas mobil"
        @getId="funcGetIdFacility"
        v-model="selectedValues"
        :dataDropdown="dropdownOptions"
        class="input-bordered shadow-sm focus:outline-none"
        :useStarIcon="false"
      >
        <p class="mt-4">Selected IDs: {{ selectedIds.join(", ") }}</p>
        <p class="mt-2">Selected Values: {{ selectedValues.join(", ") }}</p>
      </UIFormDropdowns>
    </div>

    <div class="flex items-center justify-between mt-6">
      <NuxtLink
        to="/admin/transport"
        class="btn bg-transparent border border-red-600 text-red-500"
      >
        Batalkan
      </NuxtLink>
      <button
        type="submit"
        class="btn bg-primary text-white normal-case !font-medium text-base hover:bg-primary"
      >
        {{ buttonTitle }}
      </button>
    </div>
  </VeeForm>
</template>

<script setup>
const { transportSchema } = useSchema();

const props = defineProps({
  transport: {
    type: [Array, Object],
  },
  buttonTitle: {
    type: String,
  },
});

const router = useRouter();

function redirect() {
  router.push("/admin/transport");
}

const {
  dataForm,
  onSubmit,
  message,
  alertType,
  loading,
  existingImage,
  selectedTransport,
} = useTransport({ callback: redirect });

const selectedImageThumbnail = ref();

const dataDropdown = ref([
  {
    id: 1,
    name: "Tersedia",
  },
  {
    id: 2,
    name: "Tidak Tersedia",
  },
]);

const dataDropdownPengemudi = ref([
  {
    id: 1,
    name: "Eren",
  },
  {
    id: 2,
    name: "Spongebob",
  },
]);

function funcGetIdStatus(data) {
  dataForm.status = data;
}

function funcGetIdDriver(data) {
  dataForm.driver = data;
}

const dropdownOptions = ref([
  { id: 1, name: "Option 1", value: "option1" },
  { id: 2, name: "Option 2", value: "option2" },
  { id: 3, name: "Option 3", value: "option3" },
  { id: 4, name: "Option 4", value: "option4" },
]);

const selectedValues = ref([]);
const selectedIds = ref([]);

function funcGetIdFacility(ids) {
  if (!selectedIds.value.includes(ids)) {
    selectedIds.value.push(ids); // Store the selected option IDs
  } else {
    const index = selectedIds.value.indexOf(ids);
    if (index !== -1) {
      selectedIds.value.splice(index, 1); // Remove the ID if unselected
    }
  }
}

const statusIsActive = ref();

onMounted(async () => {
  if (props.transport) {
    selectedTransport.value = props.transport;

    dataForm.value.name = props.transport.name;
    dataForm.value.max_person = props.transport.max_person;
    dataForm.value.is_active = props.transport.is_active;
    dataForm.value.facilities = props.transport.facilities;

    // console.log(dataForm.value.facilities[0].id);

    dataForm.value.facilities.forEach((item) => {
      selectedIds.value.push(item.id);
      selectedValues.value.push(item.description);
    });

    // console.log(selectedValues.value);

    statusIsActive.value =
      props.transport.is_active === 1 ? "Tersedia" : "Tidak Tersedia";
  }
});
</script>
