<!-- <template>
  <div class="flex pt-5 pl-6 flex-col gap-2">
    <p class="text-[#8C8C8C] text-[14px] uppercase font-medium">
      Informasi Pribadi
    </p>
    <div class="flex items-center gap-3 mt-1">
      <img
        :src="
          dataProfileForm.profile_picture
            ? dataProfileForm.profile_picture
            : 'https://placehold.co/90'
        "
        alt="placeholder"
        class="rounded-full max-w-[90px]"
      />

      <div class="flex justify-start flex-col gap-2">
        <div class="btn w-fit bg-primary text-white">
          <span>Unggah</span>
        </div>

        <p class="text-[#8C8C8C] text-[12px]">
          Dimensi yang disarankan: 200x200px. Ukuran file maks.: 1 MB
        </p>
      </div>
    </div>

    <VeeForm
      @submit="onSubmit"
      :validation-schema="profileSchema"
      class="w-[50%]"
    >
      <UIFormTextFieldWLabel
        label="Nama pertama"
        name="name"
        placeholder="Input nama pertama"
        v-model="dataProfileForm.first_name"
        class="input-bordered shadow-sm focus:outline-none"
        :useStarIcon="false"
      />

      <UIFormTextFieldWLabel
        label="Nama terakhir"
        name="name"
        placeholder="Input nama terakhir"
        v-model="dataProfileForm.last_name"
        class="input-bordered shadow-sm focus:outline-none"
        :useStarIcon="false"
      />

      <UIFormTextFieldWLabel
        label="Email"
        name="email"
        placeholder="Email"
        v-model="dataProfileForm.email"
        class="input-bordered shadow-sm focus:outline-none"
        :useStarIcon="false"
      />
      <button
        type="submit"
        class="btn bg-primary text-white normal-case !font-medium text-base hover:bg-primary mt-4 w-full"
      >
        Pembarui profil
      </button>
    </VeeForm>
    <VeeForm
      class="mt-4 w-[50%]"
      @submit="onSubmit"
      :validation-schema="updatePasswordSchema"
    >
      <p class="text-[#8C8C8C] text-[14px] uppercase font-medium">KATA SANDI</p>
      <UIFormTextFieldWLabel
        label="Password Lama"
        name="old_password"
        placeholder="Password"
        v-model="dataPassword.old_password"
        type="password"
        class="input-bordered shadow-sm focus:outline-none"
        :useStarIcon="false"
      />
      <UIFormTextFieldWLabel
        label="Password Baru"
        name="new_password"
        placeholder="Password Baru"
        v-model="dataPassword.new_password"
        type="password"
        class="input-bordered shadow-sm focus:outline-none"
        :useStarIcon="false"
      />
      <UIFormTextFieldWLabel
        label="Password Baru"
        name="confirm_password"
        placeholder="Confirm Password"
        v-model="dataPassword.confirm_password"
        type="password"
        class="input-bordered shadow-sm focus:outline-none"
        :useStarIcon="false"
      />
      <button
        type="submit"
        class="btn bg-primary text-white normal-case !font-medium text-base hover:bg-primary mt-4 w-full"
      >
        Pembarui kata sandi
      </button>
    </VeeForm>
  </div>

</template>

<script setup>
const { transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();
const { profileSchema, updatePasswordSchema } = useSchema();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Profile Admin",
});

const { data } = await useAsyncData("profile", () =>
  $fetch(`/admins/profile`, {
    method: "GET",
    ...requestOptions,
  })
);

const dataProfileForm = ref({
  first_name: data.value.data?.first_name,
  last_name: data.value.data?.last_name,
  email: data.value.data?.email,
  profile_picture: data.value.data?.profile_picture,
});

const dataPassword = ref({
  old_password: undefined,
  new_password: undefined,
  confirm_password: undefined,
});

function onSubmit() {
  console.log("test");
}
</script> -->

<template>
  <div>
    <div class="max-w-xl space-y-8 p-4">
      <UIFormProfile @reload="$fetchAuthProfile()" used-by="admin" />
      <UIFormChangePassword used-by="admin" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { $fetchAuthProfile } = useAuth();
useHead({
  title: "Admin",
});
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});
</script>

<style scoped></style>
