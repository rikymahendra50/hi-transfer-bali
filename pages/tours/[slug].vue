<template>
  <div>
    <div class="h-28"></div>
    <TourSwiper :data="data?.data?.images" />
    <div class="h-5"></div>
    <UIContainer>
      <div
        class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full my-2 lg:my-4"
      >
        <div class="flex flex-col space-y-2 gap-2">
          <h1 class="text-xl lg:text-[32px] lg:leading-[40px] font-semibold">
            {{ data?.data?.name }}
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
              {{ FormatMoneyDash(data?.data?.variants[0]?.price?.toString()) }}
              /{{ $t("orang") }}
            </h4>
          </div>
          <div class="flex justify-start items-center">
            <div class="text-lg font-semibold">Total: {{ 21 }}</div>
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
        <div class="">
          <UIFormCheckboxProductVariant
            v-for="(item, index) in apiData?.data?.variants"
            :key="item.id"
            :productVariant="item"
            v-model="dataForm.bookingForm.variant"
          />
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10"
      >
        <div class="text-2xl font-semibold pt-5 md:pt-10">Ringkasan</div>
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

const slug = computed(() => route.params.slug);
const data = ref(null);

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

// watch(
//   () => dataForm.value.bookingForm.variant,
//   (newValue, oldValue) => {
//     console.log(newValue);
//   }
// );

const {
  data: apiData,
  error,
  refresh,
} = await useAsyncData("toursDetail", () =>
  $fetch(`/tours/${slug.value}?lang=${locale.value}`, {
    method: "get",
    ...requestOptions,
  })
);

if (apiData.value) {
  data.value = apiData.value;
  data.value.data.variants.forEach((variant) => {
    variant.quantity = 1;
    variant.selected = false;
  });
}

const result = computed(() => {
  return (
    apiData.value?.data?.locations?.map((item) => item.name).join(" - ") || ""
  );
});

onMounted(() => {
  showSavedTourData();
});

function continueOnsubmit() {
  saveFormData();
  router.push({ path: "/tours/booking" });
}

useHead({
  title: apiData?.value.data?.name,
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
