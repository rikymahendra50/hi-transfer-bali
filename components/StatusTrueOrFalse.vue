<template>
  <div
    class="px-3 py-1 w-fit rounded-xl"
    :class="{
      'bg-[#ECFDF3] text-[#037847]': data === props.trueNumber,
      'bg-[#EF4444] bg-opacity-[12%] text-error': data === props.falseNumber,
    }"
  >
    <Icon
      name="icon-park-outline:dot"
      :class="{
        'text-[#22C55E]': data === props.trueNumber,
        'text-[#EF4444]': data === props.falseNumber,
      }"
    />
    {{ data === props.trueNumber ? props.trueString : props.falseString }}
  </div>
</template>

<script setup>
const props = defineProps({
  trueString: {
    type: String,
  },
  falseString: {
    type: String,
  },
  trueNumber: {
    type: [Number, Boolean],
  },
  falseNumber: {
    type: [Number, Boolean],
  },
  data: {
    type: [Number, String, Boolean],
  },
});
</script>
