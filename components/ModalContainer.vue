<template>
  <Teleport to="body">
    <dialog
      class="modal"
      :class="{ 'modal-open': showModal }"
    >
      <div
        class="modal-box"
        v-bind="$attrs"
        ref="modalBox"
      >
        <template v-if="showModal">
          <slot />
        </template>
      </div>
    </dialog>
  </Teleport>
</template>

<script
  setup
  lang="ts"
>
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
    default: () => false,
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>();

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
  // prevent click outside if modal is not open
  if (props.clickOutsite && showModal.value) {
    hideModal()
  }
});

// handle esc key to close modal
onMounted(() => {
  window.addEventListener("keydown", (event) => {
    if (props.escClick && event.key === "Escape" && showModal.value) {
      hideModal();
    }
  });
});


defineExpose({
  hideModal,
})
</script>

<style scoped></style>
