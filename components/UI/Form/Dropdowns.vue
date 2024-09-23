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
        class="form-error-message text-[#F97066] text-sm pt-1 ml-1"
      />
    </label>
    <div class="flex flex-col">
      <div
        class="flex flex-col justify-center relative"
        @click="toggleDropdown"
        v-if="!isDropdownOpen"
      >
        <input
          :id="name"
          :name="name"
          :type="type"
          @input="handleChange"
          @blur="handleBlur"
          :class="className"
          v-bind="$attrs"
          :autocomplete="autocomplete"
          readonly
          :value="
            selectedOptions.map((option) => option.description).join(', ')
          "
        />
        <div class="absolute top-2 right-4">
          <Icon name="gridicons:dropdown" class="text-black w-5 h-5" />
        </div>
      </div>

      <!-- Dropdown terbuka saat user mengklik -->
      <div class="relative z-20" v-if="isDropdownOpen">
        <div
          class="absolute mt-2 min-w-48 bg-white border border-gray-300 rounded shadow-lg max-h-[130px] overflow-auto"
          ref="dropdown"
        >
          <ul>
            <li
              v-for="item in dataDropdown"
              :key="item.id"
              @click="toggleSelectOption(item)"
              :class="[
                'px-3 py-2 hover:bg-gray-100 cursor-pointer',
                isSelected(item) ? 'bg-gray-100' : '',
              ]"
            >
              {{ item.description }}
              <span v-if="isSelected(item)" class="text-sm text-primary">
                &nbsp;&nbsp;(Dipilih)</span
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Menampilkan opsi yang sudah dipilih -->
      <div v-if="selectedOptions.length" class="mt-2">
        <div
          v-for="(option, index) in selectedOptions"
          :key="index"
          class="inline-block bg-gray-100 border border-gray-300 rounded px-2 py-2 mr-2 mb-2 text-sm"
        >
          {{ option.description }}
          <Icon
            name="mingcute:close-fill"
            class="text-red-500 ml-1 cursor-pointer"
            @click="removeOption(option)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref, watch } from "vue";
import { useField } from "vee-validate";

defineOptions({
  inheritAttrs: false,
});

const dropdown = ref(null);

onClickOutside(dropdown, () => {
  isDropdownOpen.value = false;
});

const props = defineProps({
  type: {
    default: "text",
  },
  modelValue: {
    type: [String, Number, Array],
  },
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
  dataDropdown: {
    type: Array,
  },
  dataSelected: {
    type: [Array, String, Object],
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
  const arr = ["input input-bordered cursor-pointer"];
  if (!meta.touched) return arr;
  if (meta.valid) arr.push("input-success");
  if (errorMessage.value) arr.push("input-error");
  return arr.join(" ");
});

const isDropdownOpen = ref(false);
const selectedOptions = ref([]);

if (props.dataSelected.length > 0) {
  selectedOptions.value = props.dataSelected;
}

// Inisialisasi selectedOptions jika ada dataSelected
// watch(
//   () => props.dataSelected,
//   (newVal) => {
//     if (newVal && Array.isArray(newVal)) {
//       selectedOptions.value = newVal.map((item) => ({
//         ...item,
//       }));
//     }
//   },
//   { immediate: true }
// );

const emit = defineEmits(["update:modelValue", "getId"]);

// Toggle dropdown open/close
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

// Menambah atau menghapus opsi yang dipilih
function toggleSelectOption(option) {
  const index = selectedOptions.value.findIndex(
    (selected) => selected.id === option.id
  );

  if (index === -1) {
    selectedOptions.value.push(option);
  } else {
    selectedOptions.value.splice(index, 1);
  }

  emit(
    "update:modelValue",
    selectedOptions.value.map((option) => option.description)
  );
  emit(
    "getId",
    selectedOptions.value.map((option) => option.id)
  );
}

// Mengecek apakah opsi sudah dipilih
function isSelected(option) {
  return selectedOptions.value.some((selected) => selected.id === option.id);
}

// Menghapus opsi yang dipilih
function removeOption(option) {
  const index = selectedOptions.value.findIndex(
    (selected) => selected.id === option.id
  );
  if (index !== -1) {
    selectedOptions.value.splice(index, 1);
  }

  emit(
    "update:modelValue",
    selectedOptions.value.map((option) => option.description)
  );
  emit(
    "getId",
    selectedOptions.value.map((option) => option.id)
  );
}
</script>
