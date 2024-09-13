<template>
  <VeeForm
    :validation-schema="destinationsSchema"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
    <div class="border shadow-sm rounded-[8px] py-4 px-4">
      <p class="text-black font-semibold">General</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-4">
        <UIFormTextFieldWLabel
          label="Nama Tempat"
          name="name"
          placeholder="Input Destinasi"
          v-model="dataForm.name"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />
      </div>
    </div>

    <div class="flex items-center justify-between mt-6">
      <NuxtLink
        to="/admin/destinations"
        class="btn bg-transparent border border-red-600 text-red-500"
      >
        Batalkan
      </NuxtLink>
      <button
        type="submit"
        class="btn bg-primary text-white normal-case !font-medium text-base hover:bg-primary"
      >
        {{ buttonTitle }}
      </button>
    </div>
  </VeeForm>
</template>

<script setup>
const { destinationsSchema } = useSchema();

const props = defineProps({
  destinations: {
    type: [Array, Object],
  },
  buttonTitle: {
    type: String,
  },
});

const router = useRouter();

function redirect() {
  router.push("/admin/destinations");
}

const {
  dataForm,
  onSubmit,
  message,
  alertType,
  loading,
  selectedDestinations,
} = useDestinations({ callback: redirect });

onMounted(async () => {
  if (props.destinations) {
    selectedDestinations.value = props.destinations;
    dataForm.value.name = props.destinations.name;
  }
});
</script>
