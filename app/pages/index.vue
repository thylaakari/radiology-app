<script setup>
const { setTitle } = useMetaData()

onMounted(async () => {
  await setTitle('Главная')
})

const isOnline = ref(true)
const pendingSyncCount = ref(3)

const stats = computed(() => [
  {
    label: 'Описано сегодня',
    value: '14',
  },
  {
    label: 'Описано в этом месяце',
    value: pendingSyncCount.value,
  },
  {
    label: 'Описано всего',
    value: '42',
  },
])

const recentStudies = ref([
  {
    id: '1',
    patientName: 'Павлов Илья Ж.',
    modality: 'CT',
    date: 'Сегодня, 10:24',
    status: 'draft',
  },
  {
    id: '2',
    patientName: 'Иванова Анна С.',
    modality: 'MRI',
    date: 'Сегодня, 09:15',
    status: 'synced',
  },
  {
    id: '3',
    patientName: 'Петров Петр П.',
    modality: 'XR',
    date: 'Вчера, 17:40',
    status: 'synced',
  },
])

const getModalityColor = (modality) => {
  const colors = { CT: 'secondary', MRI: 'error', XR: 'neutral', US: 'warning' }
  return colors[modality] || 'success'
}
</script>

<template>
  <UContainer class="flex flex-col gap-6 py-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight">
          Рабочее пространство врача
        </h1>
        <p class="text-sm mt-0.5">Добро пожаловать в Radiology Hub</p>
      </div>

      <div
        class="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
      >
        <span
          class="w-2 h-2 rounded-full animate-pulse"
          :class="isOnline ? 'bg-green-500' : 'bg-amber-500'"
        ></span>
        <span v-if="isOnline && pendingSyncCount === 0"
          >Связь со Strapi стабильна</span
        >
        <span v-else-if="isOnline && pendingSyncCount > 0"
          >Синхронизация... (осталось: {{ pendingSyncCount }})</span
        >
        <span v-else>Автономный режим (IndexedDB)</span>
      </div>
    </div>

    <USeparator />

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
      >
        <p
          class="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
        >
          {{ stat.label }}
        </p>
        <p class="text-2xl font-semibold mt-1">{{ stat.value }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold tracking-tight">
            Последние протоколы
          </h2>
          <UButton to="/patients/qwe" icon="i-lucide-plus" color="primary"
            >Новый пациент</UButton
          >
        </div>

        <div
          class="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-900"
        >
          <div
            v-if="recentStudies.length === 0"
            class="p-8 text-center text-neutral-500"
          >
            Нет недавних исследований. Начните работу, создав новый протокол.
          </div>

          <div
            v-else
            class="divide-y divide-neutral-200 dark:divide-neutral-800"
          >
            <div
              v-for="study in recentStudies"
              :key="study.id"
              class="p-4 flex items-center gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition cursor-pointer"
              @click="navigateTo(`/patients/${study.id}`)"
            >
              <UBadge
                :color="getModalityColor(study.modality)"
                variant="soft"
                class="uppercase font-bold shrink-0"
              >
                {{ study.modality }}
              </UBadge>

              <div>
                <p class="font-medium text-sm">{{ study.patientName }}</p>
                <p
                  class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5"
                >
                  {{ study.date }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
