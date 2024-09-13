<template>
  <div class="flex flex-col gap-1">
    <label
      :for="name"
      class="mt-3 text-[14px] font-medium w-fit"
      :class="classCustom"
      >{{ label }} <span class="text-[#F97066]">*</span>
      <VeeErrorMessage
        :name="name"
        class="form-error-message text-[#F97066] text-sm pt-1 ml-1"
    /></label>
    <input
      :id="name"
      :name="name"
      :type="type"
      @input="handleChange"
      @blur="handleBlur"
      :class="className"
      v-bind="$attrs"
      :step="step1"
      :value="inputValue"
      :autocomplete="autocomplete"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  type: {
    default: "text",
  },
  modelValue: [String, Number],
  name: {
    type: String,
    required: true,
  },
  classCustom: {
    type: String,
  },
  label: {
    type: String,
  },
  step1: {
    type: String,
  },
  min: {
    type: [Number, String],
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

  if (!meta.touched) {
    return arr;
  }
  if (meta.touched && meta.valid) {
    arr.push("input-success");
  }
  if (!!errorMessage.value) {
    arr.push("input-error");
  }
  return arr.join(" ");
});
</script>
