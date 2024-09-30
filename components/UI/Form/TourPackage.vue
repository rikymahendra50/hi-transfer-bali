<template>
  <VeeForm
    :validation-schema="schemaShouldIUse"
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

        <UIFormTextFieldWLabel
          v-if="props.tourPackage"
          label="Harga"
          name="price"
          placeholder="Harga"
          v-model="dataForm.price"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
          :disabled="isVaried === 1"
        />

        <UIFormInputNumber
          v-else-if="!props.tourPackage"
          label="Harga"
          name="price"
          placeholder="Harga"
          v-model="dataForm.price"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
          :disabled="isVaried === 1"
        />

        <!-- <UIFormTextFieldWLabel
          v-if="props.tourPackage"
          label="Max person"
          name="max_person"
          placeholder="Max person"
          v-model="dataForm.max_person"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
          :disabled="isVaried === 1"
        /> -->

        <UIFormInputNumber
          label="Max person"
          name="max_person"
          placeholder="Max person"
          v-model="dataForm.max_person"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
          :disabled="isVaried === 1"
        />

        <UIFormDropdownOnlyTwo
          label="Status Active"
          name="is_active"
          placeholder="Status Active"
          @getId="funcGetIdStatus"
          v-model="statusActive"
          :dataDropdown="dataDropdown"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />

        <UIFormDropdownsTest
          label="Locations"
          name="locations"
          placeholder="Locations"
          class="mt-1"
          :dataDropdown="data?.data"
          v-model="dataForm.locations"
          :dataSelected="props.tourPackage?.locations ?? []"
          @getId="funcGetIdLocation"
        />

        <!-- meta -->
        <TabContent>
          <TabItem
            name="EN"
            group="meta"
            checked
            :is-error="!!errors['meta[en]']"
          >
            <UIFormGroup label="Meta Description" name="meta[en]">
              <UIFormSpTextarea
                name="meta[en]"
                v-model="dataForm['meta[en]']"
                class="select-bordered"
                placeholder="e.g. My Blog Description"
              />
            </UIFormGroup>
          </TabItem>
          <TabItem name="ID" group="meta" :is-error="!!errors['meta[id]']">
            <UIFormGroup label="(ID) Meta Description" name="meta">
              <UIFormSpTextarea
                name="meta[id]"
                v-model="dataForm['meta[id]']"
                class="select-bordered"
                placeholder="e.g. My Blog Description"
              />
            </UIFormGroup>
          </TabItem>
        </TabContent>
        <!-- end meta -->
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
          :is-error="!!errors['description[en]']"
        >
          <UIFormGroup label="Ringkasan English" name="description[en]">
            <UIFormEditor
              v-model="dataForm['description[en]']"
              :is-errors="!!errors.description"
            />
            <VeeErrorMessage
              name="description[en]"
              class="form-error-message"
            />
          </UIFormGroup>
        </TabItem>
        <TabItem
          name="ID"
          group="description"
          :is-error="!!errors['description[id]']"
        >
          <UIFormGroup label="Ringkasan Indonesia" name="description_id">
            <UIFormEditor
              v-model="dataForm['description[id]']"
              :is-errors="!!errors?.['description[id]']"
            />
            <VeeErrorMessage name="description_id" class="form-error-message" />
          </UIFormGroup>
        </TabItem>
      </TabContent>
      <!-- end text editor -->

      <div class="hidden">
        <VeeField
          name="description[en]"
          v-model="dataForm['description[en]']"
        />
        <VeeField
          name="description[id]"
          v-model="dataForm['description[id]']"
        />
        <VeeField name="meta[en]" v-model="dataForm['meta[en]']" />
        <VeeField name="meta[id]" v-model="dataForm['meta[id]']" />
      </div>
    </div>

    <!-- is varied -->
    <div class="form-control max-w-max mt-3">
      <VeeField name="is_varied" :value="dataForm.is_varied" v-slot="{ field }">
        <label class="label cursor-pointer">
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-bind="field"
            v-model="dataForm.is_varied"
            :true-value="1"
            :false-value="0"
          />
          <span class="label-text ml-2">Varied</span>
        </label>
      </VeeField>
    </div>
    <!-- is varied -->

    <div class="">
      <template v-if="isVaried">
        <UIFormTurVariant
          v-model="dataForm.variants"
          :locations="props.locations"
          :errors="errors"
        />
      </template>
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
const { tourPackageSchema, tourPackageSchemaIfVaried } = useSchema();
const { requestOptions } = useRequestOptions();
const route = useRoute();

const {
  dataForm,
  onSubmit,
  message,
  alertType,
  loading,
  existingImage,
  selectedTourPackage,
} = useTourPackage({ callback: redirect });

const props = defineProps({ tourPackage: { type: [Array, Object] } });
const router = useRouter();
const statusActive = ref();

const isVaried = computed(() => {
  return dataForm.value.is_varied;
});

const schemaShouldIUse = computed(() => {
  if (isVaried.value == 1) {
    return tourPackageSchemaIfVaried;
  } else {
    return tourPackageSchema;
  }
});

const { data, error, refresh } = await useAsyncData("locations", () =>
  $fetch(`/admins/locations-all`, {
    method: "get",
    ...requestOptions,
  })
);

function funcGetIdLocation(ids) {
  dataForm.value.locations = Array.isArray(ids) ? ids : [ids];
}

function funcGetIdStatus(data) {
  dataForm.value.is_active = data;
}

onMounted(async () => {
  if (props.tourPackage) {
    selectedTourPackage.value = props.tourPackage;
    dataForm.value.name = props.tourPackage?.name;
    dataForm.value.price = Number(props.tourPackage?.price);
    dataForm.value.max_person = Number(props.tourPackage?.max_person);
    dataForm.value.is_varied = props.tourPackage?.is_varied;

    dataForm.value["description[en]"] =
      props.tourPackage?.description?.find((item) => item.language === "en")
        ?.translation || "";
    dataForm.value["description[id]"] =
      props.tourPackage?.description?.find((item) => item.language === "id")
        ?.translation || "";
    statusActive.value =
      props.tourPackage?.is_active === 0 ? "Tidak Tersedia" : "Tersedia";
    dataForm.value.is_active = props.tourPackage?.is_active;
    dataForm.value.locations = props.tourPackage?.locations.map(
      (location) => location.id
    );

    dataForm.value["meta[en]"] =
      props.tourPackage?.meta?.find((item) => item.language === "en")
        ?.translation || "";

    dataForm.value["meta[id]"] =
      props.tourPackage?.meta?.find((item) => item.language === "id")
        ?.translation || "";

    dataForm.value.variants = props.tourPackage?.variants.map((variant) => ({
      name: variant?.name,
      price: Number(variant?.price),
      max_person: variant?.max_person,
      description: {
        en:
          variant?.description?.find((item) => item.language === "en")
            ?.translation || "",
        id:
          variant?.description?.find((item) => item.language === "id")
            ?.translation || "",
      },
    }));
  }
});

function redirect() {
  router.push("/admin/tour-package");
}

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
</script>
