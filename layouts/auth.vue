<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">
    <div class="flex flex-col w-full">
      <header class="w-full z-50 py-4 px-4 border-b">
        <div>
          <nav class="navbar">
            <div class="flex-1">
              <a
                href="/"
                class="link link-neutral link-hover"
                active-class="font-medium"
              >
                <img
                  src="/hai_bali_black.png"
                  alt="Hai Transfer"
                  class="h-[60px] w-[60px]"
                />
              </a>
            </div>
            <div class="flex-none">
              <ul class="inline-flex items-center space-x-4">
                <li>
                  <LanguageSwitch />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <main class="grid place-items-center h-full">
        <slot />
      </main>

      <ClientOnly>
        <Toaster position="top-right" richColors />
      </ClientOnly>
    </div>
    <div class="hidden lg:block">
      <img src="/hi-travel-auth.png" class="w-full h-screen" alt="auth" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
