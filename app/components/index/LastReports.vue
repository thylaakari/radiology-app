<script setup>
const { getRecentReports } = useReport()

const recentReports = ref([])

onMounted(async () => {
  recentReports.value = await getRecentReports(5)
})
</script>

<template>
  <div class="lg:col-span-2 space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold tracking-tight">Последние протоколы</h2>
      <UButton to="/reports/create" icon="i-lucide-plus">
        Новый протокол
      </UButton>
    </div>

    <div
      class="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-900"
    >
      <div v-if="recentReports.length === 0" class="p-8 text-center">
        <UIcon
          name="i-lucide-folder-open"
          class="w-10 h-10 mx-auto mb-3 opacity-30"
        />
        <p>Нет недавних протоколов. Создайте первый.</p>
      </div>

      <div v-else class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <NuxtLink
          v-for="report in recentReports"
          :key="report.id"
          :to="`/reports/${report.id}`"
          class="flex items-center gap-3 p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 active:bg-neutral-200 dark:active:bg-neutral-700/50 transition-colors duration-150 cursor-pointer"
        >
          <UBadge
            :color="getModalityConfig(report.modality).color"
            variant="soft"
            class="uppercase font-bold shrink-0 w-12 justify-center"
          >
            {{ getModalityConfig(report.modality).label }}
          </UBadge>

          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm truncate">
              {{ report.fullName }} &middot; {{ report.studyDescription }}
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {{ formatDate(report.updatedAt) }}
            </p>
          </div>

          <UIcon
            name="i-lucide-chevron-right"
            class="w-4 h-4 shrink-0 text-neutral-400 dark:text-neutral-600"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
