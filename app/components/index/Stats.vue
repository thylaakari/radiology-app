<script setup>
const { countToday, countThisMonth, countTotal } = useReport()

const todayCount = ref(0)
const monthCount = ref(0)
const totalCount = ref(0)

onMounted(async () => {
  ;[todayCount.value, monthCount.value, totalCount.value] = await Promise.all([
    countToday(),
    countThisMonth(),
    countTotal(),
  ])
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
</template>
