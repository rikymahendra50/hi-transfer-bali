<template>
  <VeeForm
    :validation-schema="driverSchema"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
    <div class="border shadow-sm rounded-[8px] py-4 px-4">
      <p class="text-black font-semibold">General</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-4">
        <UIFormTextFieldWLabel
          label="Nama Pengemudi"
          name="name"
          placeholder="Input Pengemudi"
          v-model="dataForm.name"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />

        <UIFormTextFieldWLabel
          label="Nomor Telepon"
          name="phone"
          placeholder="Input Nomor Telepon"
          v-model="dataForm.phone"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />

        <UIFormTextFieldWLabel
          label="Email"
          name="email"
          placeholder="Input Email"
          v-model="dataForm.email"
          class="input-bordered shadow-sm focus:outline-none"
          :useStarIcon="false"
        />
      </div>
    </div>

    <div class="flex items-center justify-between mt-6">
      <NuxtLink
        to="/admin/driver"
        class="btn bg-transparent border border-red-600 text-red-500"
      >
        Batalkan
      </NuxtLink>
      <button
        type="submit"
        :disabled="loading"
        class="btn bg-primary text-white normal-case !font-medium text-base hover:bg-primary"
      >
        {{ buttonTitle }}
      </button>
    </div>
  </VeeForm>
</template>

<script setup>
const { driverSchema } = useSchema();

const props = defineProps({
  driver: {
    type: [Array, Object],
  },
  buttonTitle: {
    type: String,
  },
});

const router = useRouter();

function redirect() {
  router.push("/admin/driver");
}

const {
  dataForm,
  onSubmit,
  message,
  alertType,
  loading,
  existingImage,
  selectedDriver,
} = useDriver({ callback: redirect });

onMounted(async () => {
  if (props.driver) {
    selectedDriver.value = props.driver;
    dataForm.value.name = props.driver.name;
    dataForm.value.phone = props.driver.phone;
    dataForm.value.email = props.driver.email;
  }
});
</script>
