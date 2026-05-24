<script setup>
import { getPaginationRowModel } from '@tanstack/vue-table'

const { setTitle } = useMetaData()
const { getPatients, formatBirthDate } = usePatient()

const router = useRouter()
const table = useTemplateRef('table')
const pagination = ref({ pageIndex: 0, pageSize: 10 })
const globalFilter = ref('')

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

  const patients = await getPatients()

  data.value = patients.map((patient) => ({
    ...patient,

    birthDate: formatBirthDate(patient.birthDate),

    gender: patient.gender === 'M' ? 'М' : patient.gender === 'F' ? 'Ж' : '-',
  }))
})

function onSelect(e, row) {
  router.push(`/patients/${row.original.id}`)
}
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
    ref="table"
    sticky
    :data="data"
    :columns="columns"
    @select="onSelect"
    v-model:pagination="pagination"
    v-model:global-filter="globalFilter"
    :pagination-options="{
      getPaginationRowModel: getPaginationRowModel(),
    }"
  />
  <div class="flex justify-end border-t border-default pt-4">
    <UPagination
      :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
      :items-per-page="table?.tableApi?.getState().pagination.pageSize"
      :total="table?.tableApi?.getFilteredRowModel().rows.length"
      @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
    />
  </div>
</template>
