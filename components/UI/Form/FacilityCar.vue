<template>
  <VeeForm
    :validation-schema="facilityCar"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
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
                v-model="dataForm.description.en"
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
                v-model="dataForm.description.id"
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
        <UIFormInputImageCropAdmin
          :loading="loading"
          label="Icon"
          name="icon"
          v-model="selectedImageThumbnail"
          :existing-image="existingImage"
        />
        <VeeErrorMessage name="image" class="text-red-500" />
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
        {{ buttonTitle }}
      </button>
    </div>
  </VeeForm>
</template>

<script setup>
const { facilityCar } = useSchema();

const props = defineProps({
  facility: { type: [Array, Object] },
  buttonTitle: {
    type: String,
  },
});
const router = useRouter();
const selectedImageThumbnail = ref();

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
    props.facility.description.en = dataForm.value.description.en;
    props.facility.description.id = dataForm.value.description.id;
  }
});

function redirect() {
  router.push("/admin/facility-car");
}
</script>
