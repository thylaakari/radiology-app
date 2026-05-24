<script setup>
import { ru } from '@nuxt/ui/locale'
const { setTitle } = useMetaData()

onMounted(async () => {
  await setTitle('')
})
</script>

<template>
  <UApp :locale="ru">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
