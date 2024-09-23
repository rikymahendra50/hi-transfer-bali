<template>
  <div class="w-20 group">
    <div class="avatar" @click="open()" role="button">
      <div
        v-if="imageUrlReview"
        class="w-20 h-20 rounded-full overflow-hidden group-hover:ring-1 ring-gray-500/80 ring-offset-1 transition-all duration-300"
      >
        <img :src="imageUrlReview" alt="profile" class="w-full h-full" />
      </div>

      <div
        v-else
        class="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center"
      >
        <Icon name="i-heroicons-user" />
      </div>
    </div>
    <div
      class="hidden group-hover:block text-center transition-all duration-300 delay-100 text-sm text-gray-500/80"
    >
      Update Image
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: [File, String],
  },
  profileImage: {
    type: String,
  },
});

const image = ref<File | null>(null);
const emit = defineEmits(["update:modelValue"]);

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*", // Set to accept only image files
  multiple: false,
});
onChange((files: FileList | null) => {
  if (!files) {
    return;
  }
  // @ts-ignore
  emit("update:modelValue", files[0]);
  // @ts-ignore
  image.value = files[0];
  reset();
});

const imageUrlReview = computed(() => {
  if (image.value) {
    return URL.createObjectURL(image.value as File);
  }

  return !!props.profileImage
    ? props.profileImage
    : "https://fakeimg.pl/400x400?text=profile";
});
</script>

<style scoped></style>
