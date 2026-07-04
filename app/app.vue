<script setup>
import { ru } from '@nuxt/ui/locale'
import { isTauri } from '@tauri-apps/api/core'

const { title, setTitle } = useMetaData()
const { checkAppUpdate } = useAppUpdate()

useHead({
  title: computed(() => (title.value ? `${title.value}` : 'Radiology App')),
})

onMounted(async () => {
  await setTitle('')

  if (isTauri()) {
    await checkAppUpdate()
  }
})
</script>

<template>
  <UApp :locale="ru">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
