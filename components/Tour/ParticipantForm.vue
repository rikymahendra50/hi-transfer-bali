<template>
  <div>
    <VeeForm @submit="onSubmit">
      <div class="border rounded-xl grid grid-cols-1 divide-y">
        <div class="p-4" v-for="(n, i) in 3" :key="i">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <UIFormMGroup name="name" label="Nama Lengkap">
              <UIFormMTextField
                v-model="dataFormT.name"
                name="name"
                class="input-bordered"
                placeholder="ex:John Doe"
              />
            </UIFormMGroup>

            <UIFormMGroup name="nationality" label="Kebangsaan">
              <UIFormMSelect
                v-model="dataFormT.email"
                name="email"
                class="input-bordered"
                placeholder="ex: Indonesia"
              >
                <option value="">Pilih Kebangsaan</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Singapura">Singapura</option>
              </UIFormMSelect>
            </UIFormMGroup>

            <UIFormMGroup name="category" label="Kategori">
              <UIFormMSelect
                v-model="dataFormT.email"
                name="category"
                class="input-bordered"
                placeholder="ex: Dewasa"
              >
                <option value="">Kategori</option>
                <option value="dewasa">Dewasa</option>
                <option value="anak">Anak</option>
              </UIFormMSelect>
            </UIFormMGroup>
            <div class="hidden">
              <button ref="btnSubmit" type="submit">submit</button>
            </div>
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
useHead({
  title: "Booking Detail",
});

const filter = ref({
  sort: "",
});

const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const { locale, t: $t } = useI18n();
const { $isLoggedIn, $isUser, $logout } = useAuth();

const selectedDistance = ref("");
const selectedPassenger = ref("");

// useHead({
//   title: "Vehicle",
// });

const dataFormT = ref({
  user_uuid: undefined,
  name: undefined,
  email: undefined,
  phone: undefined,
});

// const {
//   dataForm,
//   submitForm,
//   saveFormData,
//   showSavedTourData,
//   clearSavedTourData,
// } = useTourStore({
//   callback: () => {
//     alert("Form has been submitted!");
//   },
// });

// const tourForm = ref(null);

// const dataFormT = ref({
//   user_uuid: undefined,
//   name: undefined,
//   email: undefined,
//   phone: undefined,
// });

// function onSubmit() {
//   tourForm.value.$refs.internalSubmit.click();

//   dataForm.value.user_uuid = dataFormT.value.user_uuid;
//   dataForm.value.name = dataFormT.value.name;
//   dataForm.value.email = dataFormT.value.email;
//   dataForm.value.phone = dataFormT.value.phone;

//   console.log("ini di booking", dataForm.value);

//   saveFormData();

//   router.push("/tours/booking/checkout");
// }

// onMounted(async () => {
//   if ($isUser.value) {
//     await fetchUserData();
//   }

//   showSavedTourData();

//   console.log("ini dari booking", dataForm.value);
// });

// const fetchUserData = async (ctx) => {
//   await $fetch(`/users/profile`, {
//     headers: {
//       Accept: "application/json",
//     },
//     method: "get",
//     ...requestOptions,
//   })
//     .catch((error) => {
//       console.error("User profile data is missing or incomplete");
//     })
//     .then((data) => {
//       dataFormT.value.name = `${data?.data?.first_name} ${data.data?.last_name}`;
//       dataFormT.value.email = data?.data?.email;
//       dataFormT.value.phone = data?.data?.phone;
//       dataFormT.value.user_uuid = data?.data?.uuid;
//     });
// };

// function goToHomePage() {
//   clearSavedTourData();
//   router.push({ path: "/?tours" });
// }

// function onSubmit() {
//   router.push("/vehicles/checkout");
// }
</script>

<style scoped></style>
