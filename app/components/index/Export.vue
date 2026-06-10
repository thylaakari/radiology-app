<script setup>
const toast = useToast()
const { exportDb, exporting, importDb, importing } = useDbExport()

async function handleExport() {
  await exportDb()
  toast.add({ title: 'База данных экспортирована', icon: 'i-lucide-check' })
}

async function handleImport() {
  try {
    const result = await importDb()
    if (!result) return
    toast.add({
      title: 'Импорт завершён',
      description: `Пациентов: ${result.patients}, протоколов: ${result.reports}, шаблонов: ${result.templates}`,
      icon: 'i-lucide-check',
    })
  } catch (e) {
    toast.add({
      title: 'Ошибка импорта',
      description: e.message,
      color: 'error',
      icon: 'i-lucide-alert-circle',
    })
  }
}
</script>

<template>
  <div
    class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 space-y-3"
  >
    <div>
      <p class="text-sm font-medium">База данных</p>
      <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
        Экспорт и импорт всех данных
      </p>
    </div>

    <UButton
      icon="i-lucide-database"
      variant="outline"
      block
      :loading="exporting"
      @click="handleExport"
    >
      Экспортировать
    </UButton>

    <UButton
      icon="i-lucide-upload"
      variant="outline"
      block
      :loading="importing"
      @click="handleImport"
    >
      Импортировать
    </UButton>
  </div>
</template>
