<template>
    <div class="flex justify-center space-x-4">
        <button
            type="button"
            class="btn btn-outline border-zinc-400 hover:bg-zinc-200 hover:border-zinc-400"
        >
            <Icon
                name="logos:facebook"
                class="w-5 h-5"
            />
            <div>
                Facebook
            </div>
        </button>
        <button
            type="button"
            @click="$loginWithGoogle"
            :disabled="loading"
            class="btn btn-outline border-zinc-400 hover:bg-zinc-200 hover:border-zinc-400"
        >
            <Icon
                name="flat-color-icons:google"
                class="w-5 h-5"
            />
            <div>
                Google
            </div>
        </button>
        <button
            type="button"
            class="btn btn-outline border-zinc-400 hover:bg-zinc-200 hover:border-zinc-400"
        >
            <Icon
                name="basil:apple-outline"
                class="w-5 h-5"
            />
            <div>
                Apple
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">

const { $loginWithGoogle, loading } = useAuth()

</script>

<style scoped></style>