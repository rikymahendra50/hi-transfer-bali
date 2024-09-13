<template>
  <div>
    <VeeForm @submit="onSubmit">
      <div class="border rounded-xl grid grid-cols-1 divide-y">
        <div class="p-4" v-for="(n, i) in 3" :key="i">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <UIFormMGroup name="name" label="Nama Lengkap">
              <UIFormMTextField
                v-model="dataForm.name"
                name="name"
                class="input-bordered"
                placeholder="ex:John Doe"
              />
            </UIFormMGroup>

            <UIFormMGroup name="nationality" label="Kebangsaan">
              <UIFormMSelect
                v-model="dataForm.email"
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
                v-model="dataForm.email"
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
