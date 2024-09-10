<template>
    <div>
        <div class="">
            <div class="px-6 h-24 border-b flex flex-row items-center">

                <NuxtLink
                    class="link link-primary-dark-full link-hover  p-1 underline-offset-8 decoration-4  rounded"
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

                        <div
                            class=" p-4 flex-grow flex-shrink h-full space-y-8 max-h-screen overflow-y-auto scrollbar-thin scroll-smooth">

                            <div
                                class="space-y-2"
                                v-for="link in links"
                                :key="link.title"
                            >
                                <h4 class="font-semibold text-zinc-400">{{ link.title }}</h4>
                                <ul class="space-y-2 lg:space-y-3.5">
                                    <li
                                        v-for="itemChild in link.links"
                                        :key="itemChild.to"
                                    >
                                        <NuxtLink
                                            :to="itemChild.to"
                                            class="inline-flex  ring-1 ring-zinc-300 ring-offset-1 items-center space-x-2.5 hover:bg-primary-dark-full hover:ring-primary-dark-full text-zinc-400 hover:text-white transition-all duration-500 p-3 rounded-lg group w-full hover:scale-x-95 text-sm"
                                            active-class="bg-primary !text-white !ring-primary"
                                            exact-active-class="bg-primary-dark-full !text-white !ring-primary-dark-full"
                                        >
                                            <Icon
                                                :name="itemChild.icon"
                                                class="h-5 w-5 opacity-80"
                                            />
                                            <span class="text-sm">
                                                {{ itemChild.label }}
                                            </span>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
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
                    <slot />
                </main>
                <UINotification />

            </div>

        </div>
        <ClientOnly>
            <Toaster
                position="top-right"
                richColors
            />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, onClickOutside } from '@vueuse/core'

interface LinkItem {
    title?: string,
    links: {
        to: string,
        label: string,
        icon: string
    }[]
}

const links = ref<LinkItem[]>([
    {
        title: "Orders",
        links: [
            {
                to: "/admin",
                label: "Orders",
                icon: "bx:list-ol"
            }
        ]
    }, {
        title: "Products",
        links: [
            {
                to: "/admin/transport",
                label: "Transport",
                icon: "ic:round-directions-car"
            },

            {
                to: "/admin/tours",
                label: "Tour Activities",
                icon: "icon-park-outline:beach-umbrella"
            }
        ]
    }, {
        title: "Locations",
        links: [
            {
                to: "/admin/locations",
                label: "Locations",
                icon: "ph:map-pin-line"
            },


        ]
    },

    {
        title: "Promo",
        links: [
            {
                to: "/admin/promo",
                label: "Promo",
                icon: "heroicons:receipt-percent"
            },
        ]
    },

    {
        title: "Others",
        links: [
            {
                to: "/admin/blog",
                label: "Blog",
                icon: "heroicons:newspaper"
            },
        ]
    },


    {
        title: "Users",
        links: [
            {
                to: "/admin/users",
                label: "Users",
                icon: "i-heroicons-user-group"
            },
            {
                to: "/admin/users/admins",
                label: "Admins",
                icon: "i-heroicons-user-group"
            },
        ]
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