<template>
  <div class="form-control">
    <div class="flex flex-row space-x-4">
      <div class="flex p-4 gap-3 w-full">
        <div class="form-control">
          <label class="cursor-pointer label">
            <input
              type="checkbox"
              v-model="checked"
              class="checkbox checkbox-primary"
              @change="handleCheck"
            />
          </label>
        </div>
        <div class="flex flex-col w-full">
          <p class="text-black text-sm lg:text-base font-semibold pt-1">
            {{ productVariant.description }}
          </p>
          <div class="flex items-center justify-between gap-4 mt-2">
            <NumberUpDown
              v-model="quantity"
              :minValue="0"
              :maxValue="10"
              @input="handleQuantityChange"
            />
            <div class="font-semibold">
              {{
                FormatMoneyDash(
                  totalPrice.toString(),
                  locale == "id" ? "IDR" : "usd"
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
const { locale, t: $t } = useI18n();

const props = defineProps({
  productVariant: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Local state for checkbox and quantity
const checked = ref(props.modelValue.is_checked);
const quantity = ref(props.modelValue.quantity);

// Calculate total price
const totalPrice = computed(() => {
  return parseFloat(props.productVariant.price) * quantity.value;
});

// Emit changes to the parent whenever checkbox or quantity changes
function handleCheck() {
  if (checked.value) {
    if (quantity.value === 0) {
      quantity.value = 1;
    }
  } else {
    quantity.value = 0;
  }

  emit(
    "update:modelValue",
    {
      ...props.modelValue,
      is_checked: checked.value,
      quantity: quantity.value,
      price: totalPrice.value,
    },
    props.index
  ); // Include the index here
}

function handleQuantityChange() {
  if (quantity.value === 0) {
    checked.value = false;
  } else {
    checked.value = true;
  }

  emit(
    "update:modelValue",
    {
      ...props.modelValue,
      is_checked: checked.value,
      quantity: quantity.value,
      price: totalPrice.value,
    },
    props.index
  ); // Include the index here
}

watch(
  () => props.modelValue,
  (newVal) => {
    checked.value = newVal.is_checked;
    quantity.value = newVal.quantity;
  }
);
</script>
