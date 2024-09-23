interface Options {
  callback?: Function;
}

import type { SubmissionContext } from "vee-validate";

export default function (options: Options = {}) {
  const { requestOptions } = useRequestOptions();

  const { loading, message, alertType, setErrorMessage, transformErrors } =
    useRequestHelper();

  const { pushNotification } = useNotification();

  const selectedDriver = ref();

  const dataForm = ref({
    name: undefined,
    phone: undefined,
    driver: undefined,
  });

  function resetForm() {
    dataForm.value = {
      name: undefined,
      phone: undefined,
      driver: undefined,
    };
  }

  function onSubmit(values: any, ctx: SubmissionContext) {
    if (selectedDriver.value) {
      updateDriver(ctx);
    } else {
      createDriver(ctx);
    }
  }

  async function createDriver(ctx: SubmissionContext) {
    const formData = new FormData();

    loading.value = true;

    for (const item in dataForm.value) {
      // @ts-ignore
      const objectItem = dataForm.value[item];
      formData.append(item, objectItem);
    }

    await $fetch<CommonResponse<{ message: string }>>("/admins/drivers", {
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
            text: "Driver created successfully",
          });
          options.callback?.();
        }
      });

    loading.value = false;
  }

  const updateDriver = async (ctx: SubmissionContext) => {
    const formData = new FormData();
    loading.value = true;

    for (const item in dataForm.value) {
      // @ts-ignore
      const objectItem = dataForm.value[item];
      formData.append(item, objectItem);
    }

    await $fetch<CommonResponse<{ message: string }>>(
      `/admins/drivers/${selectedDriver.value?.id}?_method=PUT`,
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
            text: "Driver updated successfully",
          });
          resetForm();
          options.callback?.();
        }
      });

    loading.value = false;
  };

  async function deleteDriver(id: any) {
    loading.value = true;
    const { error } = await useFetch<CommonResponse<{ message: string }>>(
      `/admins/drivers/${id}`,
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
        text: "Driver deleted successfully",
      });
      options.callback?.();
    }
    loading.value = false;
  }

  return {
    selectedDriver,
    dataForm,
    onSubmit,
    deleteDriver,
    loading,
  };
}
