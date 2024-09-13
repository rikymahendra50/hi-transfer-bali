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
        slidesPerView: 4,
        spaceBetween: 40,
      },
    }"
  >
    <SwiperSlide v-for="slide in 10" :key="slide">
      <div class="h-[350px] border">
        <img
          src="https://placehold.co/150"
          alt="slide"
          class="w-full h-full object-cover"
        />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts"></script>
