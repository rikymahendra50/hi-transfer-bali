<template>
  <Teleport to="body">
    <dialog class="modal" :class="{ 'modal-open': showModal }">
      <div class="modal-box" v-bind="$attrs" ref="modalBox">
        <slot />
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

defineOptions({
  inheritAttrs: false,
});

const modalBox = ref();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
  clickOutsite: {
    type: Boolean,
    default: () => false,
  },
  escClick: {
    type: Boolean,
    default: () => true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const showModal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
function hideModal() {
  showModal.value = false;
}

onClickOutside(modalBox, () => {
  if (props.clickOutsite) {
    showModal.value = false;
  }
});

// handle esc key to close modal
onMounted(() => {
  window.addEventListener("keydown", (event) => {
    if (props.escClick && event.key === "Escape") {
      hideModal();
    }
  });
});
</script>

<style scoped></style>
