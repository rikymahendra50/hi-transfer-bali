<template>
  <div ref="main" class="relative">
    <div
      class="h-20 w-full bg-green-500 main-tool-bar fixed transition-transform duration-300"
    ></div>
    <div class="h-screen w-full skeleton loading-page"></div>
    <div class="content">
      <div class="h-screen w-full skeleton"></div>
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
definePageMeta({
  layout: false,
});
let ctx;
let loadingPage;
const main = ref(null);

onMounted(async () => {
  await nextTick();

  const ctx = gsap
    .from(".main-tool-bar", {
      yPercent: -100,
      paused: true,
      duration: 0.3,
    })
    .progress(1);

  const tl = gsap.timeline();
  tl.to(".loading-page", {
    duration: 2,
    opacity: 0,
    y: -300,
    ease: "circ.out",
    display: "none",
  }).from(".content", {
    duration: 0.2,
    opacity: 1,
    ease: "power1.in",
    display: "block",
  });

  ScrollTrigger.create({
    start: "top top",
    end: "max",
    onUpdate: (self) => {
      console.log(self.direction);
      self.direction === -1 ? ctx.play() : ctx.reverse();
    },
  });
});

onUnmounted(() => {
  loadingPage?.reverse();
});
</script>

<style lang="scss" scoped></style>
