interface Options {
  callback?: Function;
}

import type { SubmissionContext } from "vee-validate";

export default function (options: Options = {}) {
  const { requestOptions } = useRequestOptions();

  const { loading, message, alertType, setErrorMessage, transformErrors } =
    useRequestHelper();

  const { pushNotification } = useNotification();

  const selectedTransport = ref();

  const dataForm = ref({
    name: undefined,
    is_active: undefined,
    price: undefined,
    max_person: undefined,
    image: undefined,
    facilities: [],
  });

  function resetForm() {
    dataForm.value = {
      name: undefined,
      is_active: undefined,
      price: undefined,
      max_person: undefined,
      image: undefined,
      facilities: [],
    };
  }

  const existingImage = computed(() => {
    return selectedTransport.value?.image;
  });

  function onSubmit(values: any, ctx: SubmissionContext) {
    if (selectedTransport.value) {
      updateTransport(ctx);
    } else {
      createTransport(ctx);
    }
  }

  async function createTransport(ctx: SubmissionContext) {
    if (!dataForm.value.image) {
      ctx.setErrors({
        image: "Image is required",
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

    await $fetch<CommonResponse<{ message: string }>>("/admins/cars", {
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
            text: "Transport created successfully",
          });
          options.callback?.();
        }
      });

    loading.value = false;
  }

  const updateTransport = async (ctx: SubmissionContext) => {
    const formData = new FormData();
    loading.value = true;

    for (const item in dataForm.value) {
      // @ts-ignore
      const objectItem = dataForm.value[item];
      formData.append(item, objectItem);
    }

    if (!dataForm.value.image) {
      formData.delete("image");
    }

    await $fetch<CommonResponse<{ message: string }>>(
      `/admins/cars/${selectedTransport.value?.slug}?_method=PUT`,
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
            text: "Transport updated successfully",
          });
          resetForm();
          options.callback?.();
        }
      });

    loading.value = false;
  };

  async function deleteTransport(slug: String) {
    loading.value = true;
    const { error } = await useFetch<CommonResponse<{ message: string }>>(
      `/admins/cars/${slug}`,
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
        text: "Transport deleted successfully",
      });
      options.callback?.();
    }
    loading.value = false;
  }

  //   async function imageBlogUpload(file: File) {
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     loading.value = true;

  //     const { data, error } = await useFetch<CommonResponse<{ image: string }>>(
  //       "/admins/article-images",
  //       {
  //         method: "POST",
  //         body: formData,
  //         ...requestOptions,
  //       }
  //     );

  //     if (error.value) {
  //       pushNotification({
  //         type: "error",
  //         text:
  //           error.value?.data?.message ??
  //           "Something went wrong when upload image",
  //       });
  //       return "";
  //     }

  //     loading.value = false;
  //     const apiDomain = getDomain(runtimeConfig.public.API_ENDPOINT);
  //     return `${apiDomain}/${data.value?.data?.image}`;
  //   }

  return {
    selectedTransport,
    dataForm,
    existingImage,
    onSubmit,
    deleteTransport,
  };
}
