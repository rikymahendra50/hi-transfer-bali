<template>
  <Teleport to="body">
    <dialog :class="classModalWrapper">
      <div
        :class="classModalBody"
        ref="modalBox"
      >
        <button
          v-if="closeAble"
          type="button"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
          @click="modal = false"
        >✕</button>
        <template v-if="modal">
          <slot />
        </template>
        <div
          class="modal-action !justify-between"
          v-if="$slots.actions"
        >
          <slot name="actions"></slot>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside, useEventListener } from "@vueuse/core";

import clsx from "clsx";

defineOptions({
  inheritAttrs: false,
});

const modalBox = ref<HTMLDivElement>();

const props = withDefaults(defineProps<{
  modelValue: boolean,
  /**
   * control if modal is closeable or not
   * will able to close modal by clicking outside and
   * by pressing escape
   * 
  */
  closeAble?: boolean,
  class?: string

}>(), {
  modelValue: false,
  closeAble: true,
})



const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void,
  (e: "@close"): void
}>();

const modal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});


const classModalWrapper = computed(() => {
  return clsx(
    'modal modal-bottom sm:modal-middle',
    {
      "modal-open": modal.value
    })
})


const classModalBody = computed(() => {
  return clsx(
    'modal-box !rounded p-3 max-w-max',
    props.class,
  )
})



function close() {
  modal.value = false;
  emit("@close");
}

onClickOutside(modalBox, () => {
  // prevent click outside if modal is not open
  if (props.closeAble && modal.value) {
    close()
  }
});

onMounted(async () => {
  await nextTick()

  useEventListener(document, "keydown", (event) => {
    if (props.closeAble && event.key === 'Escape' && modal.value) {
      close();
    }
  });
})



defineExpose({
  close,
})
</script>

<style scoped></style>
