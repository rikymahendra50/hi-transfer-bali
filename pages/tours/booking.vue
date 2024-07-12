<template>
    <div>
        <div class="h-28"></div>

        <UIContainer>
            <div class="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 divide-x-2">
                <div class="space-y-6 py-4">
                    <h3 class="text-2xl font-semibold text-primary-dark">
                        Pesanan Anda
                    </h3>

                    <div class="space-y-4">
                        <TourSelectedCard />
                    </div>

                </div>
                <div class="p-4">
                    <NuxtPage />
                </div>
            </div>
        </UIContainer>
        <div class="w-full border-b border-t">
            <UIContainer>
                <div class="flex justify-end w-full">
                    <div>
                        <UIBtn
                            v-if="isTourBookingPage"
                            variant="primary"
                            @click="gotoCheckout"
                            class="whitespace-nowrap"
                        >Lanjutkan</UIBtn>
                        <UIBtn
                            v-if="isTourBookingCheckoutPage"
                            variant="primary"
                            @click="gotoCheckout"
                            class="whitespace-nowrap"
                        >Pesan Dan Bayar</UIBtn>
                    </div>


                </div>
            </UIContainer>
        </div>
    </div>
</template>

<script setup lang="ts">

const route = useRoute()
const router = useRouter()

const { btnSubmitClick } = useVehicleForm()



const isTourBookingPage = computed(() => {
    return route.name === "tours-booking"
})

const isVehicleBookingPage = computed(() => {
    return route.name === "vehicles-booking"
})

const isTourBookingCheckoutPage = computed(() => {
    return route.name === "tours-booking-checkout"
})

const gotoCheckout = () => {
    router.push('/tours/booking/checkout')

}



</script>

<style scoped></style>