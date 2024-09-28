<template>
  <div
    class="border rounded-xl p-4 hover:border-primary hover:shadow shadow-primary"
  >
    <div class="grid grid-cols-[100px_1fr] lg:grid-cols-[150px_1fr] gap-4">
      <div>
        <div class="border rounded-xl overflow-hidden max-h-max">
          <img
            :src="image"
            :alt="image"
            class="w-full h-[100px] xl:h-[150px] object-cover"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-[1fr_170px] gap-6">
        <div class="space-y-2 border-0 xl:border-r">
          <h4 class="text-xl lg:text-2xl font-semibold">{{ name }}</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-1 lg:p-4">
            <div class="inline-flex space-x-1 items-center">
              <Icon name="i-heroicons-users" class="w-6 h-6 text-primary" />
              <div class="text-zinc-400 text-sm whitespace-nowrap">
                {{
                  $t("menampilkan-number-penumpang", {
                    number: maxPerson,
                  })
                }}
              </div>
            </div>

            <div
              class="inline-flex space-x-1 items-center"
              v-for="item in facilities"
            >
              <img :src="item.image" :alt="item.image" class="w-6 h-6" />
              <div class="text-zinc-400 text-sm whitespace-nowrap">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between space-y-4">
          <h4 class="text-xl font-semibold text-primary xl:text-right">
            {{ FormatMoneyDash(props?.price?.toString()) }}
          </h4>

          <div>
            <UIBtn
              @click="goToVehicleBooking(id, image, price, facilities, name)"
              variant="primary"
              outlined
              class="w-full"
              >{{ $t("order-sekarang") }}</UIBtn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const { locale, t: $t } = useI18n();

const {
  dataForm,
  submitForm,
  saveFormData,
  showSavedCarData,
  clearSavedCarData,
} = useCarStore({
  callback: () => {
    alert("Form has been submitted!");
  },
});

onMounted(() => {
  showSavedCarData();
});

function goToVehicleBooking(id, image, price, facilities, name) {
  dataForm.value.car_id = id;
  dataForm.value.name_car = name;
  dataForm.value.image = image;
  dataForm.value.total_price = price;
  dataForm.value.facilities = facilities;

  saveFormData();

  console.log("ini dari card", dataForm.value);

  router.push("/vehicles/booking");
}

const props = defineProps({
  id: {
    type: [String, Number],
  },
  name: {
    type: String,
  },
  price: {
    type: [String, Number],
  },
  image: {
    type: String,
  },
  facilities: {
    type: [Array, Object],
  },
  maxPerson: {
    type: [String, Number],
  },
});
</script>

<style scoped></style>
