<template>
  <div class="space-y-20">
    <header class="glass fixed top-0 left-0 right-0 z-50">
      <div class="max-w-7xl mx-auto">
        <nav class="navbar">
          <div class="flex-1">
            <NuxtLink
              class="link link-neutral link-hover"
              active-class="font-medium"
              to="/"
            >DaisyUI</NuxtLink>
          </div>
          <div class="flex-none">
            <ul class="inline-flex items-center space-x-4">
              <li>
                <NuxtLink
                  class="link link-hover transition-colors duration-500 hover:link-neutral"
                  active-class="link-neutral font-medium"
                  to="/daisy-example"
                >Home</NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="link link-hover transition-colors duration-500 hover:link-neutral"
                  active-class="link-neutral font-medium"
                  to="/sign-in"
                >Sign In</NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

    </header>

    <main>
      <div class="loading-indicator"></div>
      <slot />
    </main>
    <FooterDefault />
    <Notification />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
