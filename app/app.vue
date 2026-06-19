<script setup>
const { setTitle } = useMetaData()
const { updateState, checkAppUpdate, openDownloadPage } = useAppUpdate()

const showUpdateModal = ref(false)

onMounted(async () => {
  await setTitle('')
  const result = await checkAppUpdate()

  if (result.hasUpdate) {
    showUpdateModal.value = true
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
      "
    >
      <div>Текущая версия: {{ updateState.currentVersion || '...' }}</div>
      <div v-if="updateState.hasUpdate">
        Новая версия: {{ updateState.latestVersion }}
      </div>
      <div v-if="updateState.notes">
        {{ updateState.notes }}
      </div>
      <div
        v-if="
          !updateState.hasUpdate &&
          updateState.checked &&
          updateState.currentVersion
        "
      >
        Обновлений нет
      </div>
      <div v-if="updateState.error" style="color: red">
        {{ updateState.error }}
      </div>

      <button
        v-if="updateState.hasUpdate && updateState.downloadUrl"
        @click="openDownloadPage"
        style="
          margin-top: 12px;
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          background: #111827;
          color: white;
          cursor: pointer;
        "
      >
        Скачать обновление
      </button>
    </div>
  </UApp>
</template>
