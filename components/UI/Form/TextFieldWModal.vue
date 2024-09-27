<template>
  <label
    :class="
      clsx(
        'flex items-center  rounded-lg focus-within:outline-none w-full h-9 overflow-hidden',
        {
          'gap-2': !!$slots.leftSection || !!$slots.rightSection,
          'pl-0': !$slots.leftSection,
          'pr-0': !$slots.rightSection,
        }
      )
    "
  >
    <slot v-if="$slots.leftSection" name="leftSection" />
    <input
      @click="showModalFuncti"
      :name="name"
      :id="name"
      :type="type"
      v-model="value"
      readonly
      :disabled="disabled"
      :aria-label="ariaLabel"
      :placeholder="placeholder"
      :class="
        clsx(
          'w-full h-full !outline-none focus:!border-none disabled:bg-gray-50 cursor-pointer',
          {
            'px-1': !$slots.leftSection || !$slots.rightSection,
          }
        )
      "
      v-bind="$attrs"
    />
    <slot v-if="$slots.rightSection" name="rightSection" />
  </label>

  <!-- modal -->
  <ModalMap
    v-model="showModal"
    v-model:latitude="formData.latitude"
    v-model:longitude="formData.longitude"
    v-model:locationAddress="formData.locationAddress"
    v-model:locationName="formData.locationName"
    :dataJikaSudahada2="props.dataJikaSudahAda"
  />
  <!-- end modal -->
</template>

<script setup lang="ts">
import clsx from "clsx";

import { useField } from "vee-validate";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    type?:
      | "text"
      | "number"
      | "email"
      | "password"
      | "date"
      | "time"
      | "datetime-local"
      | "search";
    modelValue: string | number | undefined;
    name: string;
    class?: string;
    disabled?: boolean;
    ariaLabel?: string;
    placeholder?: string;
    readonly?: boolean;
    dataJikaSudahAda?: Array;
  }>(),
  {
    type: "text",
    disabled: false,
    bordered: true,
  }
);

const name = toRef(props, "name");

const { value, errorMessage } = useField(name, undefined, {
  syncVModel: true,
});

const { setError }: any = inject("group-form");

watch(errorMessage, (value) => {
  if (value) {
    setError(true);
  } else {
    setError(false);
  }
});

const input = ref<HTMLInputElement>();

const showModal = ref(false);

function showModalFuncti() {
  showModal.value = !showModal.value;
}

const formData = ref({
  latitude: undefined,
  longitude: undefined,
  locationAddress: undefined,
  locationName: undefined,
});

const emit = defineEmits([
  "update:longitude",
  "update:latitude",
  "update:locationAddress",
  "update:locationName",
]);

watch(
  () => formData.value.latitude,
  (newValue, oldValue) => {
    emit("update:latitude", newValue);
  }
);

watch(
  () => formData.value.longitude,
  (newValue, oldValue) => {
    emit("update:longitude", newValue);
  }
);

watch(
  () => formData.value.locationAddress,
  (newValue, oldValue) => {
    emit("update:locationAddress", newValue);
  }
);

watch(
  () => formData.value.locationName,
  (newValue, oldValue) => {
    emit("update:locationName", newValue);
  }
);
</script>
