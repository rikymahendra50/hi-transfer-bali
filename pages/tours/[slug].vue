<template>
  <div>
    <div class="h-44 sm:h-28"></div>
    <TourSwiper :data="apiData.data?.images" />
    <div class="h-5"></div>
    <UIContainer>
      <div
        class="grid sm:grid-cols-2 lg:space-y-0 lg:space-x-4 w-full my-2 lg:my-4"
      >
        <div class="flex flex-col space-y-2 gap-2">
          <h1 class="text-xl lg:text-[32px] lg:leading-[40px] font-semibold">
            {{ apiData.data?.name }}
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
        </div>
        <div class="flex justify-end w-full pt-5">
          <div class="flex items-center justify-end">
            <button
              v-if="isLocationIdorActivity"
              class="btn btn-primary"
              type="button"
              :disabled="isLocationIdorActivity"
              @click="continueOnsubmit()"
            >
              {{ $t("lanjutkan") }}
            </button>
            <button
              v-else
              class="btn btn-primary"
              type="button"
              :disabled="isButtonDisabled"
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
      >
        <div class="text-2xl font-semibold pt-5 md:pt-10">
          {{ $t("variant") }}
        </div>
        <div class="flex flex-col gap-3 relative">
          <div
            class="absolute w-full h-full bg-gray-500 bg-opacity-20 rounded-lg"
            @click="modalWhenNotSelectDate"
            v-if="isLocationIdorActivity"
          ></div>
          <div
            v-for="(item, index) in variants"
            :key="item.id"
            class="form-control"
          >
            <div class="flex flex-row space-x-4">
              <div class="flex p-2 gap-2 sm:p-4 sm:gap-3 w-full">
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
                <div class="flex flex-col w-full gap-2 md:gap-3">
                  <p class="text-black text-sm lg:text-base font-semibold pt-1">
                    {{ item.name }}
                  </p>
                  <p class="text-black text-sm lg:text-base font-medium pt-1">
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
                    <div class="text-sm sm:text-base md:text-lg font-semibold">
                      {{
                        locale === "en"
                          ? FormatMoneyDash(
                              item.totalItemPriceUSD.toString(),
                              "USD"
                            )
                          : FormatMoneyDash(
                              item.totalItemPrice.toString(),
                              "IDR"
                            )
                      }}
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
    <ShareCtaSection link="/" />
  </div>

  <!-- test modal -->
  <modal v-model="showModal" class="relative w-[90%] sm:w-[60%] lg:w-[70%]">
    <div
      class="flex justify-center items-center flex-col p-2 sm:p-5 lg:p-10 overflow-auto"
    >
      <ShareFilterTour2
        v-model="showModal"
        :dataLocation="apiData?.data?.locations"
      />
    </div>
  </modal>
  <!-- end test modal -->
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
    console.log("Form has been submitted!");
  },
});

const slug = computed(() => route.params.slug);
const apiData = ref(null);
const variants = ref([]);
const totalPrice = ref(0);
const showModal = ref(false);
const totalPriceUSD = ref(0);

const result = computed(() => {
  return (
    apiData.value?.data?.locations?.map((item) => item.name).join(" - ") || ""
  );
});

const { data, error } = await useAsyncData("tours", () =>
  $fetch(`/tours/${slug.value}?lang=${locale.value}`, {
    headers: {
      Accept: "application/json",
    },
    method: "get",
    ...requestOptions,
  })
);

apiData.value = data.value;

const initializeVariants = () => {
  if (apiData.value?.data?.variants) {
    variants.value = apiData.value.data.variants.map((variant, index) => ({
      ...variant,
      quantity: 0,
      isChecked: false,
      totalItemPrice: 0,
      totalItemPriceUSD: 0,
    }));
  }

  totalPrice.value = apiData.value?.data?.variants[0]?.price || 0;
  totalPriceUSD.value = apiData.value?.data?.variants[0]?.usd_price || 0;
};

initializeVariants();

const updateTotalPrice = () => {
  totalPrice.value = variants.value.reduce((total, variant) => {
    variant.totalItemPrice = variant.price * variant.quantity;
    return variant.isChecked ? total + variant.totalItemPrice : total;
  }, 0);
};

const updateTotalPriceUSD = () => {
  totalPriceUSD.value = variants.value.reduce((total, variant) => {
    variant.totalItemPriceUSD = variant.usd_price * variant.quantity;
    return variant.isChecked ? total + variant.totalItemPriceUSD : total;
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
  updateTotalPriceUSD();
};

const handleQuantityChange = (index, newQuantity) => {
  const variant = variants.value[index];

  if (newQuantity > variant.max_person) {
    newQuantity = variant.max_person;
  }

  variant.quantity = newQuantity;
  if (newQuantity > 0 && !variant.isChecked) {
    variant.isChecked = true;
  } else if (newQuantity === 0) {
    variant.isChecked = false;
  }

  updateTotalPrice();
  updateTotalPriceUSD(); // Ensure this is called
};

const getMaxValueForVariant = (index) => {
  return variants.value[index].max_person;
};

const continueOnsubmit = () => {
  dataForm.value.price = totalPrice.value;
  dataForm.value.usd_price = totalPriceUSD.value; // Pastikan ini benar

  dataForm.value.variants = variants.value.filter(
    (variant) => variant.quantity > 0
  );

  saveFormData();

  router.push({ path: "/tours/booking" });
};

onMounted(() => {
  showSavedTourData();
});

// Watch for changes in variants
watch(
  variants,
  () => {
    updateTotalPrice();
    updateTotalPriceUSD();
  },
  { deep: true }
);

const isButtonDisabled = computed(() => {
  return variants.value.every((variant) => variant.quantity === 0);
});

function modalWhenNotSelectDate() {
  showModal.value = !showModal.value;
}

const isLocationIdorActivity = computed(() => {
  return dataForm.value.activity_date === null;
});

useHead({
  title: computed(() => apiData.value?.data?.name),
  meta: [
    {
      name: "description",
      content: apiData.value?.data?.meta,
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
