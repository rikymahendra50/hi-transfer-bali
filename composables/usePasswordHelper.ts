export default function () {
  const inputType = ref<"password" | "text">("password");

  function toggleInputType() {
    inputType.value = inputType.value == "password" ? "text" : "password";
  }

  return { inputType, toggleInputType };
}
