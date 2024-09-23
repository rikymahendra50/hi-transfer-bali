import { ref } from "vue";
import type { SubmissionContext } from "vee-validate";

interface Options {
  callback?: () => void; // Buat tipe lebih jelas jika callback adalah fungsi
}

export default function useTourForm(options: Options = {}) {
  const dataForm = ref({
    location_id: null,
    activity_date: null,
    tourist_numbers: 1,
    price: undefined,
    product: [],
    forms: [],
    bookingForm: {
      variant: [],
    },
    name: undefined,
    email: undefined,
    phone: undefined,
  });

  // Simpan data form ke sessionStorage
  function saveFormData() {
    sessionStorage.setItem("tourFormData", JSON.stringify(dataForm.value));
    console.log("Data tersimpan:", dataForm.value);
  }

  // Tampilkan data form yang tersimpan dari sessionStorage
  function showSavedTourData() {
    const savedData = sessionStorage.getItem("tourFormData"); // Konsisten dengan kunci penyimpanan

    if (savedData) {
      dataForm.value = JSON.parse(savedData);
    }
  }

  function clearSavedTourData() {
    sessionStorage.removeItem("tourFormData"); // Hapus item spesifik dari sessionStorage
    console.log("Tour form data dihapus dari sessionStorage");
  }

  // Fungsi untuk submit form
  function submitForm() {
    console.log("Form submitted:", dataForm.value);

    // Eksekusi callback jika ada
    if (options.callback) {
      options.callback();
    }
  }

  return {
    submitForm,
    showSavedTourData,
    saveFormData, // Ganti duplikasi dengan fungsi `saveFormData`
    dataForm,
    clearSavedTourData,
  };
}
