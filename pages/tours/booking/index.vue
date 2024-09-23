<template>
  <div class="flex flex-col space-y-6">
    <div class="flex justify-between items-center">
      <div class="text-2xl font-semibold">{{ $t("data-pemesan") }}</div>
    </div>
    <div class="space-y-4">
      <TourOrdererForm
        :name="dataFormT.name"
        :email="dataFormT.email"
        :phone="dataFormT.phone"
        @update:name="dataFormT.name = $event"
        @update:email="dataFormT.email = $event"
        @update:phone="dataFormT.phone = $event"
      />
    </div>
    <div class="flex justify-between items-center">
      <div class="text-2xl font-semibold">{{ $t("data-peserta") }}</div>
    </div>
    <div class="space-y-4">
      <TourParticipantForm />
    </div>
  </div>
</template>

<script setup>
const { $isLoggedIn, $isUser, $logout } = useAuth();
const { requestOptions } = useRequestOptions();

const {
  dataForm,
  submitForm,
  saveFormData,
  showSavedTourData,
  clearSavedTourData,
} = useTourStore({
  callback: () => {
    alert("Form has been submitted!");
  },
});

const dataFormT = ref({
  name: undefined,
  email: undefined,
  phone: undefined,
});

const filter = ref({
  sort: "",
});

onMounted(async () => {
  if ($isUser.value) {
    const {
      data: userProfile,
      error: errorUsers,
      refresh: refreshUsers,
    } = await useAsyncData("userProfile1", () =>
      $fetch(`/users/profile`, {
        headers: {
          Accept: "application/json",
        },
        method: "get",
        ...requestOptions,
      })
    );

    if (userProfile.value && userProfile.value.data) {
      dataFormT.value.name = `${userProfile.value.data?.first_name} ${userProfile.value.data?.last_name}`;
      dataFormT.value.email = userProfile.value.data?.email;
      dataFormT.value.phone = userProfile.value.data?.phone;
    }
  }
  showSavedTourData();
});
</script>
