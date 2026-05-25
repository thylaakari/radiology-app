<script setup>
const { setTitle } = useMetaData()
const { getPatients } = usePatient()

const router = useRouter()
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})
const globalFilter = ref('')
const total = ref(0)

const data = ref([])
const columns = [
  {
    accessorKey: 'shortName',
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
  await setTitle('Пациенты')
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
  router.push(`/patients/${row.original.id}`)
}

watch([pagination], loadPatients, { deep: true })
</script>

<template>
  <div class="flex py-4 gap-4 border-b border-accented">
    <UInput
      v-model="globalFilter"
      placeholder="Поиск..."
      icon="i-lucide-search"
    />
    <UButton icon="i-lucide-plus" label="Новый пациент" to="/patients/create" />
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
