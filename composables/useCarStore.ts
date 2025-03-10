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
    location_pickup_name: undefined,
    location_pickup_address: undefined,
    location_return_name: undefined,
    location_return_address: undefined,
    location_return_latitude: undefined,
    location_return_longitude: undefined,
    location_pickup_latitude: undefined,
    location_pickup_longitude: undefined,
    pickup_date: undefined,
    slug: undefined,
    return_date: undefined,
    round_trip: 0,
    quantity: undefined,
    passengers: 1,
    distance: undefined,
    distance_text: undefined,
    car_id: undefined,
    name_car: undefined,
    image: undefined,
    price: undefined,
    total_price: undefined,
    max_person: 1,
    facilities: [],
    user_uuid: undefined,
    name: undefined,
    email: undefined,
    phone: undefined,
    flight_number: undefined,
  });

  function saveFormData() {
    sessionStorage.setItem("carFormData", JSON.stringify(dataForm.value));
  }

  function showSavedCarData() {
    const savedData = sessionStorage.getItem("carFormData");

    if (savedData) {
      dataForm.value = JSON.parse(savedData);
    }
  }

  function clearSavedCarData() {
    sessionStorage.removeItem("carFormData");
  }

  const submitFormOrder = async (ctx: SubmissionContext) => {
    const formData = new FormData();
    loading.value = true;

    formData.append("pic_name", dataForm.value.name || "");
    formData.append("pic_email", dataForm.value.email || "");
    formData.append("pic_phone_number", dataForm.value.phone || "");
    formData.append("flight_number", dataForm.value.flight_number || "");
    formData.append("products[0][id]", dataForm.value.car_id || "");

    if (dataForm.value.round_trip == 1) {
      if (dataForm.value.quantity < 10) {
        dataForm.value.quantity = 10;
        formData.append("products[0][quantity]", dataForm.value.quantity);
      } else {
        formData.append("products[0][quantity]", dataForm.value.quantity / 2);
      }
    } else if (dataForm.value.round_trip == 0) {
      if (dataForm.value.quantity < 10) {
        dataForm.value.quantity = 10;
        formData.append("products[0][quantity]", dataForm.value.quantity);
      } else {
        formData.append("products[0][quantity]", dataForm.value.quantity);
      }
    }

    formData.append(
      "products[0][pickup_latitude]",
      dataForm.value.location_pickup_latitude || ""
    );
    formData.append(
      "products[0][pickup_longitude]",
      dataForm.value.location_pickup_longitude || ""
    );
    formData.append(
      "products[0][pickup_name]",
      dataForm.value.location_pickup_name || ""
    );
    formData.append(
      "products[0][pickup_address]",
      dataForm.value.location_pickup_address || ""
    );
    formData.append(
      "products[0][destination_latitude]",
      dataForm.value.location_return_latitude || ""
    );
    formData.append(
      "products[0][destination_longitude]",
      dataForm.value.location_return_longitude || ""
    );
    formData.append(
      "products[0][destination_name]",
      dataForm.value.location_return_name || ""
    );
    formData.append(
      "products[0][destination_address]",
      dataForm.value.location_return_address || ""
    );
    formData.append(
      "products[0][activity_date]",
      dataForm.value.pickup_date || ""
    );

    if (dataForm.value.round_trip == 1) {
      formData.append("products[1][id]", dataForm.value.car_id || "");
      // formData.append("products[1][quantity]", dataForm.value.quantity / 2);

      if (dataForm.value.quantity < 10) {
        dataForm.value.quantity = 10;
        formData.append("products[1][quantity]", dataForm.value.quantity);
      } else {
        formData.append("products[1][quantity]", dataForm.value.quantity / 2);
      }

      formData.append(
        "products[1][pickup_latitude]",
        dataForm.value.location_return_latitude || ""
      );
      formData.append(
        "products[1][pickup_longitude]",
        dataForm.value.location_return_longitude || ""
      );
      formData.append(
        "products[1][pickup_name]",
        dataForm.value.location_return_name || ""
      );
      formData.append(
        "products[1][pickup_address]",
        dataForm.value.location_return_address || ""
      );
      formData.append(
        "products[1][destination_latitude]",
        dataForm.value.location_pickup_latitude || ""
      );
      formData.append(
        "products[1][destination_longitude]",
        dataForm.value.location_pickup_longitude || ""
      );
      formData.append(
        "products[1][destination_name]",
        dataForm.value.location_pickup_name || ""
      );
      formData.append(
        "products[1][destination_address]",
        dataForm.value.location_pickup_address || ""
      );
      formData.append(
        "products[1][activity_date]",
        dataForm.value.return_date || ""
      );
    }

    await $fetch<CommonResponse<{ message: string }>>(
      `/users/${dataForm.value.user_uuid}/car-orders`,
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
        // setErrorMessage(error.data?.message);
        // ctx.setErrors(transformErrors(error.data));
        // alert(error);
        $toast.error(error?.data?.message ?? "Fail");
      })
      .then((data) => {
        if (data) {
          loading.value = false;
          window.location.replace(data?.data?.payment_url);
          options.callback?.();
        }
      });

    loading.value = false;
  };

  return {
    submitFormOrder,
    clearSavedCarData,
    saveFormData,
    dataForm,
    showSavedCarData,
    loading,
    // saveFormDataProfile,
    // showSavedCarDataProfile,
  };
}
