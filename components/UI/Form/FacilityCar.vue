<template>
  <VeeForm @submit="onSubmit" v-slot="{ errors }">
    <!--     :validation-schema="props.facility ? facilityCarEdit : facilityCar" -->
    <div class="border shadow-sm rounded-[8px] py-6 px-5 mb-6">
      <p class="text-black font-semibold text-[16px]">General</p>
      <div class="grid grid-cols-1 mt-1 gap-4">
        <p class="text-black font-medium text-[16px] mt-6">Nama fasilitas</p>
        <TabContent>
          <TabItem
            name="EN"
            group="description"
            checked
            :is-error="!!errors['description[en]']"
          >
            <UIFormGroup name="description">
              <UIFormTextFieldWLabel
                v-model="dataForm['description[en]']"
                name="description[en]"
                label="Nama fasilitas English"
                class="input-bordered"
                placeholder="Input nama fasilitas English"
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
            <UIFormGroup name="description[id]">
              <UIFormTextFieldWLabel
                v-model="dataForm['description[id]']"
                name="description[id]"
                label="Nama fasilitas Indonesia"
                class="input-bordered"
                placeholder="Input nama fasilitas Indonesia"
              />
              <VeeErrorMessage
                name="description[id]"
                class="form-error-message"
              />
            </UIFormGroup>
          </TabItem>
        </TabContent>

        <!-- image -->
        <div>
          <div class="hidden">
            <VeeField
              type="file"
              name="image"
              id="image"
              v-model="dataForm.image"
            />
          </div>
          <UIFormInputImageCropAdmin
            :loading="loading"
            label="Icon"
            name="image"
            v-model="dataForm.image"
            :existingimage="existingImage"
          />
        </div>
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
        :disabled="loading"
        class="btn bg-primary text-white normal-case !font-medium text-base hover:bg-primary"
      >
        {{ buttonTitle }}
      </button>
    </div>
  </VeeForm>
</template>

<script setup>
const { facilityCar, facilityCarEdit } = useSchema();

const props = defineProps({
  facility: { type: [Array, Object] },
  buttonTitle: {
    type: String,
  },
});

const router = useRouter();

const {
  dataForm,
  onSubmit,
  message,
  alertType,
  loading,
  existingImage,
  selectedFacility,
} = useFacility({ callback: redirect });

onMounted(async () => {
  if (props.facility) {
    selectedFacility.value = props.facility;
    dataForm.value["description[en]"] =
      props.facility?.description.find((item) => item.language === "en")
        ?.translation ?? "";
    dataForm.value["description[id]"] =
      props.facility?.description.find((item) => item.language === "id")
        ?.translation ?? "";
    // dataForm.value.image = props.facility?.image;
  }
});

function redirect() {
  router.push("/admin/facility-car");
}
</script>
