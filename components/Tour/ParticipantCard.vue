<template>
    <div>
        <div class="grid grid-cols-1 divide-y border rounded-xl">
            <div
                class="p-4"
                v-for="n in 3"
                :key="n"
            >
                <div class="flex flex-col lg:flex-row lg:justify-between item-center ">
                    <div class="text-lg font-semibold">
                        Silvester Wali
                    </div>
                    <div class="flex flex-row justify-between space-x-4">
                        <div class="flex flex-col space-y-1">
                            <div class="text-xs text-zinc-400">Kebangsaan</div>
                            <div>
                                Indonesia
                            </div>
                        </div>
                        <div class="flex flex-col space-y-1">
                            <div class="text-xs text-zinc-400">Kategori</div>
                            <div>
                                Dewasa
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>