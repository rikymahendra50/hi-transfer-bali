<template>
  <div class="space-y-0.5 !relative h-auto pb-1">
    <div
      :class="
        clsx(
          'grid grid-cols-1 gap-1 text-left border-2 p-1 px-5 rounded-xl relative',
          {
            'border-red-400/80': isError,
          }
        )
      "
    >
      <label
        :for="props.name"
        :class="
          clsx(
            'tracking-wide bg-white  absolute -top-3 left-4  px-1 text-sm ext-gray-[#8B8B8B] rounded-lg',
            {
              'text-red-400': isError,
            }
          )
        "
      >
        {{ props.label }}
      </label>

      <slot />
    </div>
    <div class="pl-5">
      <TransitionX>
        <VeeErrorMessage :name="name" class="form-error-message" />
      </TransitionX>
      <div class="form-description text-sm" v-if="$slots.description">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";
import { provide } from "vue";

const props = defineProps({
  /**
   * input label
   * @type {string}
   * @example
   */
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const isError = ref(false);

function setError(value: boolean) {
  isError.value = value;
}

provide("group-form", {
  setError,
});

defineOptions({
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped></style>
