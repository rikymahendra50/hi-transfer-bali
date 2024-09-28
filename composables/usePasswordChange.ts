export default function (userBy: "user" | "admin") {
  const { loading, message, alertType, setErrorMessage, transformErrors } =
    useRequestHelper();
  const { requestOptions } = useRequestOptions();
  const { pushNotification } = useNotification();
  const { $user } = useAuth();

  const { t: $t, locale } = useI18n();

  const dataForm = ref({
    old_password: "",
    password: "",
    confirm_password: "",
  });

  const updateURL = computed(() => {
    if (userBy == "user") {
      return `/users/${$user.value.uuid}/change-password`;
    }
    return "/admins/change-password?lang=" + locale.value;
  });

  function resetForm() {
    dataForm.value = {
      old_password: "",
      password: "",
      confirm_password: "",
    };
  }

  const isPasswordSetted = computed(() => {
    return $user.value?.is_password_setted;
  });

  async function updatePassword(values: any, ctx: any) {
    loading.value = true;

    const object: {
      old_password?: string;
      password: string;
      confirm_password: string;
    } = {
      old_password: dataForm.value.old_password,
      password: dataForm.value.password,
      confirm_password: dataForm.value.confirm_password,
    };

    if (isPasswordSetted.value) {
      object.old_password = dataForm.value.old_password;
    }

    const { data, error } = await useFetch<{ data: { message: string } }>(
      updateURL.value,
      {
        method: "POST",
        body: { ...object },
        ...requestOptions,
      }
    );

    if (error.value) {
      setErrorMessage(error.value?.data?.message);
      ctx.setErrors(transformErrors(error.value?.data));
    } else {
      pushNotification({
        type: "success",
        text: data.value?.data?.message ?? $t("password_has_been_change_txt"),
      });

      ctx.resetForm();
      resetForm();
    }
    loading.value = false;
  }

  return {
    dataForm,
    updatePassword,
    message,
    alertType,
    loading,
    isPasswordSetted,
  };
}
