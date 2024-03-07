<template>
    <div>
        <progress
            max="100"
            value="0"
            class="progress w-full !rounded-none !h-1"
        ></progress>
    </div>
</template>

<script setup>

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


onMounted(async () => {
    await nextTick()

    gsap.to("progress", {
        value: 100,
        scrollTrigger: {
            scrub: 0.5
        }
    })
})


</script>

<style lang="scss" scoped></style>