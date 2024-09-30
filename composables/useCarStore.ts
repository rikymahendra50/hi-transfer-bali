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
  });

  // const dataFormProfile = ref({
  //   name: undefined,
  //   email: undefined,
  //   phone: undefined,
  // });

  // function saveFormDataProfile() {
  //   sessionStorage.setItem(
  //     "carFormDataOrder",
  //     JSON.stringify(dataFormProfile.value)
  //   );
  // }

  // function showSavedCarDataProfile() {
  //   const savedData = sessionStorage.getItem("carFormDataOrder");

  //   if (savedData) {
  //     dataFormProfile.value = JSON.parse(savedData);
  //   }
  // }

  function saveFormData() {
    sessionStorage.setItem("carFormData", JSON.stringify(dataForm.value));
    // console.log("Data tersimpan:", dataForm.value);
  }

  function showSavedCarData() {
    const savedData = sessionStorage.getItem("carFormData");

    if (savedData) {
      dataForm.value = JSON.parse(savedData);
    }

    // console.log("showSavedCarData", dataForm.value);
  }

  function clearSavedCarData() {
    sessionStorage.removeItem("carFormData");
    console.log("Car form data dihapus dari sessionStorage");
  }

  // function submitForm() {
  //   // console.log("Form submitted:", dataForm.value);
  //   const formData = new FormData();

  //   if (options.callback) {
  //     options.callback();
  //   }
  // }

  const submitFormOrder = async (ctx: SubmissionContext) => {
    const formData = new FormData();
    loading.value = true;

    // const dataFormSubmit = ref({
    //   pic_name: dataForm.value.name,
    //   pic_email: dataForm.value.email,
    //   pic_phone_number: dataForm.value.phone,
    //   "products[0][id]": dataForm.value.car_id,
    //   "products[0][quantity]": 1,
    //   "products[0][pickup_latitude]": dataForm.value.location_pickup_latitude,
    //   "products[0][pickup_longitude]": dataForm.value.location_pickup_longitude,
    //   "products[0][pickup_name]": dataForm.value.location_pickup_name,
    //   "products[0][pickup_address]": dataForm.value.location_pickup_address,
    //   "products[0][destination_latitude]":
    //     dataForm.value.location_return_latitude,
    //   "products[0][destination_longitude]":
    //     dataForm.value.location_return_longitude,
    //   "products[0][destination_name]": dataForm.value.location_return_name,
    //   "products[0][destination_address]":
    //     dataForm.value.location_return_address,
    // });

    formData.append("pic_name", dataForm.value.name || "");
    formData.append("pic_email", dataForm.value.email || "");
    formData.append("pic_phone_number", dataForm.value.phone || "");
    formData.append("products[0][id]", dataForm.value.car_id || "");
    formData.append("products[0][quantity]", dataForm.value.quantity);
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

    // for (const item in dataFormSubmit.value) {
    //   // @ts-ignore
    //   const objectItem = dataForm.value[item];
    //   formData.append(item, objectItem);
    // }

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
          window.location.replace(data.data?.payment_url);
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
