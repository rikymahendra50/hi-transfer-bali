<template>
  <ClientOnly>
    <modal
      v-model="modalInput"
      class="p-0 rounded-lg w-10/12 max-w-3xl overflow-y-auto max-h-[100%]"
    >
      <div class="card card-compact rounded-lg">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-bold">Image Crop</h3>
            </div>
            <div></div>
          </div>
          <p>Max image size is 2MB</p>
          <div class="">
            <template v-if="imageUrl">
              <VuePictureCropper
                :boxStyle="boxStyle"
                :img="imageUrl"
                :options="{
                  viewMode: 1,
                  dragMode: 'move',
                  aspectRatio: 1 / 1,
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
          </div>

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
                class="btn btn-success"
                type="button"
                @click="crop"
              >
                Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <div class="flex flex-col gap-1">
      <label
        :for="name"
        class="mt-3 text-[14px] font-medium w-fit mb-1"
        :class="classCustom"
      >
        {{ label }} <span class="text-[#F97066]">*</span>
        <VeeErrorMessage
          :name="name"
          class="form-error-message text-[#F97066] text-sm pt-1 ml-1"
        />
      </label>
      <div
        class="rounded-lg input input-bordered shadow-sm flex flex-col items-center justify-center h-fit py-3"
      >
        <div class="flex gap-5 w-full" v-if="imageReviewUrl">
          <div class="flex items-start justify-start">
            <Icon name="ph:image" class="text-black w-6 h-6" />
          </div>
          <div class="">
            <p class="text-[#121212] text-sm font-medium">
              {{ imageName || "Image" }}
            </p>
            <p class="text-[#7b7b7b] text-[12px]">
              {{ imageReview?.size ? formatFileSize(imageReview?.size) : "" }}
            </p>
            <button
              @click="showImageDetailFunc"
              type="button"
              class="text-[12px] text-[#3B82F6]"
            >
              Click to view image
            </button>
          </div>
          <div class="col-span-2 flex items-start justify-end">
            <!-- <Icon
                    name="ph:trash"
                    class="w-[18px] h-[18px] text-red-600 cursor-pointer"
                    @click="deleteImage"
                  /> -->
          </div>
        </div>
        <button
          type="button"
          class="btn btn-md flex items-center bg-primary hover:bg-primary text-white normal-case rounded-full mt-3"
          @click="open()"
          v-if="!image"
        >
          <Icon name="material-symbols:upload" class="text-white w-7 h-7" />
          <span>
            {{ imageReviewUrl ? "Rubah Gambar" : "Upload Gambar" }}
          </span>
        </button>
        <div>
          <!-- <p>Max image size is 2MB</p> -->
          <progress v-if="props.loading" class="progress w-100"></progress>
          <span v-if="imageFileSizeMsg" class="text-error text-sm my-2">
            {{ imageFileSizeMsg }}
          </span>
        </div>
      </div>
    </div>
    <!-- end test -->

    <!-- modal detail gambar -->
    <modal
      v-model="showImageDetail"
      class="p-0 rounded-lg w-10/12 max-w-3xl overflow-y-auto max-h-[100%]"
    >
      <div class="flex justify-center h-full">
        <img :src="imageReviewUrl" :alt="imageReviewUrl" class="max-h-screen" />
      </div>
    </modal>
  </ClientOnly>
</template>

<script setup>
import { useFileDialog } from "@vueuse/core";
import VuePictureCropper, { cropper } from "vue-picture-cropper";
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  existingimage: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [File, String],
    default: null,
  },
  name: {
    type: String,
    default: "Image",
  },
  label: {
    type: String,
    default: "Background Image",
  },
  classCustom: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const modalInput = ref(false);
const showImageDetail = ref(false);

const image = ref(null);
const imageName = ref(undefined);

const imageUrl = computed(() => {
  return image.value ? URL.createObjectURL(image.value) : null;
});

const imageFileSizeMsg = ref();

const imageReview = ref();

const imageReviewUrl = computed(() => {
  return imageReview.value
    ? URL.createObjectURL(imageReview.value)
    : props.existingimage ?? null;
});

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*", // Set to accept only image files
  multiple: false,
});

const boxStyle = computed(() => {
  const isLargeScreen = width.value >= 600;
  return isLargeScreen
    ? {
        width: "500px",
        height: "400px",
        backgroundColor: "#f8f8f8",
        margin: "auto",
      }
    : {
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f8f8",
        margin: "auto",
      };
});

onChange((files) => {
  if (!files) {
    return;
  }
  // @ts-ignore
  image.value = files[0];
  reset();
  modalInput.value = true;
});

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

  imageName.value = file.name;

  // check if file is more than 2mb

  if (file.size > 2 * 1024 * 1024) {
    imageFileSizeMsg.value = "File size should not be more than 2mb";
    return;
  }

  imageReview.value = file;
  emit("update:modelValue", file);
  modalInput.value = false;
}

watch(
  () => modalInput.value,
  (value) => {
    if (!value) {
      image.value = null;
    }
  }
);

function cancelCrop() {
  modalInput.value = false;
}

function formatFileSize(size) {
  if (!size) return "0 KB";
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "KB", "MB", "GB", "TB"][i]
  );
}

function deleteImage() {
  imageReview.value = null;
  emit("update:modelValue", null);
}

function showImageDetailFunc() {
  showImageDetail.value = true;
}

defineExpose({
  modalInput,
});
</script>

<style scoped></style>
