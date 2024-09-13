<template>
  <VeeForm
    :validation-schema="tourPackageSchema"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
    <div class="border shadow-sm rounded-[8px] py-6 px-5 mb-6">
      <p class="text-black font-semibold text-[16px]">General</p>
      <div class="grid grid-cols-1 md:grid-cols-2 mt-1 gap-4">
        <UIFormTextFieldWLabel
          label="Nama paket"
          name="name"
          placeholder="Input paket"
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
      </div>
    </div>

    <div class="border shadow-sm rounded-[8px] py-6 px-5">
      <p class="text-black font-semibold text-[16px] mb-3">Ringkasan</p>
      <!-- text editor -->
      <TabContent>
        <TabItem
          name="EN"
          group="description"
          checked
          :is-error="!!errors['body[en]']"
        >
          <UIFormGroup label="Ringkasan English" name="body">
            <UIFormEditor
              v-model="dataForm['body[en]']"
              :is-errors="!!errors.body"
            />
            <VeeErrorMessage name="body[en]" class="form-error-message" />
          </UIFormGroup>
        </TabItem>
        <TabItem name="ID" group="description" :is-error="!!errors['body[id]']">
          <UIFormGroup label="Ringkasan Indonesia" name="body[id]">
            <UIFormEditor
              v-model="dataForm['body[id]']"
              :is-errors="!!errors?.['body[id]']"
            />
            <VeeErrorMessage name="body[id]" class="form-error-message" />
          </UIFormGroup>
        </TabItem>
      </TabContent>
      <!-- end text editor -->

      <div class="hidden">
        <VeeField name="body[en]" v-model="dataForm['body[en]']" />
        <VeeField name="body[id]" v-model="dataForm['body[id]']" />
      </div>
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
        Simpan paket
      </button>
    </div>
  </VeeForm>
</template>

<script setup>
const { tourPackageSchema } = useSchema();

const props = defineProps({ TourPackage: { type: [Array, Object] } });
const router = useRouter();

const selectedTourPackage = ref();

onMounted(async () => {
  if (props.TourPackage) {
    selectedTourPackage.value = props.TourPackage;
    props.TourPackage.name = dataForm.value.name;
    props.TourPackage.price = dataForm.value.price;
    props.TourPackage.body = dataForm.value.body;
  }
});

const dataForm = ref({
  name: undefined,
  price: undefined,
  body: undefined,
});

// function redirect() {
//   router.push("/admin/transport");
// }

// const {
//   dataForm,
//   onSubmit,
//   message,
//   alertType,
//   loading,
//   existingImage,
//   selectedTransport,
// } = useTransport({ callback: redirect });

// const selectedImageThumbnail = ref();

// const dataDropdown = ref([
//   {
//     id: 1,
//     name: "Tersedia",
//   },
//   {
//     id: 2,
//     name: "Tidak Tersedia",
//   },
// ]);

// const dataDropdownPengemudi = ref([
//   {
//     id: 1,
//     name: "Eren",
//   },
//   {
//     id: 2,
//     name: "Spongebob",
//   },
// ]);

// function funcGetIdStatus(data) {
//   dataForm.status = data;
// }

// function funcGetIdDriver(data) {
//   dataForm.driver = data;
// }

// const dropdownOptions = ref([
//   { id: 1, name: "Option 1", value: "option1" },
//   { id: 2, name: "Option 2", value: "option2" },
//   { id: 3, name: "Option 3", value: "option3" },
//   { id: 4, name: "Option 4", value: "option4" },
// ]);

// const selectedValues = ref([]);
// const selectedIds = ref([]);

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
</script>
