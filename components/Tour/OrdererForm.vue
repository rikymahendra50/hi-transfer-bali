<template>
    <div>
        <VeeForm @submit="onSubmit">
            <div class="grid grid-cols-1 lg:grid-cols-3 p-4 gap-4 border rounded-xl">
                <UIFormMGroup
                    name="name"
                    label="Nama Lengkap"
                >
                    <UIFormMTextField
                        v-model="dataForm.name"
                        name="name"
                        class="input-bordered"
                        placeholder="ex:John Doe"
                    />
                </UIFormMGroup>

                <UIFormMGroup
                    name="email"
                    label="Email"
                >
                    <UIFormMTextField
                        v-model="dataForm.email"
                        name="email"
                        class="input-bordered"
                        placeholder="ex:myemail@gmail.com"
                    />
                </UIFormMGroup>

                <UIFormMGroup
                    name="phone"
                    label="Phone"
                >
                    <UIFormMTextField
                        v-model="dataForm.phone"
                        name="phone"
                        class="input-bordered"
                        placeholder="ex:081234567890"
                    />
                </UIFormMGroup>
                <div class="hidden">
                    <button
                        ref="btnSubmit"
                        type="submit"
                    >submit</button>
                </div>
            </div>
        </VeeForm>
    </div>
</template>

<script setup lang="ts">

import { storeToRefs } from "pinia"
const router = useRouter()

const store = useVehicleForm()

const { dataForm, btnSubmit } = storeToRefs(store)

function onSubmit() {
    router.push('/vehicles/checkout')
}

</script>

<style scoped></style>