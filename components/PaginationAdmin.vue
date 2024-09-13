<template>
  <div>
    <div class="inline-flex gap-2">
      <button
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        aria-label="Go to first page"
        class="btn btn-sm h-3 sm:h-10 bg-primary text-white"
        v-if="includeFirstLast"
      >
        {{ props.first }}
      </button>

      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
        class="border shadow-sm border-[#D0D5DD] py-2 px-3 rounded-[8px]"
        v-if="includeNextPrev"
      >
        {{ props.prev }}
      </button>

      <button
        v-for="page in pages"
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        :aria-label="`Go to page number ${page.name}`"
        class="btn btn-sm h-3 sm:h-10 bg-primary text-white"
      >
        {{ page.name }}
      </button>

      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        aria-label="Go to next page"
        class="border shadow-sm border-[#D0D5DD] py-2 px-3 rounded-[8px]"
        v-if="includeNextPrev"
      >
        {{ props.next }}
      </button>

      <button
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
        aria-label="Go to last page"
        class="btn btn-sm h-3 sm:h-10 bg-primary text-white"
        v-if="includeFirstLast"
      >
        {{ props.last }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  first: {
    type: String,
    default: "First",
  },
  last: {
    type: String,
    default: "Last",
  },
  next: {
    type: String,
    default: "Selanjutnya",
  },
  prev: {
    type: String,
    default: "Sebelumnya",
  },
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3,
  },

  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: [Number, String],
    required: true,
  },
  includeFirstLast: {
    type: Boolean,
    default: () => true,
  },
  includeNextPrev: {
    type: Boolean,
    default: () => true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const startPage = computed(() => {
  if (props.modelValue === 1) {
    return 1;
  }
  if (props.modelValue === totalPages.value) {
    return totalPages.value - props.maxVisibleButtons + 1;
  }

  return Number(props.modelValue) - 1;
});

const endPage = computed(() => {
  return Math.min(
    startPage.value + props.maxVisibleButtons - 1,
    totalPages.value
  );
});

const pages = computed(() => {
  const range = [];
  // prevent negative numbers
  const internalPage = startPage.value <= 1 ? 1 : startPage.value;
  for (let i = internalPage; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === props.modelValue,
    });
  }
  return range;
});

const totalPages = computed(() => {
  if (props.total <= props.perPage) {
    return 1;
  }
  return Math.ceil(props.total / props.perPage);
});

const isInFirstPage = computed(() => {
  return props.modelValue === 1;
});

const isInLastPage = computed(() => {
  return props.modelValue === totalPages.value;
});

function onClickFirstPage() {
  emit("update:modelValue", 1);
}
function onClickPreviousPage() {
  emit("update:modelValue", Number(props.modelValue) - 1);
}
function onClickPage(page) {
  emit("update:modelValue", page);
}
function onClickNextPage() {
  emit("update:modelValue", Number(props.modelValue) + 1);
}
function onClickLastPage() {
  emit("update:modelValue", totalPages.value);
}
function isPageActive(page) {
  return props.modelValue === page;
}
</script>

<style></style>
