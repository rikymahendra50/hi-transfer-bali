<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import gsap from "gsap";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  clickOutside: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const modal = ref(null);

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

// Attach onClickOutside after modal is rendered
watch(showModal, (newValue) => {
  if (newValue) {
    nextTick(() => {
      onClickOutside(modal, () => {
        if (props.clickOutside) {
          hideModal();
        }
      });
    });
  }
});

defineExpose({
  hideModal,
});

const beforeEnter = (el: any) => {
  gsap.set(el, { y: 200, opacity: 0 });
};

const enter = (el: any, done: any) => {
  gsap.to(el, { y: 0, opacity: 1, duration: 0.5, onComplete: done });
};

const leave = (el: any, done: any) => {
  gsap.to(el, { y: 200, opacity: 0, duration: 0.5, onComplete: done });
};
</script>

<template>
  <Teleport to="body">
    <div v-if="showModal" class="modal-background"></div>
    <Transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <dialog
        v-if="showModal"
        class="modal !z-[9999] !bg-transparent"
        :class="{
          'modal-open': showModal,
        }"
      >
        <div
          class="modal-content rounded-[10px] !bg-white py-3 px-3"
          v-bind="$attrs"
          ref="modal"
        >
          <template v-if="showModal">
            <div class="flex items-end justify-end pb-4">
              <div
                @click="hideModal"
                class="border px-1 w-[24px] h-[24px] flex items-center rounded-md cursor-pointer"
              >
                <Icon name="mingcute:close-fill" class="text-[#64748B]" />
              </div>
            </div>
            <slot />
          </template>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 9998;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-open {
  overflow: hidden;
}

.modal-content {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
