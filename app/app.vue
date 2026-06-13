<script setup>
import { ru } from '@nuxt/ui/locale'
import { check } from '@tauri-apps/plugin-updater'
import { getVersion } from '@tauri-apps/api/app'

const { setTitle } = useMetaData()

const currentVersion = ref('')
const latestVersion = ref('')
const updateNotes = ref('')
const hasUpdate = ref(false)
const updateError = ref('')

onMounted(async () => {
  await setTitle('')

  try {
    currentVersion.value = await getVersion()

    const update = await check()

    if (update) {
      hasUpdate.value = true
      latestVersion.value = update.version
      updateNotes.value = update.body || update.rawJson?.notes || ''
    }
  } catch (error) {
    updateError.value = error?.message || 'Ошибка проверки обновления'
  }
})
</script>

<template>
  <UApp :locale="ru">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div
      style="
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 9999;
        background: white;
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 12px;
        max-width: 320px;
      "
    >
      <div>Текущая версия: {{ currentVersion }}</div>
      <div v-if="hasUpdate">Новая версия: {{ latestVersion }}</div>
      <div v-if="updateNotes">{{ updateNotes }}</div>
      <div v-if="!hasUpdate && currentVersion">Обновлений нет</div>
      <div v-if="updateError" style="color: red">{{ updateError }}</div>
    </div>
  </UApp>
</template>
