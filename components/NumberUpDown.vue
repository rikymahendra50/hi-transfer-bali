<template>
  <div
    class="inline-flex space-x-1 items-center"
    :class="{ tooltip: showTooltip }"
    :data-tip="dataTip"
  >
    <button
      :disabled="disabledDecrement"
      class="btn btn-sm btn-primary h-8 w-8 !p-0"
      @click="decrement"
      type="button"
      v-bind="$attrs"
    >
      <Icon name="i-heroicons-minus" class="h-4 w-4" />
    </button>

    <div class="px-3">
      {{ input }}
    </div>
    <button
      type="button"
      class="btn btn-sm btn-primary h-8 w-8 !p-0"
      @click="increment"
      :disabled="disabledIncrement"
      v-bind="$attrs"
    >
      <Icon name="i-heroicons-plus" class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  minValue: {
    type: [Number, String],
  },
  maxValue: {
    type: [Number, String],
  },
  showTooltip: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "increment"): void;
  (e: "decrement"): void;
}>();

const input = computed({
  get() {
    return props.modelValue ?? 0;
  },
  set(value) {
    emit("update:modelValue", value as number);
  },
});

function increment() {
  if (typeof input.value !== "number") {
    input.value = 0;
  }

  if (input.value === 0 && props.minValue) {
    input.value = props.minValue;
  } else {
    input.value = input.value + 1;
  }

  emit("increment");
}

async function decrement() {
  if (typeof input.value !== "number") {
    input.value = 0;
  }

  input.value = input.value - 1;
  await nextTick();
  const minInput = Number(props.minValue);

  if (minInput && input.value < minInput) {
    input.value = 0;
  }

  emit("decrement");
}

const disabledDecrement = computed(() => {
  if (props.minValue) {
    return (input.value as number) < (props.minValue as number);
  }
  return (input.value as number) <= 0;
});

const disabledIncrement = computed(() => {
  if (props.maxValue) {
    return (input.value as number) >= parseInt(props.maxValue as string);
  }
  return false;
});

const dataTip = computed(() => {
  const array = [];
  if (props.minValue) {
    array.push(`Minimal order: ${props.minValue}`);
  }
  if (props.maxValue) {
    array.push(`Maximal order: ${props.maxValue}`);
  }

  if (array.length === 0) {
    return "no min and max order";
  }
  return array.join(" and ");
});
</script>

<style scoped></style>
