<script setup>
const { getPatients } = usePatient()

const router = useRouter()
const pagination = ref({
  pageIndex: 0,
  pageSize: 5,
})
const globalFilter = ref('')
const total = ref(0)

const data = ref([])
const columns = [
  {
    accessorKey: 'fullName',
    header: 'ФИО',
  },
  {
    accessorKey: 'birthDate',
    header: 'Дата рождения',
  },
  {
    accessorKey: 'gender',
    header: 'Пол',
  },
]

onMounted(async () => {
  await loadPatients()
})

const loadPatients = async () => {
  const result = await getPatients({
    page: pagination.value.pageIndex,
    pageSize: pagination.value.pageSize,
    search: globalFilter.value,
  })

  total.value = result.total

  data.value = result.items.map((patient) => ({
    ...patient,
    birthDate: formatBirthDate(patient.birthDate),
    gender: formatGender(patient.gender),
  }))
}

function onSelect(e, row) {
  router.push(`/reports/create/${row.original.id}`)
}

watch([pagination], loadPatients, { deep: true })
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold tracking-tight">Новый протокол</h1>
    <p class="text-sm mt-0.5">Выберите пациента или создайте нового</p>
  </div>
  <div class="flex py-4 gap-4 border-b border-accented">
    <UInput
      v-model="globalFilter"
      placeholder="Поиск..."
      icon="i-lucide-search"
    />
    <UButton
      icon="i-lucide-plus"
      label="Новый пациент"
      to="/patients/create?reportCreate=true"
    />
  </div>
  <UTable
    sticky
    :data="data"
    :columns="columns"
    v-model:global-filter="globalFilter"
    @select="onSelect"
  />
  <div class="flex justify-end border-t border-default pt-4">
    <UPagination
      :page="pagination.pageIndex + 1"
      :items-per-page="pagination.pageSize"
      :total="total"
      @update:page="(p) => (pagination.pageIndex = p - 1)"
    />
  </div>
</template>
