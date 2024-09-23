<template>
  <ClientOnly>
    <Modal
      v-model="modal"
      esc-click
      click-outsite
      @closeModal="cancelCrop"
      class="p-0 rounded-lg w-10/12 max-w-3xl max-h-[100%] overflow-y-auto"
    >
      <div class="card card-compact border rounded-lg">
        <div class="card-body space-y-4">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-bold">Title</h3>
            </div>
            <div></div>
          </div>

          <p>2 mb</p>

          <template v-if="imageUrl">
            <VuePictureCropper
              :boxStyle="{
                width: '100%',
                height: '100%',
                backgroundColor: '#f8f8f8',
                margin: 'auto',
              }"
              :img="imageUrl"
              :options="{
                viewMode: 1,
                dragMode: 'move',
                aspectRatio: 4 / 3,
                cropBoxResizable: false,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
                zoomable: false,
              }"
              :presetMode="{
                width: 1000,
                height: 750,
                mode: 'fixedSize',
              }"
            />
          </template>
          <div v-if="imageReviewUrl">
            <img
              class="h-full w-full aspect-square border-2 border-purple-600"
              :src="imageReviewUrl"
              alt="review"
            />
          </div>
          <progress v-if="props.loading" class="progress w-100"></progress>
          <span v-if="imageFileSizeMsg" class="text-error text-sm my-2">
            {{ imageFileSizeMsg }}
          </span>
          <div class="flex justify-between">
            <div>
              <button
                :disabled="loading"
                class="btn btn-neutral"
                type="button"
                @click="cancelCrop"
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                :disabled="loading"
                class="btn btn-primary"
                type="button"
                @click="crop"
              >
                Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <div v-if="imageResult" class="h-full w-full flex flex-col space-y-2">
      <div class="h-full w-full rounded-lg overflow-hidden relative">
        <div class="absolute h-full w-full p-2 group">
          <div
            role="button"
            @click="deleteImage"
            class="hidden group-hover:block text-error bg-red-50 p-2 max-w-max rounded-lg transition-all duration-200"
          >
            <Icon name="i-heroicons-trash" class="h-6 w-6" />
          </div>
        </div>
        <ImageLoading :src="imageResult" alt="review" class="h-full w-full" />
      </div>
      <div class="btn btn-sm max-w-max" role="button" @click="changeImage">
        Change image
      </div>
    </div>

    <div
      class="h-full w-full min-h-[150px] overflow-hidden rounded-lg border border-dashed flex items-center justify-center hover:shadow-md transition-all duration-500"
      role="button"
      @click="open()"
      v-else=""
    >
      <div class="flex flex-col text-gray-400">
        <div class="flex justify-center">
          <Icon
            name="i-heroicons-plus"
            class="h-24 w-24 stroke-0 fill-none opacity-90"
          />
        </div>
        <span> Tambah gambar </span>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

const { t: $t } = useI18n();

const modal = ref(false);

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  existingImage: {
    type: String,
    default: () => null,
  },
  modelValue: {
    type: [File],
    default: () => undefined,
  },
});

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "update:modelValue", image: File | undefined): void;
  (e: "@uploadImage", image: File): void;
  (e: "deleteImage"): void;
}>();

const image = ref<File | null>(null);

const imageUrl = computed(() => {
  if (image.value) {
    return URL.createObjectURL(image.value);
  }
  return props.existingImage;
});

const imageFileSizeMsg = ref();

const imageReview = ref<File | null>(null);

const imageCropped = ref<File | null>(null);

const imageReviewUrl = computed(() => {
  return imageReview.value ? URL.createObjectURL(imageReview.value) : null;
});

const imageResult = computed(() => {
  return imageCropped.value
    ? URL.createObjectURL(imageCropped.value as File)
    : props.existingImage;
});

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*", // Set to accept only image files
  multiple: false,
});
onChange((files) => {
  if (!files) {
    return;
  }
  // @ts-ignore
  image.value = files[0];
  reset();
  modal.value = true;
});

function changeImage() {
  image.value = null;
  imageCropped.value = null;
  emit("update:modelValue", undefined);
  open();
}

async function crop() {
  imageFileSizeMsg.value = undefined;

  const blob = await cropper
    ?.getBlob({
      height: 750,
      width: 1000,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    })
    .then((file) => {
      return file;
    });

  if (!blob) {
    return;
  }

  /**
   * convert the blob file to file
   *
   */
  const file = new File([blob], image.value?.name ?? "cropped.jpeg", {
    type: image.value?.type,
  });

  // check if file is more than 2mb

  if (file.size > 2 * 1024 * 1024) {
    imageFileSizeMsg.value = $t("crop.max_file_size");
    return;
  }

  imageCropped.value = file;
  modal.value = false;

  emit("update:modelValue", file);

  emit("@uploadImage", file);
}

function deleteImage() {
  imageCropped.value = null;
  emit("update:modelValue", undefined);
  emit("deleteImage");
}

watch(
  () => modal.value,
  (value) => {
    if (!value) {
      image.value = null;
    }
  }
);

function cancelCrop() {
  modal.value = false;
}

defineExpose({
  modal,
  deleteImage,
});
</script>

<style scoped></style>
