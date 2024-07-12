import { defineStore, acceptHMRUpdate } from "pinia";

export const useVehicleForm = defineStore("VehicleForm", () => {

    const dataForm = ref({
        name: "",
        email: "",
        phone: ""
    })

    const isLoading = ref(false)

    const btnSubmit = ref<HTMLButtonElement>()

    function btnSubmitClick() {
        btnSubmit.value?.click()

    }
    return {
        dataForm,
        btnSubmit,
        isLoading,
        btnSubmitClick
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useVehicleForm, import.meta.hot));
}
