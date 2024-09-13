interface Options {
  callback?: Function;
}

import type { SubmissionContext } from "vee-validate";

export default function (options: Options = {}) {
  const { requestOptions } = useRequestOptions();

  const { loading, message, alertType, setErrorMessage, transformErrors } =
    useRequestHelper();

  const { pushNotification } = useNotification();

  const selectedDestinations = ref();

  const dataForm = ref({
    name: undefined,
  });

  function resetForm() {
    dataForm.value = {
      name: undefined,
    };
  }

  function onSubmit(values: any, ctx: SubmissionContext) {
    if (selectedDestinations.value) {
      updateDestinations(ctx);
    } else {
      createDestinations(ctx);
    }
  }

  async function createDestinations(ctx: SubmissionContext) {
    const formData = new FormData();

    loading.value = true;

    for (const item in dataForm.value) {
      // @ts-ignore
      const objectItem = dataForm.value[item];
      formData.append(item, objectItem);
    }

    await $fetch<CommonResponse<{ message: string }>>("/admins/locations", {
      method: "POST",
      body: formData,
      ...requestOptions,
    })
      .catch((error) => {
        setErrorMessage(error.data?.message);
        ctx.setErrors(transformErrors(error.data));
      })
      .then((data) => {
        if (data) {
          ctx.resetForm();
          pushNotification({
            type: "success",
            text: "Destinations created successfully",
          });
          options.callback?.();
        }
      });

    loading.value = false;
  }

  const updateDestinations = async (ctx: SubmissionContext) => {
    const formData = new FormData();
    loading.value = true;

    for (const item in dataForm.value) {
      // @ts-ignore
      const objectItem = dataForm.value[item];
      formData.append(item, objectItem);
    }

    await $fetch<CommonResponse<{ message: string }>>(
      `/admins/locations/${selectedDestinations.value?.slug}?_method=PUT`,
      {
        method: "POST",
        body: formData,
        ...requestOptions,
      }
    )
      .catch((error) => {
        setErrorMessage(error.data?.message);
        ctx.setErrors(transformErrors(error.data));
      })
      .then((data) => {
        if (data) {
          ctx.resetForm();
          pushNotification({
            type: "success",
            text: "Destinations updated successfully",
          });
          resetForm();
          options.callback?.();
        }
      });

    loading.value = false;
  };

  async function deleteDestinations(id: any) {
    loading.value = true;
    const { error } = await useFetch<CommonResponse<{ message: string }>>(
      `/admins/locations/${id}`,
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
        text: "Destinations deleted successfully",
      });
      options.callback?.();
    }
    loading.value = false;
  }

  return {
    selectedDestinations,
    dataForm,
    onSubmit,
    deleteDestinations,
  };
}
