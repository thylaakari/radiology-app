<script setup>
const { setTitle } = useMetaData()
const { countToday, countThisMonth, countTotal, getRecentReports } = useReport()

const todayCount = ref(0)
const monthCount = ref(0)
const totalCount = ref(0)
const recentReports = ref([])

onMounted(async () => {
  await setTitle('Главная')
  ;[todayCount.value, monthCount.value, totalCount.value] = await Promise.all([
    countToday(),
    countThisMonth(),
    countTotal(),
  ])
  recentReports.value = await getRecentReports(5)
})

const stats = computed(() => [
  {
    label: 'Описано сегодня',
    value: todayCount.value,
    icon: 'i-lucide-file-text',
    color: 'text-primary',
  },
  {
    label: 'Описано в этом месяце',
    value: monthCount.value,
    icon: 'i-lucide-calendar',
    color: 'text-primary',
  },
  {
    label: 'Описано всего',
    value: totalCount.value,
    icon: 'i-lucide-layers',
    color: 'text-success',
  },
])
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

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="group p-4 rounded-xl border cursor-default select-none bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-primary hover:bg-white dark:hover:bg-neutral-800/60 hover:shadow-md transition-all duration-200"
    >
      <div class="flex items-start justify-between">
        <p class="text-xs font-medium uppercase tracking-wider">
          {{ stat.label }}
        </p>
        <UIcon
          :name="stat.icon"
          class="w-4 h-4 opacity-40 group-hover:opacity-80 transition-opacity duration-200"
          :class="stat.color"
        />
      </div>
      <p class="text-2xl font-semibold mt-2 tabular-nums">{{ stat.value }}</p>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold tracking-tight">
          Последние протоколы
        </h2>
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
                {{ report.shortName }} &middot; {{ report.studyDescription }}
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
  </div>
</template>
