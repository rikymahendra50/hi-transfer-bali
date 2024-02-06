<script lang="ts" setup>

const { registerSchema } = useSchema()

const { loading, message, alertType } = useRequestHelper()

const stateForm = ref({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
})

function onSubmit(values: any, ctx: any) {
    loading.value = true;
    message.value = "hallo";
    alertType.value = "success";
    loading.value = false;
}

useHead({
    title: "Sign Up",
})
</script>
<template>
    <div class="hero min-h-screen">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-4xl font-bold mb-4">Sign Up</h1>
                <VeeForm @submit="onSubmit" :validation-schema="registerSchema">
                    <div class="grid grid-cols-1 w-[450px] text-left gap-4 p-4 rounded-md shadow">
                        <Alert v-model="message" :type="alertType" />
                        <div class="grid grid-cols-2 gap-4">
                            <FormGroup label="First Name" name="first_name">
                                <FormTextField v-model="stateForm.first_name" name="first_name" class="input-bordered"
                                    placeholder="ex:jhon" />
                            </FormGroup>
                            <FormGroup label="Last Name" name="last_name">
                                <FormTextField v-model="stateForm.last_name" name="last_name" class="input-bordered"
                                    placeholder="ex:doe" />
                            </FormGroup>
                        </div>

                        <FormGroup label="Email" name="email">
                            <FormTextField name="email" v-model="stateForm.email" class="input-bordered"
                                placeholder="ex:myemail@gmail.com" />
                        </FormGroup>

                        <FormGroup label="Password" name="password">
                            <FormTextField v-model="stateForm.password" name="password" type="password"
                                class="input-bordered" placeholder="********" />
                        </FormGroup>

                        <FormGroup label="Confirm Password" name="confirm_password">
                            <FormTextField v-model="stateForm.confirm_password" name="confirm_password" type="password"
                                class="input-bordered" placeholder="********" />
                        </FormGroup>

                        <div class="flex justify-between items-center">
                            <div>
                                <button class="btn btn-success" type="submit" :disabled="loading">Submit</button>
                            </div>
                            <div class="text-sm">
                                <p>Already have an account? <NuxtLink to="/sign-in" class="link link-hover">Sign In
                                    </NuxtLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </VeeForm>
            </div>
        </div>
    </div>
</template>
  

  
<style></style>
  