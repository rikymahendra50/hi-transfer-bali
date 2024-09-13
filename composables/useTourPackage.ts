import type { SubmissionContext } from "vee-validate";

interface Options {
  callback?: Function;
}

export default function (options: Options = {}) {
  const { requestOptions } = useRequestOptions();
  const { message, loading, alertType, transformErrors, setErrorMessage } =
    useRequestHelper();

  const runtimeConfig = useRuntimeConfig();

  const { pushNotification } = useNotification();

  const selectedTourPackage = ref();

  const dataForm = ref({
    name: undefined,
    price: undefined,
    thumbnail: undefined,
  });

  function resetForm() {
    dataForm.value = {
      name: undefined,
      price: undefined,
      thumbnail: undefined,
    };
  }

  const existingImage = computed(() => {
    return selectedTourPackage.value?.image;
  });

  function onSubmit(values: any, ctx: SubmissionContext) {
    if (selectedTourPackage.value) {
      updateTourPackage(ctx);
    } else {
      createTourPackage(ctx);
    }
  }

  async function createTourPackage(ctx: SubmissionContext) {
    if (!dataForm.value.thumbnail) {
      ctx.setErrors({
        thumbnail: "Image is required",
      });

      return;
    }

    const formData = new FormData();

    loading.value = true;

    for (const item in dataForm.value) {
      // @ts-ignore
      const objectItem = dataForm.value[item];
      formData.append(item, objectItem);
    }

    await $fetch<CommonResponse<{ message: string }>>("/admins/articles", {
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
            text: "Tour Package created successfully",
          });

          options.callback?.();
        }
      });

    loading.value = false;
  }

  const updateTourPackage = async (ctx: SubmissionContext) => {
    const formData = new FormData();
    loading.value = true;
    for (const item in dataForm.value) {
      // @ts-ignore
      const objectItem = dataForm.value[item];
      formData.append(item, objectItem);
    }

    if (!dataForm.value.thumbnail) {
      formData.delete("thumbnail");
    }

    await $fetch<CommonResponse<{ message: string }>>(
      `/admins/articles/${selectedTourPackage.value?.slug}?_method=PUT`,
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
            text: "Tour Package updated successfully",
          });
          resetForm();
          options.callback?.();
        }
      });

    loading.value = false;
  };

  async function deleteTourPackage() {
    loading.value = true;
    const { error } = await useFetch<CommonResponse<{ message: string }>>(
      `/admins/articles/${selectedTourPackage.value?.slug}`,
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
        text: "Tour Package deleted successfully",
      });
      options.callback?.();
    }
    loading.value = false;
  }

  async function imageTourPackageUpload(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    loading.value = true;

    const { data, error } = await useFetch<CommonResponse<{ image: string }>>(
      "/admins/article-images",
      {
        method: "POST",
        body: formData,
        ...requestOptions,
      }
    );

    if (error.value) {
      pushNotification({
        type: "error",
        text:
          error.value?.data?.message ??
          "Something went wrong when upload image",
      });
      return "";
    }

    loading.value = false;
    return `${runtimeConfig.public.API_ENDPOINT}/${data.value?.data?.image}`;
  }

  return {
    selectedTourPackage,
    dataForm,
    onSubmit,
    existingImage,
    message,
    loading,
    alertType,
    deleteTourPackage,
    imageTourPackageUpload,
  };
}
