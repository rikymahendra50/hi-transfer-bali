<template>
  <div class="flex flex-col gap-1">
    <label
      :for="name"
      class="mt-3 text-[14px] font-medium w-fit"
      :class="classCustom"
    >
      {{ label }} <span class="text-[#F97066]">*</span>
      <VeeErrorMessage
        :name="name"
        class="form-error-message text-[#F97066] text-sm pt-1"
      />
    </label>
    <div class="relative flex flex-col">
      <input
        :id="name"
        :name="name"
        type="number"
        v-bind="$attrs"
        :class="className"
        :step="step1 || '1'"
        :max="max"
        :value="inputValue"
        :autocomplete="autocomplete"
        @input="updateValue($event)"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, computed } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  classCustom: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  step1: {
    type: String,
    default: "1",
  },
  min: {
    type: [Number, String],
    default: "1",
  },
  max: {
    type: [Number, String],
  },
  autocomplete: {
    type: String,
    default: "on",
  },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  syncVModel: true,
});

const className = computed(() => {
  const arr = ["input input-bordered"];

  if (meta.touched && meta.valid) {
    arr.push("input-success");
  }
  if (!!errorMessage.value) {
    arr.push("input-error");
  }
  return arr.join(" ");
});

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = Math.abs(parseFloat(target.value));
  handleChange(value);
};
</script>
