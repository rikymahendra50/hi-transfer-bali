<template>
  <div class="space-y-20">
    <header class="glass fixed top-0 left-0 right-0 z-50">
      <Container>
        <nav class="navbar">
          <div class="flex-1">
            <NuxtLink
              class="hover:font-medium transition-colors duration-300"
              to="/"
              >DaisyUI</NuxtLink
            >
          </div>
          <div class="flex-none">
            <ul class="inline-flex items-center space-x-2">
              <li>
                <NuxtLink
                  class="btn btn-outline !btn-sm"
                  active-class="btn-primary"
                  to="/daisy-example"
                  >Home</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  class="btn btn-outline !btn-sm"
                  active-class="btn-primary"
                  to="/sign-in"
                  >Sign In</NuxtLink
                >
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
    <main>
      <slot />
    </main>
    <Notification />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
