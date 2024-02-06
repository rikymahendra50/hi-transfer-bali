<template>
  <Teleport to="body">
    <div class="toast toast-top toast-end !z-[9999] p-2" v-if="messages.length">
      <TransitionGroup
        enter-active-class="transition-all duration-300 opacity-0 ease-in"
        leave-active-class="transition-all duration-300 opacity-0 ease-out"
        enter-from-class="transition-all duration-500 opacity-0 translate-x-20 scale-50"
        leave-to-class="transition-all duration-1000 opacity-0 scale-50 translate-x-20 skew-y-12"
      >
        <NotificationItem
          v-for="(notification, index) in messages"
          :key="index"
          :notification="notification"
          v-model:timer="notification.timer"
          @close="closeByID(notification.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
/**
 * call the component in your layout
 *
 */

const store = useNotification();
const { messages } = storeToRefs(store);

function closeByID(id: number) {
  messages.value = [...messages.value.filter((message) => message.id !== id)];
}
</script>

<style scoped></style>
