<template>
  <UIContainer class="pb-10">
    <VeeForm :validation-schema="schema" @submit="onSubmit">
      <div class="space-y-3">
        <UIFormMGroup name="first_name" :label="$t('fist-name')">
          <UIFormMTextField
            v-model="dataForm.first_name"
            name="first_name"
            placeholder="ex: google account"
          />
          <template #description>
            <p>{{ $t("masukan-nama-pertama") }}</p>
          </template>
        </UIFormMGroup>

        <UIFormMGroup name="last_name" label="Last Name">
          <UIFormMTextField
            v-model="dataForm.last_name"
            name="last_name"
            placeholder="ex: google account"
          />
        </UIFormMGroup>

        <UIFormMGroup name="address" label="Address">
          <UIFormMTextarea
            name="address"
            placeholder="ex: google account"
            v-model="dataForm.address"
          />
        </UIFormMGroup>

        <UIFormMGroup name="email" label="Email">
          <UIFormMTextField
            v-model="dataForm.email"
            name="email"
            placeholder="ex: google account"
          >
            <template #leftSection>
              <Icon name="i-heroicons-envelope" />
            </template>
          </UIFormMTextField>
        </UIFormMGroup>
        <UIFormMGroup name="gender" label="Gender">
          <UIFormMSelect
            name="gender"
            v-model="dataForm.gender"
            placeholder="Select gender"
          >
            <option value="" selected disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </UIFormMSelect>
        </UIFormMGroup>

        <UIFormMGroup name="password" label="Password">
          <UIFormMTextField
            v-model="dataForm.password"
            name="password"
            placeholder="*********"
            type="password"
          >
            <template #leftSection>
              <Icon name="i-heroicons-key" />
            </template>
            <template #rightSection>
              <Icon name="i-heroicons-eye" />
            </template>
          </UIFormMTextField>
        </UIFormMGroup>
        <UIFormMGroup name="confirm_password" label="Confirm Password">
          <UIFormMTextField
            v-model="dataForm.confirm_password"
            name="confirm_password"
            placeholder="*********"
            type="password"
          >
            <template #leftSection>
              <Icon name="i-heroicons-key" />
            </template>
            <template #rightSection>
              <Icon name="i-heroicons-eye" />
            </template>
          </UIFormMTextField>
        </UIFormMGroup>

        <UIFormMGroup name="job" label="Job">
          <div class="flex flex-col space-y-1 py-2">
            <UIFormRadio
              v-model="dataForm.job"
              name="job"
              value="frontend"
              label="Frontend"
              variant="primary"
            />
            <UIFormRadio
              v-model="dataForm.job"
              name="job"
              value="Backend"
              label="Backend"
              variant="primary"
            />
          </div>
        </UIFormMGroup>
        <UIFormMGroup name="hobby" label="Hobby">
          <div class="flex flex-col space-y-1 py-2">
            <UIFormCheckbox
              v-model="dataForm.hobby"
              name="hobby"
              value="music"
              label="Music"
              variant="primary"
            />
            <UIFormCheckbox
              v-model="dataForm.hobby"
              name="hobby"
              value="gaming"
              label="Gaming"
              variant="primary"
            />
          </div>
        </UIFormMGroup>

        <UIBtn type="submit" variant="primary" class="text-white">Submit</UIBtn>
      </div>
    </VeeForm>
  </UIContainer>
</template>

<script setup lang="ts">
import z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
const { locale, t: $t } = useI18n();

const dataForm = ref({
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  address: "",
  password: "",
  confirm_password: "",
  job: "",
  hobby: [],
});

const schema = toTypedSchema(
  z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    gender: z.string().min(1, "Gender is required"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(7, "Password should be at least 7 characters")
      .max(50, "Password should be at most 50 characters"),
    confirm_password: z
      .string()
      .min(7, "Confirm Password should be at least 7 characters")
      .max(50, "Confirm Password should be at most 50 characters"),
  })
);

function onSubmit() {
  console.log(dataForm.value);
}
useHead({
  title: "DaisyUI Example",
});
</script>

<style lang="scss" scoped></style>
