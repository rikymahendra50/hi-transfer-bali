<template>
  <div
    class="border rounded-xl p-4 hover:border-primary hover:shadow shadow-primary"
  >
    <div
      class="grid min-[400px]:grid-cols-[100px_1fr] lg:grid-cols-[150px_1fr] gap-4"
    >
      <div class="border rounded-xl overflow-hidden">
        <img
          :src="image"
          alt="vehicle"
          class="w-full h-full xl:h-[150px] object-cover"
        />
      </div>
      <div class="grid grid-cols-1">
        <div class="space-y-2">
          <h4 class="text-lg lg:text-2xl font-semibold">{{ name }}</h4>
          <div class="flex flex-wrap gap-1 md:gap-3 py-2">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const props = defineProps({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  facilities: {
    type: [Array, Object],
  },
});

function goToVehicleBooking() {
  router.push("/vehicles/booking");
}
</script>

<style scoped></style>
