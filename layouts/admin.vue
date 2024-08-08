<template>
    <div>
        <div class="">
            <div class="px-6 h-24 border-b flex flex-row items-center">

                <NuxtLink
                    class="link link-primary link-hover  p-1 underline-offset-8 decoration-4  rounded"
                    active-class="font-medium"
                    to="/admin"
                >
                    <img
                        src="/hi-transfer-logo.png"
                        alt="logo"
                        class=" w-11 h-11"
                    >
                </NuxtLink>
                <button
                    class="block lg:hidden"
                    @click="toggleDrawer"
                    v-if="!drawer"
                    type="button"
                >
                    <Icon
                        name="i-heroicons-bars-3"
                        class="w-6 h-6 opacity-50"
                    />
                </button>
            </div>
        </div>
        <div class="relative lg:static lg:grid lg:grid-cols-[300px_1fr]">
            <Transition
                enter-from-class="opacity-50"
                enter-to-class="transition-all duration-300 opacity-100"
                leave-from-class="transition-all duration-300 opacity-50 -translate-x-40"
                leave-to-class="opacity-0"
            >
                <aside
                    ref="aside"
                    class="absolute lg:static z-50 lg:z-0  min-h-screen  w-[300px] border-r bg-white  "
                    v-if="drawer"
                >
                    <div class="flex flex-col h-full ">

                        <div class=" p-4 flex-grow flex-shrink h-full ">
                            <ul class="space-y-3 lg:space-y-3.5">
                                <li
                                    v-for="item in linksAllowed"
                                    :key="item.to"
                                >
                                    <NuxtLink
                                        :to="item.to"
                                        class="inline-flex  ring-1 ring-primary ring-offset-1 items-center space-x-2.5 hover:bg-primary text-secondary hover:text-white transition-all duration-500 p-2 rounded-lg group w-full hover:scale-x-95 text-sm"
                                        active-class="bg-primary !text-white"
                                    >
                                        <Icon
                                            :name="item.icon"
                                            class="h-5 w-5 opacity-80"
                                        />
                                        <span class="text-sm">
                                            {{ item.label }}
                                        </span>
                                    </NuxtLink>
                                </li>
                            </ul>

                        </div>

                        <div class="  mb-16 px-4 mt-10">
                            <div class="border-t py-2 ">
                                <button
                                    type="button"
                                    @click="$logout"
                                    class="flex flex-row space-x-2 items-center text-red-500 font-medium"
                                >
                                    <Icon
                                        name="ic:baseline-logout"
                                        class="w-6 h-6"
                                    />
                                    <span>Logout</span>
                                </button>
                            </div>

                        </div>
                    </div>

                </aside>
            </Transition>

            <div class=" w-full absolute lg:static min-h-svh  overflow-y-auto space-y-6">

                <main>
                    <div class="p-4 lg:p-8">
                        <slot />
                    </div>
                </main>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, onClickOutside } from '@vueuse/core'

const linksAllowed = ref<{
    to: string,
    icon: string,
    label: string
}[]>([
    {
        to: '/admin',
        icon: 'i-heroicons-home',
        label: 'Dashboard'
    }, {
        to: '/admin/vehicles',
        icon: 'i-heroicons-truck',
        label: 'Vehicles'
    }, {
        to: '/admin/tours',
        icon: 'i-heroicons-calendar',
        label: 'Tours'
    }
])

const breakpoints = useBreakpoints(breakpointsTailwind)

const { $logout, $user } = useAuth()

const drawer = ref(true)

const tableOrLaptop = breakpoints.greater('md')

const aside = ref()


onClickOutside(aside, () => {
    if (!tableOrLaptop.value && drawer.value) drawer.value = false
})

const toggleDrawer = () => {
    drawer.value = !drawer.value
}

watch(() => tableOrLaptop.value, (value) => {
    if (value && !drawer.value) {
        drawer.value = tableOrLaptop.value
    }
})


</script>

<style lang="scss" scoped></style>