<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
  <div class="w-full  mx-auto">
    <NuxtImg
      src="https://images.unsplash.com/photo-1707724190331-15ac0c62f55e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      format="webp"
    />
    <div class="avatar">
      <div class="h-14 w-14 rounded-full">
        <NuxtImg
          src="https://images.unsplash.com/photo-1654762701727-de6ccd172eb9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width="56"
          height="56"
          format="webp"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "DaisyUI",
})
</script>

<style></style>
