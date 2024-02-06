<template>
    <div class="hero min-h-screen">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">Email Verification</h1>
                <p class="py-6">
                    Thank you for verification your email. Please click the button below to get started
                </p>
                <NuxtLink to="/sign-in.vue" class="btn btn-primary">Get Started</NuxtLink>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
useHead({
    title: "Email Verification",
})
</script>
  
<style></style>
  