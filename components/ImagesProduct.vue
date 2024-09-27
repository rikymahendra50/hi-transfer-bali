<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <Alert v-model="message" :type="alertType" />

      <draggable
        v-model="images"
        group="position"
        item-key="position"
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
        @change="onDragEnd"
        draggable=".draggable"
      >
        <template #item="{ element }">
          <div
            class="overflow-hidden rounded-lg relative h-full w-full draggable"
          >
            <div class="absolute w-full flex justify-end z-10 p-2">
              <div>
                <button
                  class="bg-error rounded-lg p-2 text-white"
                  type="button"
                  @click="removeImage(element)"
                >
                  <Icon name="i-heroicons-trash" class="h-6 w-6" />
                </button>
              </div>
            </div>

            <img
              :src="element.image"
              alt="image review"
              class="h-full w-full object-cover max-h-[300px] object-top"
            />
          </div>
        </template>
        <template #footer>
          <div v-if="ableToAddMoreImage">
            <CropImage
              ref="cropHelper"
              :loading="loading"
              @@upload-image="uploadImageToServer"
            />
          </div>
        </template>
      </draggable>

      <div v-if="arrayChange" class="space-y-4">
        <p>Anda telah merubah posisi gambar</p>
        <button
          type="button"
          :disabled="loading"
          :loading="loading"
          class="btn btn-primary btn-md normal-case"
          @click="saveImagesChangePosition"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";
// import { PropType } from "nuxt/dist/app/compat/capi";
const { loading, message, setErrorMessage, alertType, setSuccessMessage } =
  useRequestHelper();

const { requestOptions } = useRequestOptions();

const { locale } = useI18n();

const cropHelper = ref();

const props = defineProps({
  productSlug: {
    type: String,
    required: true,
  },
  imagesData: {
    type: Array,
  },
});

const emit = defineEmits(["reload"]);

const arrayChange = ref(false);

const onDragEnd = () => {
  arrayChange.value = true;
};

const images = ref([]);

const ableToAddMoreImage = computed(() => {
  return images.value.length < 5;
});

function removeImage(element) {
  images.value = images.value.filter((image) => image.id !== element.id);
  arrayChange.value = true;
}

async function uploadImageToServer(image) {
  loading.value = true;
  const formData = new FormData();

  formData.append("image", image);

  const { data, error } = await useFetch(
    `/admins/tours/${props.productSlug}/images?lang=${locale.value}`,
    {
      method: "POST",
      body: formData,
      ...requestOptions,
    }
  );
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
  } else {
    if (data.value?.data) {
      images.value.push(data.value?.data);
      arrayChange.value = true;
    }
    if (cropHelper.value) {
      cropHelper.value.modal = false;
      cropHelper.value.deleteImage();
    }
  }

  loading.value = false;
}

async function saveImagesChangePosition() {
  loading.value = true;

  const { error } = await useFetch(
    `/admins/tours/${props.productSlug}/save-images?lang=${locale.value}`,
    {
      method: "POST",
      body: {
        images_id: images.value.map((el) => el.id),
      },
      ...requestOptions,
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
  } else {
    setSuccessMessage("Images position saved successfully");
    arrayChange.value = false;
    emit("reload");
  }

  loading.value = false;
}

onMounted(() => {
  images.value = props.imagesData ?? [];
});
</script>

<style scoped></style>
