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
            <div class="inline-flex space-x-1">
              <Icon name="i-heroicons-users" class="w-6 h-6 text-primary" />
              <div class="text-zinc-400 text-sm whitespace-nowrap">
                Hingga {{ maxPerson }} Penumpang
              </div>
            </div>

            <div class="inline-flex space-x-1" v-for="item in facilities">
              <!-- <Icon name="i-heroicons-briefcase" class="w-5 h-5 text-primary" /> -->
              <img :src="item.image" :alt="item.image" class="w-6 h-6" />
              <div class="text-zinc-400 text-sm whitespace-nowrap">
                {{ item.description }}
              </div>
            </div>

            <!-- <div class="inline-flex space-x-1">
              <Icon name="i-heroicons-briefcase" class="w-5 h-5 text-primary" />
              <div class="text-zinc-400 text-sm whitespace-nowrap">
                Muat 4 Koper
              </div>
            </div>
            <div class="inline-flex space-x-1">
              <Icon
                name="mingcute:steering-wheel-fill"
                class="w-5 h-5 text-primary"
              />
              <div class="text-zinc-400 text-sm whitespace-nowrap">
                Termasuk Sopir
              </div>
            </div>
            <div class="inline-flex space-x-1">
              <Icon
                name="i-heroicons-check-circle"
                class="w-5 h-5 text-primary"
              />
              <div class="text-zinc-400 text-sm whitespace-nowrap">
                Gratis Tol & Parkir
              </div>
            </div> -->
          </div>
        </div>
        <div class="flex flex-col justify-between space-y-4">
          <h4 class="text-xl font-semibold text-primary xl:text-right">
            Rp{{ price }}
          </h4>

          <div>
            <UIBtn
              @click="goToVehicleBooking"
              variant="primary"
              outlined
              class="w-full"
              >Pesan Sekarang</UIBtn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

function goToVehicleBooking() {
  router.push("/vehicles/booking");
}

const props = defineProps({
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
