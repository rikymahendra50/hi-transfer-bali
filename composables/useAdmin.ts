import type { SubmissionContext } from "vee-validate";

interface Options {
  callback?: Function;
}

export default function (options: Options) {
  const { t: $t } = useI18n();

  const { requestOptions } = useRequestOptions();
  const { message, loading, setErrorMessage, alertType, transformErrors } =
    useRequestHelper();
  const { pushNotification } = useNotification();

  const selectedItem = ref<AuthUser>();

  const adminFeature = ref<AdminFeature[]>([]);

  const dataForm = ref<FormAdmin>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    is_active: 1,
    password: "",
    confirm_password: "",
    permissions: [
      {
        feature_id: "",
        type: "",
      },
    ],
  });

  const allFeaturesSelected = computed(() => {
    return dataForm.value.permissions.map((el) => el.feature_id);
  });

  const isEditMode = computed(() => {
    return !!selectedItem.value;
  });

  function resetForm() {
    dataForm.value = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      is_active: 1,
      permissions: [
        {
          feature_id: "",
          type: "",
        },
      ],
    };
  }

  function addMorePermission() {
    dataForm.value.permissions.push({
      feature_id: "",
      type: "",
    });
  }

  function removePermission(index: number) {
    dataForm.value.permissions.splice(index, 1);
  }

  function onSubmit(values: any, ctx: SubmissionContext) {
    if (selectedItem.value) {
      updateAdmin(ctx);
    } else {
      createAdmin(ctx);
    }
  }

  async function createAdmin(ctx: SubmissionContext) {
    loading.value = true;

    const { error } = await useFetch<CommonResponse<{ message: string }>>(
      `/admins`,
      {
        method: "POST",
        body: { ...dataForm.value },
        ...requestOptions,
      }
    );

    if (error.value) {
      setErrorMessage(error.value?.data?.message ?? "Error");
      ctx.setErrors(transformErrors(error.value?.data));
    } else {
      pushNotification({
        type: "success",
        text: "Success",
      });
      resetForm();
      options.callback?.();
    }

    loading.value = false;
  }

  async function updateAdmin(ctx: SubmissionContext) {
    loading.value = true;

    const { error } = await useFetch<CommonResponse<{ message: string }>>(
      `/admins/${selectedItem.value?.uuid}?_method=PUT`,
      {
        method: "POST",
        body: { ...dataForm.value },
        ...requestOptions,
      }
    );

    if (error.value) {
      setErrorMessage(error.value?.data?.message);
      ctx.setErrors(transformErrors(error.value?.data));
    } else {
      pushNotification({
        type: "success",
        text: "User updated successfully",
      });
      resetForm();
      options.callback?.();
    }

    loading.value = false;
  }

  async function getListAdminFeatures() {
    const { data } = await useFetch<CommonResponse<AdminFeature[]>>(
      "/admins/admin-features",
      {
        method: "GET",
        ...requestOptions,
      }
    );

    adminFeature.value = data.value?.data ?? [];
  }

  onMounted(async () => {
    await getListAdminFeatures();
  });

  return {
    dataForm,
    selectedItem,
    message,
    alertType,
    loading,
    adminFeature,
    isEditMode,
    allFeaturesSelected,
    addMorePermission,
    removePermission,
    onSubmit,
  };
}
