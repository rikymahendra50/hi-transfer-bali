<script
    lang="ts"
    setup
>

const { loginSchema } = useSchema()

const router = useRouter()

function redirectUserProfile() {
    router.push("/admin/profile")
}

const { loading, message, alertType, $credentialForm, $login } = useAuth({
    usedBy: "admin",
    callback: redirectUserProfile
})

useHead({
    title: "Sign In",
})


</script>

<template>
    <div class="hero min-h-screen">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-4xl font-bold mb-4">Sign In</h1>

                <VeeForm
                    @submit="$login"
                    :validation-schema="loginSchema"
                >
                    <div class="grid grid-cols-1 w-[450px] text-left gap-4 p-4 rounded-md shadow">
                        <Alert
                            v-model="message"
                            :type="alertType"
                        />
                        <FormGroup
                            label="Email"
                            name="email"
                        >
                            <FormTextField
                                name="email"
                                v-model="$credentialForm.email"
                                class="input-bordered"
                                placeholder="ex:myemail@gmail.com"
                            />
                        </FormGroup>
                        <FormGroup
                            label="Password"
                            name="password"
                        >
                            <FormTextField
                                name="password"
                                v-model="$credentialForm.password"
                                type="password"
                                class="input-bordered"
                                placeholder="********"
                            />
                        </FormGroup>
                        <div>
                            <NuxtLink
                                class="link link-hover text-sm"
                                to="/forgot-password"
                            >Forgot password?</NuxtLink>
                        </div>
                        <div class="flex justify-between items-center">
                            <div>
                                <button
                                    class="btn btn-success"
                                    type="submit"
                                    :disabled="loading"
                                >Submit</button>
                            </div>
                            <div class="text-sm">
                                <p>Don't have an account? <NuxtLink
                                        to="/sign-up"
                                        class="link link-hover"
                                    >Sign Up</NuxtLink>
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
