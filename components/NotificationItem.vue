<template>
  <div class="alert flex flex-col" :class="alertClass">
    <div class="flex flex-row flex-grow mx-auto min-w-[200px] space-x-2">
      <div class="w-full flex flex-col flex-grow">
        <!--text-->
        <strong v-if="props.notification.title" class="tracking-wide">
          {{ props.notification.title }}
        </strong>
        <span
          class="max-w-[300px] whitespace-pre-wrap leading-4 tracking-normal"
        >
          {{ props.notification.text }}
        </span>
      </div>
      <div class="w-5 h-full" @click="close" role="button">
        <Icon name="i-heroicons-x-circle" />
      </div>
    </div>
    <progress
      class="progress bg-white !h-0.5 transition duration-500 ease-out"
      :value="interfallMaxClose"
      min="0"
      max="60"
    ></progress>
  </div>
</template>

<script setup lang="ts">
interface Notification {
  id: number;
  title?: string;
  text: string;
  type: "success" | "error" | "warning" | "info";
  timer: number;
}

const interfallMaxClose = computed({
  get() {
    return props.timer;
  },
  set(value) {
    emit("update:timer", value);
  },
});

const props = defineProps<{ notification: Notification; timer: number }>();

const emit = defineEmits(["close", "update:timer"]);

const alertClass = computed(() => {
  switch (props.notification.type) {
    case "success":
      return "alert-success";
    case "error":
      return "alert-error";
    case "warning":
      return "alert-warning";
    case "info":
      return "alert-info";
  }
});

function countdown() {
  const interval = setInterval(() => {
    if (interfallMaxClose.value === 0) {
      close();
      clearInterval(interval);
    } else {
      interfallMaxClose.value--;
    }
  }, 100);
}

function close() {
  emit("close");
}

watch(
  () => props.notification.id,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      countdown();
    }
  },
  { immediate: false }
);
onMounted(async () => {
  await nextTick();
  countdown();
});
</script>

<style scoped></style>
