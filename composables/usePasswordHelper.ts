export default function () {

    const inputType = ref<"password" | "text">("password");

    function togglePasswordType() {
        inputType.value = inputType.value === "password" ? "text" : "password";
    };

    return { inputType, togglePasswordType };
}