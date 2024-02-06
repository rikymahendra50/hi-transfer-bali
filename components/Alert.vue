<template>
  <div>
    <TransitionTopToBottom>
      <div v-if="showAlert" class="alert w-full flex" :class="[alertType]">
        <div class="w-full flex flex-col flex-grow flex-shrink">
          <span
            class="max-w-[300px] whitespace-pre-wrap leading-4 tracking-normal text-left"
          >
            {{ message }}
          </span>
        </div>
        <div class="flex-none">
          <div
            class="w-6 h-6 p-0.5 flex items-center justify-center hover:bg-white rounded-full transition-all duration-300"
            @click="closeAlert"
            role="button"
          >
            <Icon name="i-heroicons-x-circle" />
          </div>
        </div>
      </div>
    </TransitionTopToBottom>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
  },
  type: {
    type: String,
    validate(value: string) {
      return ["success", "error"].includes(value);
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const showAlert = ref<boolean>(false);

const message = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const alertType = computed(() => {
  if (props.type === "success") {
    return "alert-success";
  }
  return "alert-error";
});

watch(message, (value) => {
  if (value && !showAlert.value) {
    showAlert.value = true;
    setTimeout(closeAlert, 5000);
  }
});

function closeAlert() {
  message.value = "";
  showAlert.value = false;
}
</script>

<style></style>
