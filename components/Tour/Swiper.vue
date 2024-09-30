<template>
  <Swiper
    :modules="[SwiperAutoplay]"
    :slides-per-view="1"
    :loop="true"
    :effect="'creative'"
    space-between="1"
    :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }"
    :breakpoints="{
      '640': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '1024': {
        slidesPerView: slidesPerView1024,
        spaceBetween: 30,
      },
    }"
  >
    <SwiperSlide v-for="slide in data" :key="slide">
      <div class="h-[350px] border">
        <img
          :src="slide.image"
          alt="slide"
          class="w-full h-full object-cover"
        />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
const props = defineProps({ data: { type: Array } });

const slidesPerView1024 = computed(() => {
  if (props.data?.length <= 1) {
    return 1;
  } else if (props.data?.length <= 2 && props.data?.length >= 1) {
    return 2;
  } else if (props.data?.length <= 3 && props.data?.length >= 2) {
    return 3;
  } else {
    return 3;
  }
});
</script>

<script setup lang="ts"></script>
