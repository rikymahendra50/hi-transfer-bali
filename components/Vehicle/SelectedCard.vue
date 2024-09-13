<template>
  <div
    class="border rounded-xl p-4 hover:border-primary hover:shadow shadow-primary"
  >
    <div
      class="grid min-[400px]:grid-cols-[100px_1fr] lg:grid-cols-[150px_1fr] gap-4"
    >
      <div class="border rounded-xl overflow-hidden">
        <img
          src="https://placehold.co/150"
          alt="vehicle"
          class="w-full h-full xl:h-[150px] object-cover"
        />
      </div>
      <div class="grid grid-cols-1">
        <div class="space-y-2">
          <h4 class="text-lg lg:text-2xl font-semibold">Standar (Hatchback)</h4>
          <div class="flex flex-wrap gap-1 md:gap-3 py-2">
            <div class="inline-flex space-x-1">
              <Icon name="i-heroicons-users" class="w-5 h-5 text-primary" />
              <div class="text-zinc-400 text-sm whitespace-nowrap">
                Hingga 4 Penumpang
              </div>
            </div>
            <div class="inline-flex space-x-1">
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
            </div>
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
</script>

<style scoped></style>
