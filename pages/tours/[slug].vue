<template>
  <div>
    <div class="h-28"></div>
    <TourSwiper :data="apiData?.data?.images" />
    <div class="h-5"></div>
    <UIContainer>
      <div
        class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full my-2 lg:my-4"
      >
        <div class="flex flex-col space-y-2 gap-2">
          <h1 class="text-xl lg:text-[32px] lg:leading-[40px] font-semibold">
            {{ apiData?.data?.name }}
          </h1>
          <div class="inline-flex space-x-2">
            <div>
              <Icon
                name="ph:map-pin-line-fill"
                class="w-5 h-5 text-[#00A59A]"
              />
            </div>
            <div class="text-zinc-400">
              {{ result }}
            </div>
          </div>
          <div>
            <div class="text-zinc-400 text-xs">
              {{ $t("harga-mulai-dari") }}
            </div>
            <h4 class="text-xl font-semibold text-primary">
              {{
                FormatMoneyDash(apiData?.data?.variants[0]?.price?.toString())
              }}
              /{{ $t("orang") }}
            </h4>
          </div>
          <div class="flex justify-start items-center">
            <div class="text-lg font-semibold">
              Total: {{ FormatMoneyDash(totalPrice.toString()) }}
            </div>
          </div>
        </div>
        <div class="flex justify-end w-full">
          <div class="flex items-center justify-end">
            <button
              class="btn btn-primary"
              type="button"
              @click="continueOnsubmit()"
            >
              {{ $t("lanjutkan") }}
            </button>
          </div>
        </div>
      </div>
      <div class="h-5"></div>
      <div
        class="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10"
        v-if="apiData?.data?.is_varied === 1"
      >
        <div class="text-2xl font-semibold pt-5 md:pt-10">
          {{ $t("variant") }}
        </div>
        <div>
          <!-- test -->
          <div
            v-for="(item, index) in variants"
            :key="item.id"
            class="form-control"
          >
            <div class="flex flex-row space-x-4">
              <div class="flex p-4 gap-3 w-full">
                <div class="form-control">
                  <label class="cursor-pointer label">
                    <input
                      type="checkbox"
                      v-model="item.isChecked"
                      class="checkbox checkbox-primary"
                      @change="handleVariantChange(index)"
                    />
                  </label>
                </div>
                <div class="flex flex-col w-full">
                  <p class="text-black text-sm lg:text-base font-semibold pt-1">
                    {{ item.description }}
                  </p>
                  <div class="flex items-center justify-between gap-4 mt-2">
                    <NumberUpDown
                      v-model="item.quantity"
                      :minValue="0"
                      :maxValue="getMaxValueForVariant(index)"
                      @update:modelValue="
                        (newValue) => handleQuantityChange(index, newValue)
                      "
                    />
                    <div class="font-semibold">
                      {{ FormatMoneyDash(item.totalItemPrice.toString()) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10"
      >
        <div class="text-2xl font-semibold pt-5 md:pt-10">
          {{ $t("ringkasan") }}
        </div>
        <div class="rounded-[6px] shadow-sm flex flex-col">
          <div v-html="apiData?.data?.description" class="adjustdefault"></div>
        </div>
      </div>
    </UIContainer>
    <ShareCtaSection />
  </div>
</template>

<script setup>
const { locale, t: $t } = useI18n();
const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();

const {
  dataForm,
  submitForm,
  saveFormData,
  showSavedTourData,
  clearSavedTourData,
} = useTourStore({
  callback: () => {
    alert("Form has been submitted!");
  },
});

const slug = computed(() => route.params.slug);
const apiData = ref(null);
const variants = ref([]);
const totalPrice = ref(0);
const maxPerson = ref();

const result = computed(() => {
  return (
    apiData.value?.data?.locations?.map((item) => item.name).join(" - ") || ""
  );
});

const fetchTourData = async () => {
  const { data, error } = await useAsyncData("tours", () =>
    $fetch(`/tours/${slug.value}?lang=${locale.value}`, {
      headers: {
        Accept: "application/json",
      },
      method: "get",
      ...requestOptions,
    })
  );

  if (error.value) {
    console.error("Error fetching tour data:", error.value);
    return;
  }

  apiData.value = data.value;
  maxPerson.value = apiData.value?.data?.max_person;
  console.log(apiData.value?.data?.max_person);
  initializeVariants();
};

const initializeVariants = () => {
  if (apiData.value?.data?.variants) {
    variants.value = apiData.value.data.variants.map((variant) => ({
      ...variant,
      quantity: 0,
      isChecked: false,
      totalItemPrice: 0, // Inisialisasi totalItemPrice
    }));
  }
};

const updateTotalPrice = () => {
  totalPrice.value = variants.value.reduce((total, variant) => {
    variant.totalItemPrice = variant.price * variant.quantity; // Perbarui totalItemPrice
    return variant.isChecked ? total + variant.totalItemPrice : total;
  }, 0);
};

const handleVariantChange = (index) => {
  const variant = variants.value[index];
  if (variant.isChecked && variant.quantity === 0) {
    variant.quantity = 1;
  } else if (!variant.isChecked) {
    variant.quantity = 0;
  }
  updateTotalPrice();
};

const handleQuantityChange = (index, newQuantity) => {
  const currentTotalQuantity = variants.value.reduce((total, variant) => {
    return variant.isChecked ? total + variant.quantity : total;
  }, 0);

  const remainingMaxPerson =
    maxPerson.value - (currentTotalQuantity - variants.value[index].quantity);

  if (newQuantity > remainingMaxPerson) {
    newQuantity = remainingMaxPerson;
  }

  variants.value[index].quantity = newQuantity;
  if (newQuantity > 0 && !variants.value[index].isChecked) {
    variants.value[index].isChecked = true;
  } else if (newQuantity === 0) {
    variants.value[index].isChecked = false;
  }

  // Periksa apakah total quantity sudah mencapai maxPerson
  const newTotalQuantity = variants.value.reduce((total, variant) => {
    return variant.isChecked ? total + variant.quantity : total;
  }, 0);

  if (newTotalQuantity > maxPerson.value) {
    // Jika total quantity melebihi maxPerson, kembalikan ke nilai sebelumnya
    variants.value[index].quantity =
      newQuantity - (newTotalQuantity - maxPerson.value);
    variants.value[index].isChecked = variants.value[index].quantity > 0;
  }

  updateTotalPrice();
};

const getMaxValueForVariant = (index) => {
  const currentTotalQuantity = variants.value.reduce((total, variant) => {
    return variant.isChecked ? total + variant.quantity : total;
  }, 0);

  const remainingMaxPerson =
    maxPerson.value - (currentTotalQuantity - variants.value[index].quantity);

  return Math.min(10, remainingMaxPerson);
};

const continueOnsubmit = () => {
  // console.log(variants.value);

  dataForm.value.price = totalPrice.value;
  dataForm.value.variants = variants.value;
  saveFormData();

  // console.log(totalPrice.value);

  // console.log(dataForm.value);

  router.push({ path: "/tours/booking" });
};

onMounted(() => {
  fetchTourData();
  showSavedTourData();
});

// Watch for changes in variants
watch(
  variants,
  () => {
    updateTotalPrice();
  },
  { deep: true }
);

useHead({
  title: computed(() => apiData.value?.data?.name),
  meta: [
    {
      name: "description",
      content: result.value,
    },
  ],
});
</script>

<style scoped>
:deep(.adjustdefault) ul,
:deep(.adjustdefault) ol {
  list-style: revert;
  margin-left: 20px;
}

:deep(.adjustdefault) h1,
:deep(.adjustdefault) h2,
:deep(.adjustdefault) h3,
:deep(.adjustdefault) h4,
:deep(.adjustdefault) h5,
:deep(.adjustdefault) h6 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

:deep(.adjustdefault) h1 {
  font-size: 2.5rem; /* Base size */
}
:deep(.adjustdefault) h2 {
  font-size: 2rem;
}
:deep(.adjustdefault) h3 {
  font-size: 1.75rem;
}
:deep(.adjustdefault) h4 {
  font-size: 1.5rem;
}
:deep(.adjustdefault) h5 {
  font-size: 1.25rem;
}
:deep(.adjustdefault) h6 {
  font-size: 1rem;
}

/* Responsive adjustments using media queries */
@media (max-width: 1200px) {
  :deep(.adjustdefault) h1 {
    font-size: 2.25rem;
  }
  :deep(.adjustdefault) h2 {
    font-size: 1.875rem;
  }
  :deep(.adjustdefault) h3 {
    font-size: 1.625rem;
  }
  :deep(.adjustdefault) h4 {
    font-size: 1.375rem;
  }
  :deep(.adjustdefault) h5 {
    font-size: 1.125rem;
  }
  :deep(.adjustdefault) h6 {
    font-size: 0.875rem;
  }
}

@media (max-width: 992px) {
  :deep(.adjustdefault) h1 {
    font-size: 2rem;
  }
  :deep(.adjustdefault) h2 {
    font-size: 1.75rem;
  }
  :deep(.adjustdefault) h3 {
    font-size: 1.5rem;
  }
  :deep(.adjustdefault) h4 {
    font-size: 1.25rem;
  }
  :deep(.adjustdefault) h5 {
    font-size: 1rem;
  }
  :deep(.adjustdefault) h6 {
    font-size: 0.75rem;
  }
}

@media (max-width: 768px) {
  :deep(.adjustdefault) h1 {
    font-size: 1.75rem;
  }
  :deep(.adjustdefault) h2 {
    font-size: 1.5rem;
  }
  :deep(.adjustdefault) h3 {
    font-size: 1.25rem;
  }
  :deep(.adjustdefault) h4 {
    font-size: 1rem;
  }
  :deep(.adjustdefault) h5 {
    font-size: 0.875rem;
  }
  :deep(.adjustdefault) h6 {
    font-size: 0.75rem;
  }
}

@media (max-width: 576px) {
  :deep(.adjustdefault) h1 {
    font-size: 1.5rem;
  }
  :deep(.adjustdefault) h2 {
    font-size: 1.25rem;
  }
  :deep(.adjustdefault) h3 {
    font-size: 1rem;
  }
  :deep(.adjustdefault) h4 {
    font-size: 0.875rem;
  }
  :deep(.adjustdefault) h5 {
    font-size: 0.75rem;
  }
  :deep(.adjustdefault) h6 {
    font-size: 0.625rem;
  }
}
</style>
