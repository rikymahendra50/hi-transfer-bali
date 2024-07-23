<script lang="ts" setup>

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
                    <div class="grid grid-cols-1 w-[450px] text-left gap-4 p-4 rounded-md ">
                        <UIAlert
                            v-model="message"
                            :type="alertType"
                        />
                        <UIFormMGroup
                            label="Email"
                            name="email"
                        >
                            <UIFormMTextField
                                name="email"
                                v-model="$credentialForm.email"
                                class="input-bordered"
                                placeholder="ex:myemail@gmail.com"
                            />
                        </UIFormMGroup>
                        <UIFormMGroup
                            label="Password"
                            name="password"
                        >
                            <UIFormMTextField
                                name="password"
                                v-model="$credentialForm.password"
                                type="password"
                                class="input-bordered"
                                placeholder="********"
                            />
                        </UIFormMGroup>
                        <div>
                            <NuxtLink
                                class="link link-hover text-xs opacity-50"
                                to="/admin/forgot-password"
                            >Forgot password?</NuxtLink>
                        </div>
                        <div>

                            <UIBtn
                                type="submit"
                                :disabled="loading"
                                :loading="loading"
                                variant="primary"
                                class="w-full"
                            >Submit</UIBtn>


                        </div>
                    </div>
                </VeeForm>
            </div>
        </div>
    </div>
</template>



<style></style>
