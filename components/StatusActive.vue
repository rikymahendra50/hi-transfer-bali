<template>
  <div
    class="font-medium text-[14px] px-3 py-1 w-fit rounded-xl"
    :class="{
      'bg-[#ECFDF3] text-[#037847]': status === 1,
      'bg-[#EF4444] bg-opacity-[12%] text-error': status === 0,
    }"
  >
    <Icon
      name="icon-park-outline:dot"
      :class="{
        'text-[#22C55E]': status === 1,
        'text-[#EF4444]': status === 0,
      }"
    />
    {{ status === 0 ? "Tidak aktif" : "Aktif" }}
  </div>
</template>

<script setup>
const props = defineProps({ status: { type: [Number, String, Boolean] } });
</script>
