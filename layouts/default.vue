<template>
  <div>
    <header class="fixed top-0 left-0 right-0 bg-white py-4 border-b z-50">
      <div class="max-w-7xl mx-auto">
        <nav class="navbar flex flex-col sm:flex-row gap-3 sm:gap-0">
          <div class="flex-1">
            <NuxtLink
              class="link link-neutral link-hover"
              active-class="font-medium"
              to="/"
            >
              <img
                src="/hai_bali_black.png"
                alt="Hai Transfer"
                class="h-[60px] w-[60px]"
              />
            </NuxtLink>
          </div>
          <div class="flex-none">
            <ul class="inline-flex items-center space-x-4">
              <li>
                <LanguageSwitch />
              </li>
              <!-- <li>
                <NuxtLink class="btn btn-primary btn-outline" to="/sign-in"
                  >Masuk</NuxtLink
                >
              </li>
              <li>
                <NuxtLink class="btn btn-primary" to="/sign-up"
                  >Daftar</NuxtLink
                >
              </li> -->
              <li>
                <ShareLoginRegister />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>
    <FooterDefault />
    <ClientOnly>
      <Toaster position="top-right" richColors />
    </ClientOnly>
  </div>

  <SectionChat />

  <SectionTrustBox />

  <FloatingWa />
</template>

<script lang="ts" setup></script>

<style></style>
