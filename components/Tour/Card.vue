<template>
  <NuxtLink
    :to="slug"
    class="overflow-hidden rounded-xl space-y-2 border border-zinc-200 shadow-sm group"
  >
    <div class="h-[300px] overflow-hidden">
      <img
        :src="props.image ?? 'https://placehold.co/150'"
        :alt="image"
        class="h-[300px] w-full object-cover group-hover:scale-125 transition-all duration-300"
      />
    </div>
    <div class="p-3 space-y-4">
      <div>
        <h4 class="text-xl font-semibold text-primary-dark">
          {{ name }}
        </h4>
        <div class="text-zinc-400 text-sm line-clamp-2">
          {{ result }}
        </div>
      </div>
      <div>
        <div class="text-zinc-400 text-xs">{{ $t("harga-mulai-dari") }}</div>
        <h4 class="text-xl font-semibold text-primary">
          Rp. {{ price }} /{{ $t("orang") }}
        </h4>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const { locale, t: $t } = useI18n();

const props = defineProps({
  name: { type: String },
  slug: { type: String },
  description: { type: [String, Array] },
  image: { type: String },
  price: { type: [String, Number] },
});

const result = computed(() => {
  return props.description.map((item) => item.name).join(" - ");
});
</script>

<style scoped></style>
