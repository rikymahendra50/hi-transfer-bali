<template>
  <div
    class="flex flex-col border rounded-lg p-4 form-control hover:border-primary transition-all duration-300 mb-2"
    :class="{ 'border-primary': additionalChecked }"
  >
    <div class="flex flex-row space-x-4" @click="handleClick">
      <div class="flex p-4 gap-3 w-full">
        <div class="form-control">
          <label class="cursor-pointer label">
            <input
              type="checkbox"
              v-model="additionalChecked"
              class="checkbox checkbox-primary"
              ref="checkbox"
              :checked="additionalChecked"
            />
          </label>
        </div>
        <div class="flex flex-col w-full">
          <div class="flex flex-col gap-y-2 relative">
            <p class="text-black text-sm lg:text-base font-semibold pt-1">
              {{ props.productVariant.description }}
            </p>
            <div class="flex items-center justify-between gap-4 mt-2">
              <div class="flex items-center gap-4">
                <NumberUpDown
                  v-model="internalValue.quantity"
                  :minValue="1"
                  :maxValue="10"
                  :showTooltip="true"
                  @increment="updateModelValue"
                  @decrement="updateModelValue"
                />
              </div>
              <div class="font-semibold">
                {{ FormatMoneyDash(total.toString()) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  productVariant: {
    type: Object,
  },
  modelValue: {
    type: Array,
  },
});

const additionalChecked = ref(false);

const internalValue = ref({
  id: props.productVariant.id,
  quantity: 1,
  type: "",
  total: 0,
});

const emit = defineEmits(["update:modelValue"]);

const price = computed(() => {
  return parseFloat(props.productVariant.price) || 0;
});

const total = computed(() => {
  return price.value * internalValue.value.quantity;
});

function updateModelValue() {
  internalValue.value.total = total.value;
  emit("update:modelValue", [...props.modelValue]);
}

function resetInternalValue() {
  internalValue.value = {
    id: props.productVariant.id,
    quantity: 1,
    type: "",
    total: 0,
  };
}

watch(
  () => additionalChecked.value,
  (newValue) => {
    handleClick();
  }
);

function handleClick() {
  let variant = [...props.modelValue];
  const existingIndex = variant.findIndex(
    (el) => el.id === internalValue.value.id
  );

  if (additionalChecked.value) {
    if (existingIndex !== -1) {
      variant[existingIndex] = { ...internalValue.value, total: total.value };
    } else {
      variant.push({ ...internalValue.value, total: total.value });
    }
  } else {
    if (existingIndex !== -1) {
      variant.splice(existingIndex, 1);
    }
  }

  emit("update:modelValue", variant);
}
</script>
