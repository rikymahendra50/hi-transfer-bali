export default function () {
  const stateForm = ref({
    email: "",
    otp: "",
    password: "",
    password_confirmation: "",
  });

  const showPinEmailExpired = ref(false);
  const secondTime = ref(60);

  function countdown() {
    const interval = setInterval(() => {
      if (secondTime.value === 0) {
        clearInterval(interval);
        showPinEmailExpired.value = true;
      } else {
        secondTime.value--;
      }
    }, 1000);
  }

  return {
    stateForm,
    countdown,
    showPinEmailExpired,
    secondTime,
  };
}
