<template>
  <Teleport to="body">
    <div class="toast toast-top toast-end !z-[9999] p-2" v-if="messages.length">
      <TransitionGroup
        leave-from-class=" transition-transform duration-500 transform translate-x-52"
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
