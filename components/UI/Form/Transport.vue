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
            v-model="dataForm.image"
          />
        </div>
        <UIFormInputImageCropAdmin
          :loading="loading"
          label="Foto Mobil"
          name="image"
          v-model="dataForm.image"
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

        <UIFormInputNumber
          label="Harga"
          name="price"
          placeholder="Harga"
          v-model="dataForm.price"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />

        <UIFormDropdownOnlyTwo
          label="Status Mobil"
          name="is_active"
          placeholder="Status Mobil"
          @getId="funcGetIdStatus"
          v-model="statusActive"
          :dataDropdown="dataDropdown"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />

        <UIFormInputNumber
          label="Maksimal Penumpang"
          name="maxpenumpang"
          placeholder="4"
          v-model="dataForm.max_person"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />
      </div>

      <UIFormDropdownsTest
        label="Fasilitas mobil"
        name="fasilitas_mobil"
        placeholder="Fasilitas mobil"
        :dataDropdown="data?.data"
        v-model="dataForm.facilities"
        :dataSelected="props.transport?.facilities ?? []"
        @getId="funcGetIdFacility"
      />
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
        :disabled="loading"
        class="btn bg-primary text-white normal-case !font-medium text-base hover:bg-primary"
      >
        {{ buttonTitle }}
      </button>
    </div>
  </VeeForm>
</template>

<script setup>
const { transportSchema } = useSchema();
const { requestOptions } = useRequestOptions();

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

// const statusIsActive = computed(() => {
//   return dataForm.value.is_active === 1 ? "Tersedia" : "Tidak Tersedia";
// });

const statusActive = ref();

const dataDropdown = ref([
  {
    id: 1,
    name: "Tersedia",
    value: 1,
  },
  {
    id: 2,
    name: "Tidak Tersedia",
    value: 0,
  },
]);

function funcGetIdStatus(data) {
  dataForm.value.is_active = data;
}

const { data, error, refresh } = await useAsyncData("facilities", () =>
  $fetch(`/admins/facilities-all`, {
    method: "get",
    ...requestOptions,
  })
);

// console.log(data.value);

const selectedValues = ref([]);
const selectedIds = ref([]);
const selectedOptions = ref([]);

// function funcGetIdFacility(ids) {
//   if (!selectedIds.value.includes(ids)) {
//     selectedIds.value.push(ids); // Store the selected option IDs
//   } else {
//     const index = selectedIds.value.indexOf(ids);
//     if (index !== -1) {
//       selectedIds.value.splice(index, 1); // Remove the ID if unselected
//     }
//   }
// }

// function funcGetIdFacility(ids) {
//   if (!selectedIds.value.includes(ids)) {
//     selectedIds.value.push(ids); // Store the selected option IDs
//   } else {
//     const index = selectedIds.value.indexOf(ids);
//     if (index !== -1) {
//       selectedIds.value.splice(index, 1); // Remove the ID if unselected
//     }
//   }
//   selectedIds.value.forEach((item, index) => {
//     dataForm.value.facilities[`${index}`] = item.id;
//   });

//   // console.log(selectedIds.value);
// }

function funcGetIdFacility(ids) {
  dataForm.value.facilities = Array.isArray(ids) ? ids : [ids];
}

onMounted(async () => {
  if (props.transport) {
    selectedTransport.value = props.transport;

    dataForm.value.name = props.transport.name;
    dataForm.value.price = props.transport.price;
    dataForm.value.max_person = props.transport.max_person;
    dataForm.value.is_active = props.transport.is_active;
    statusActive.value =
      props.transport.is_active === 0 ? "Tidak Tersedia" : "Tersedia";
    dataForm.value.facilities = props.transport.facilities.map(
      (facility) => facility.id
    );

    // console.log(dataForm.value);
  }
});
</script>
