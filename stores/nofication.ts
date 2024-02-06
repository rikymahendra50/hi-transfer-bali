import { defineStore, acceptHMRUpdate } from "pinia";

export const useNotification = defineStore("Notification", () => {
  interface Notification {
    title?: string;
    text: string;
    type: "success" | "error" | "warning" | "info";
  }

  interface FullNotification extends Notification {
    id: number;
    timer: number;
  }

  const messages = ref<FullNotification[]>([]);

  /**
   * Pushes a notification message into the messages array.
   */
  function pushNotification(notification: Notification) {
    messages.value.push({
      id: new Date().getTime(),
      ...notification,
      timer: 60,
    });
  }

  /**
   * Clear the notification messages.
   *
   */
  function clearNotification() {
    messages.value = [];
  }

  return {
    messages,
    pushNotification,
    clearNotification,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotification, import.meta.hot));
}
