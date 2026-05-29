<script setup>
const router = useRouter()
</script>

<template>
  <UButton
    label="Назад"
    icon="i-lucide-arrow-left"
    @click="router.back()"
    variant="link"
  />
</template>
