<script setup>
const { setTitle } = useMetaData()

onMounted(async () => {
  await setTitle('Главная')
})
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
  >
    <div>
      <h1 class="text-2xl font-bold tracking-tight">
        Рабочее пространство врача
      </h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
        Добро пожаловать в Radiology App
      </p>
    </div>
  </div>

  <USeparator />

  <IndexStats />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <IndexLastReports />
  </div>
</template>
