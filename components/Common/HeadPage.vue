<template>
    <div class="p-4 border-b flex justify-between items-center">
        <div>
            <div v-if="props.link">
                <NuxtLink
                    :to="link"
                    class="inline-flex gap-2"
                >
                    <Icon
                        name="i-heroicons-arrow-left"
                        class="w-4 h-4 opacity-50"
                    />
                    <div>
                        {{ props.title }}
                    </div>
                </NuxtLink>
            </div>
            <div v-else>{{ props.title }}</div>
            <div class="text-sm opacity-80">
                {{ props.description }}
            </div>
        </div>
        <div>

            <slot />
        </div>

    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    title?: string,
    description?: string
    link?: string
}>(), {
    title: "title",
    description: "description"
})

</script>

<style scoped></style>