<template>
    <div
        :class="clsx('inline-flex items-center h-6 px-3 py-0.5 !rounded-full text-xs gap-2 bg-opacity-10 whitespace-nowrap', badgeClass)">
        <div :class="dotClass"></div>
        {{ toTitleCase(props.status) }}
    </div>
</template>

<script setup lang="ts">

import clsx from 'clsx';


const props = defineProps<{
    status: string,
}>()

const dotClass = computed(() => {
    let bg = ""
    switch (variantFormStatus.value) {
        case "primary":
            bg = "bg-primary"
            break
        case "secondary":
            bg = "bg-secondary"
            break
        case "info":
            bg = "bg-info"
            break
        case "success":
            bg = "bg-success"
            break
        case "warning":
            bg = "bg-warning"
            break
        case "error":
            bg = "bg-error"
            break
        case "gray":
            bg = "bg-gray-500"
            break

    }
    return clsx('w-2 h-2 rounded-full', bg)
})

const badgeClass = computed(() => {
    const classBadge: string[] = []


    switch (variantFormStatus.value) {
        case "primary":
            classBadge.push('bg-primary')
            classBadge.push('text-primary')
            break
        case "secondary":
            classBadge.push('bg-secondary')
            classBadge.push('text-secondary')
            break
        case "info":
            classBadge.push('bg-info')
            classBadge.push('text-info')
            break
        case "success":
            classBadge.push('bg-success')
            classBadge.push('text-success')
            break
        case "warning":
            classBadge.push('bg-warning')
            classBadge.push('text-warning')
            break
        case "error":
            classBadge.push('bg-error')
            classBadge.push('text-error')
            break
        case "gray":
            classBadge.push('bg-gray-500')
            classBadge.push('text-gray-500')
            break
    }


    return classBadge
})

const variantFormStatus = computed<"primary" | "neutral" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "gray">(() => {
    switch (props.status) {
        case "pending":
        case "waiting_for_payment":
            return "info"
        case "processing":
            return "secondary"
        case "completed":
        case "done":
        case "paid":
        case "active":
            return "success"
        case "refunded":
        case "refunding":
            return "warning"
        case "failed":
        case "cancelled":
        case "canceled":
            return "error"
        case "inactive":
            return "gray"
        default:
            return "neutral"
    }


})


onMounted(async () => {
    await nextTick()
})

</script>

<style scoped></style>