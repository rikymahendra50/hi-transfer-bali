import { ref } from "vue";
import type { SubmissionContext } from "vee-validate";

interface Options {
  callback?: () => void;
}

export default function useTourForm(options: Options = {}) {
  const { loading, message, alertType, setErrorMessage, transformErrors } =
    useRequestHelper();

  const { requestOptions } = useRequestOptions();

  const router = useRouter();

  const { pushNotification } = useNotification();

  const { $toast } = useNuxtApp();

  const dataForm = ref({
    location_id: null,
    location_name: null,
    activity_date: null,
    tour_image: null,
    tour_name: null,
    tour_id: undefined,
    tourist_numbers: 1,
    price: undefined,
    usd_price: undefined,
    product: [],
    forms: [],
    variants: [],
    name: undefined,
    email: undefined,
    phone: undefined,
    list_location: undefined,
    list_location_string: undefined,
    user_uuid: undefined,
  });

  function saveFormData() {
    sessionStorage.setItem("tourFormData", JSON.stringify(dataForm.value));
  }

  function showSavedTourData() {
    const savedData = sessionStorage.getItem("tourFormData");

    if (savedData) {
      dataForm.value = JSON.parse(savedData);
    }
  }

  function clearSavedTourData() {
    sessionStorage.removeItem("tourFormData");
  }

  const submitForm = async (ctx: SubmissionContext) => {
    const formData = new FormData();
    loading.value = true;

    formData.append("pic_name", dataForm.value.name || "");
    formData.append("pic_email", dataForm.value.email || "");
    formData.append("pic_phone_number", dataForm.value.phone || "");
    formData.append("activity_date", dataForm.value.activity_date || "");

    if (dataForm.value.variants) {
      dataForm.value.variants.forEach((variant, index) => {
        formData.append(`products[${index}][id]`, dataForm.value.tour_id);
        formData.append(
          `products[${index}][location_id]`,
          dataForm.value.location_id || ""
        );
        formData.append(`products[${index}][name]`, variant.description);
        formData.append(`products[${index}][variant_id]`, variant.id);
        formData.append(`products[${index}][quantity]`, variant.quantity);
      });
    }

    if (dataForm.value.forms) {
      dataForm.value.forms.forEach((item, index) => {
        formData.append(`forms[${index}][product_id]`, dataForm.value.tour_id);
        formData.append(`forms[${index}][name]`, item.name);
        formData.append(`forms[${index}][variant_id]`, item.variant_id);
        formData.append(`forms[${index}][nationality]`, item.nationality);
      });
    }

    // test array

    // for (const item in dataForm.value) {
    //   if (item === "locations") {
    //     dataForm.value.locations.forEach((location, index) => {
    //       formData.append(`locations[${index}]`, location);
    //     });
    //   } else {
    //     // @ts-ignore
    //     const objectItem = dataForm.value[item];
    //     formData.append(item, objectItem);
    //   }
    // }

    // end test array

    await $fetch<CommonResponse<{ message: string }>>(
      `/users/${dataForm.value.user_uuid}/tour-orders`,
      {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formData,
        ...requestOptions,
      }
    )
      .catch((error) => {
        $toast.error(error?.data?.message ?? "Fail");
      })
      .then((data) => {
        if (data) {
          window.location.replace(data.data?.payment_url);
          options.callback?.();
        }
      });

    loading.value = false;
  };

  return {
    submitForm,
    showSavedTourData,
    saveFormData,
    dataForm,
    clearSavedTourData,
    loading,
  };
}
