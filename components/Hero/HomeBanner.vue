<template>
  <div class="p-4 relative">
    <div class="relative rounded-xl overflow-hidden">
      <div
        class="absolute h-full w-full bg-gradient-to-t from-[#121212]/20 to-[#121212]/50 text-center space-y-6"
      >
        <div class="h-20"></div>
        <Transition :key="currentSlide?.title" name="fade">
          <h1
            class="text-3xl lg:text-5xl text-white font-bold max-w-4xl mx-auto"
          >
            {{ currentSlide?.title }}
          </h1>
        </Transition>
        <Transition :key="currentSlide?.description" name="fade">
          <p class="text-white text-base lg:text-xl max-w-2xl mx-auto">
            {{ currentSlide?.description }}
          </p>
        </Transition>
      </div>
      <Transition :key="currentSlide?.image" name="fade">
        <img
          v-if="currentSlide?.image"
          :src="currentSlide?.image"
          class="w-full h-[370px] lg:h-[500px] object-cover"
          alt="hero"
        />
      </Transition>
    </div>
    <div class="lg:absolute z-10 w-full inset-x-0 bottom-0 lg:-bottom-4">
      <div>
        <div
          class="max-w-5xl bg-white mx-auto mt-auto bottom-0 p-6 lg:p-2 shadow rounded-lg"
        >
          <div class="inline-flex">
            <ShareMenuTabLink
              label="Transport"
              icon="bi:car-front-fill"
              :is-active="isCurrent('transport')"
              @click="goTo('transport')"
            />
            <!-- , replaceWindow() -->
            <ShareMenuTabLink
              :label="$t('paket-tour')"
              icon="mingcute:umbrella-2-line"
              :is-active="isCurrent('paket-tour')"
              @click="goTo('paket-tour')"
            />
            <!-- , replaceWindow() -->
          </div>
          <div class="p-4 mt-2">
            <div v-if="isCurrent('transport')">
              <ShareFilterVehicle />
            </div>
            <div v-if="isCurrent('paket-tour')">
              <ShareFilterTour />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStepper } from "@vueuse/core";

const { locale, t: $t } = useI18n();
const route = useRoute();
const router = useRouter();

const { current, goTo, isCurrent } = useStepper(["transport", "paket-tour"]);

const slides = [
  {
    title: $t("perjalanan-aman"),
    description: $t("armada-kendaraan-modern"),
    image: "/hi-travel-hero.jpeg",
    key: "transport",
  },
  {
    title: $t("jelajahi-keajaiban"),
    description: $t("dari-pantai-hingga-gunung"),
    image: "/second-thumbnail-hero-hi-travel.jpeg",
    key: "paket-tour",
  },
];

const currentSlide = computed(() => {
  return slides.find((slide) => slide.key === current.value);
});

// onMounted(() => {
//   if (route.href === "/?tour") {
//     goTo("paket-tour");
//   } else {
//     goTo("transport");
//   }
// });

// function replaceWindow() {
//   if (isCurrent("transport")) {
//     router.replace("/?transport");
//   } else {
//     router.replace("/?tour");
//   }
// }
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
