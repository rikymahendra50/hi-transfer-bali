interface Options {
  callback?: Function;
}

import type { SubmissionContext } from "vee-validate";

export default function (options: Options = {}) {
  const { requestOptions } = useRequestOptions();

  const { loading, message, alertType, setErrorMessage, transformErrors } =
    useRequestHelper();

  const { pushNotification } = useNotification();

  const selectedFacility = ref();

  const dataForm = ref({
    "description[en]": "",
    "description[id]": "",
    image: "",
  });

  function resetForm() {
    dataForm.value = {
      "description[en]": "",
      "description[id]": "",
      image: "",
    };
  }

  const existingImage = computed(() => {
    return selectedFacility.value?.image;
  });

  function onSubmit(values: any, ctx: SubmissionContext) {
    if (selectedFacility.value) {
      updateFacility(ctx);
    } else {
      createFacility(ctx);
    }
  }

  async function createFacility(ctx: SubmissionContext) {
    const formData = new FormData();

    loading.value = true;

    for (const item in dataForm.value) {
      // @ts-ignore
      const objectItem = dataForm.value[item];
      formData.append(item, objectItem);
    }

    await $fetch<CommonResponse<{ message: string }>>("/admins/facilities", {
      method: "POST",
      body: formData,
      ...requestOptions,
    })
      .catch((error) => {
        setErrorMessage(error.data?.message);
        ctx.setErrors(transformErrors(error.data));
        pushNotification({
          type: "error",
          text: error.value.data?.message,
          title: "error",
        });
      })
      .then((data) => {
        if (data) {
          ctx.resetForm();
          pushNotification({
            type: "success",
            text: "Facility created successfully",
          });
          options.callback?.();
        }
      });

    loading.value = false;
  }

  const updateFacility = async (ctx: SubmissionContext) => {
    const formData = new FormData();
    loading.value = true;

    for (const item in dataForm.value) {
      // @ts-ignore
      const objectItem = dataForm.value[item];
      formData.append(item, objectItem);
    }

    await $fetch<CommonResponse<{ message: string }>>(
      `/admins/facilities/${selectedFacility.value?.id}?_method=PUT`,
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
        setErrorMessage(error.data?.message);
        ctx.setErrors(transformErrors(error.data));
        pushNotification({
          type: "error",
          text: error.value.data?.message,
          title: "error",
        });
      })
      .then((data) => {
        if (data) {
          ctx.resetForm();
          pushNotification({
            type: "success",
            text: "Facility updated successfully",
          });
          resetForm();
          options.callback?.();
        }
      });

    loading.value = false;
  };

  async function deleteFacility(id: any) {
    loading.value = true;
    const { error } = await useFetch<CommonResponse<{ message: string }>>(
      `/admins/facilities/${id}`,
      {
        method: "DELETE",
        ...requestOptions,
      }
    );

    if (error.value) {
      setErrorMessage(error.value?.data?.message ?? "Something went wrong");
    } else {
      pushNotification({
        type: "success",
        text: "Facility deleted successfully",
      });
      options.callback?.();
    }
    loading.value = false;
  }

  return {
    selectedFacility,
    dataForm,
    onSubmit,
    deleteFacility,
    existingImage,
    loading,
  };
}
