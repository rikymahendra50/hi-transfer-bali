<template>
  <div>
    <VDropdown>
      <button
        class="btn btn-outline border-zinc-300 hover:bg-transparent hover:outline-zinc-300 group hover:border-primary"
      >
        <img :src="language.image" :alt="language.label" class="w-5 h-5" />
        <div class="group-hover:text-primary">
          {{ language.label }}
        </div>
      </button>
      <template #popper>
        <div class="p-2">
          <ul class="flex flex-col space-y-2">
            <li
              @click="changeLocale('en')"
              class="py-1 inline-flex space-x-4 hover:bg-zinc-200 cursor-pointer hover:outline-zinc-300 hover:border-zinc-200 hover:rounded-md px-2"
            >
              <img src="/united-kingdom.png" alt="english" class="w-5 h-5" />
              <div>English</div>
            </li>
            <li
              @click="changeLocale('id')"
              class="py-1 inline-flex space-x-4 hover:bg-zinc-200 cursor-pointer hover:outline-zinc-300 hover:border-zinc-200 hover:rounded-md px-2"
            >
              <img src="/indonesia.png" alt="indonesia" class="w-5 h-5" />
              <div>Indonesia</div>
            </li>
          </ul>
        </div>
      </template>
    </VDropdown>
  </div>
</template>

<script setup lang="ts">
const { setLocale, locale } = useI18n();

function changeLocale(lang: "id" | "en") {
  setLocale(lang);
  window.location.reload();
}

const language = computed(() => {
  if (locale.value == "id") {
    return {
      image: "/indonesia.png",
      label: "Indonesia",
    };
  }
  return {
    image: "/united-kingdom.png",
    label: "English",
  };
});
</script>

<style scoped></style>
