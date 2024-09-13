<template>
  <div>
    <VeeForm @submit="onSubmit">
      <div class="space-y-4 p-4 border rounded-xl">
        <UIFormMGroup name="name" label="Nama Lengkap">
          <UIFormMTextField
            v-model="dataForm.name"
            name="name"
            class="input-bordered"
            placeholder="Ketik Nama Lengkap Anda"
          />
        </UIFormMGroup>

        <UIFormMGroup name="email" label="Email">
          <UIFormMTextField
            v-model="dataForm.email"
            name="email"
            class="input-bordered"
            placeholder="Ketik Email Anda"
          />
        </UIFormMGroup>

        <UIFormMGroup name="phone" label="Nomor Telepon">
          <UIFormMTextField
            v-model="dataForm.phone"
            name="phone"
            class="input-bordered"
            placeholder="Ketik Nomor Telepon"
          />
        </UIFormMGroup>

        <UIFormMGroup name="flight_number" label="Nomor Penerbangan">
          <UIFormMTextField
            v-model="dataForm.phone"
            name="flight_number"
            class="input-bordered"
            placeholder="ex:IW-1234"
          />
        </UIFormMGroup>

        <div class="hidden">
          <button ref="btnSubmit" type="submit">submit</button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
const router = useRouter();

const store = useVehicleForm();

const { dataForm, btnSubmit } = storeToRefs(store);

function onSubmit() {
  router.push("/vehicles/checkout");
}
</script>

<style scoped></style>
