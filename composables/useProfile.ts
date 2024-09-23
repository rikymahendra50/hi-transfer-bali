export default function (usedBy: "user" | "admin", callback: Function) {
  const { $user, $fetchAuthProfile } = useAuth();
  const { requestOptions } = useRequestOptions();
  const { pushNotification } = useNotification();

  const { loading, message, alertType, setErrorMessage, transformErrors } =
    useRequestHelper();

  const { t: $t, locale } = useI18n();

  const dataForm = ref<{
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    profile_picture: File | undefined;
    is_profile_picture_deleted: 0 | 1;
  }>({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    profile_picture: undefined,
    is_profile_picture_deleted: 0,
  });

  const updateURL = computed(() => {
    if (usedBy == "user") {
      return "/users/profile?lang=" + locale.value;
    }
    return "/admins/profile?lang=" + locale.value;
  });

  const currentUserProfile = computed(() => {
    return $user.value?.profile_picture ?? "";
  });

  async function updateProfile(values: any, ctx: any) {
    const formData = new FormData();
    const object = { ...dataForm.value };

    for (const item in object) {
      // @ts-ignore
      const objectItem = object[item];
      formData.append(item, objectItem);
    }
    if (!dataForm.value.profile_picture) {
      formData.delete("profile_picture");
    }

    loading.value = true;

    const { data, error } = await useFetch<{ data: { message: string } }>(
      `${updateURL.value}&_method=PUT`,
      {
        method: "POST",
        body: formData,
        ...requestOptions,
      }
    );

    if (error.value) {
      setErrorMessage(error.value?.data?.message);
      ctx.setErrors(transformErrors(error.value?.data));
    } else {
      pushNotification({
        type: "success",
        text: "Success update profil",
        title: "Success",
      });
      await $fetchAuthProfile();
      callback();
    }
    loading.value = false;
  }

  onMounted(() => {
    dataForm.value.first_name = $user.value?.first_name as string;
    dataForm.value.last_name = $user.value?.last_name as string;
    dataForm.value.email = $user.value?.email as string;
    dataForm.value.phone = $user.value?.phone as string;
  });

  return {
    dataForm,
    updateProfile,
    message,
    alertType,
    loading,
    currentUserProfile,
  };
}
