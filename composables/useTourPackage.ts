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
    "description[en]": undefined,
    "description[id]": undefined,
    "meta[en]": undefined,
    "meta[id]": undefined,
    locations: [],
    max_person: undefined,
    is_varied: 0,
    variants: [],
  });

  function resetForm() {
    dataForm.value = {
      name: undefined,
      price: undefined,
      "description[en]": undefined,
      "description[id]": undefined,
      "meta[en]": undefined,
      "meta[id]": undefined,
      locations: [],
      max_person: undefined,
      is_varied: 0,
      variants: [],
    };
  }

  // const productFormVariants = computed(() => {
  //   return {
  //     name: undefined,
  //     price: undefined,
  //     "description[en]": undefined,
  //     "description[id]": undefined,
  //     "meta[en]": undefined,
  //     "meta[id]": undefined,
  //     locations: [],
  //     max_person: undefined,
  //     is_varied: 1,
  //     variants: [],
  //   };
  // });

  // const productFormNonVariants = computed(() => {
  //   return {
  //     name: undefined,
  //     price: undefined,
  //     "description[en]": undefined,
  //     "description[id]": undefined,
  //     "meta[en]": undefined,
  //     "meta[id]": undefined,
  //     locations: [],
  //     max_person: undefined,
  //     is_varied: 0,
  //   };
  // });

  const isVaried = computed(() => dataForm.value.is_varied === 1);

  // const formValues = computed(() => {
  //   if (isVaried.value) {
  //     return { ...productFormVariants.value };
  //   } else {
  //     return { ...productFormNonVariants.value };
  //   }
  // });

  function resetProductVariants() {
    dataForm.value.variants = [];
  }

  watch(isVaried, () => {
    if (isVaried.value) {
      addProductVariants();
    } else {
      resetProductVariants();
    }
  });

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
    const formData = new FormData();

    loading.value = true;

    const uniqueLocations = [...new Set(dataForm.value.locations)];

    for (const item in dataForm.value) {
      if (item === "locations") {
        uniqueLocations.forEach((location, index) => {
          formData.append(`locations[${index}]`, location);
        });
      } else {
        // @ts-ignore
        const objectItem = dataForm.value[item];
        formData.append(item, objectItem);
      }
    }

    if (dataForm.value.variants) {
      // console.log(dataForm.value.variants);
      dataForm.value.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][name]`, variant.name);
        formData.append(`variants[${index}][price]`, variant.price);
        formData.append(
          `variants[${index}][descriptions][en]`,
          variant.description.en
        );
        formData.append(
          `variants[${index}][descriptions][id]`,
          variant.description.id
        );
      });
    }

    await $fetch<CommonResponse<{ message: string }>>("/admins/tours", {
      headers: {
        Accept: "Application/json",
      },
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
      if (item === "locations") {
        dataForm.value.locations.forEach((location, index) => {
          formData.append(`locations[${index}]`, location);
        });
      } else {
        // @ts-ignore
        const objectItem = dataForm.value[item];
        formData.append(item, objectItem);
      }
    }

    if (dataForm.value.variants) {
      dataForm.value.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][name]`, variant.name);
        formData.append(`variants[${index}][price]`, variant.price);
        formData.append(
          `variants[${index}][descriptions][en]`,
          variant.description.en
        );
        formData.append(
          `variants[${index}][descriptions][id]`,
          variant.description.id
        );
      });
    }

    await $fetch<CommonResponse<{ message: string }>>(
      `/admins/tours/${selectedTourPackage.value?.slug}?_method=PUT`,
      {
        headers: {
          Accept: "Application/json",
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
            text: "Tour Package updated successfully",
          });
          resetForm();
          options.callback?.();
        }
      });

    loading.value = false;
  };

  async function deleteTourPackage(slug: String) {
    loading.value = true;
    const { error } = await useFetch<CommonResponse<{ message: string }>>(
      `/admins/tours/${slug}`,
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

  function addProductVariants() {
    if (!dataForm.value.variants) {
      dataForm.value.variants = [];
    }
    if (
      selectedTourPackage.value?.variants &&
      selectedTourPackage.value?.variants.length > 0
    ) {
      dataForm.value.variants = selectedTourPackage.value?.variants.map(
        (variant) => {
          return {
            name: variant.name,
            price: variant.price,
            description: {
              en: variant.description.find((item) => item.language === "en")
                ?.translation,
              id: variant.description.find((item) => item.language === "id")
                ?.translation,
            },
          };
        }
      );
    } else {
      dataForm.value.variants.push({
        name: "",
        price: "",
        description: {
          en: "",
          id: "",
        },
      });
    }
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
  };
}
