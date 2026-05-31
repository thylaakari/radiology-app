<script setup>
import { parseDate } from '@internationalized/date'
import { getPaginationRowModel } from '@tanstack/vue-table'

const router = useRouter()
const { setTitle } = useMetaData()
const { getPatientById, savePatient } = usePatient()
const { getReportByPatientId } = useReport()
const route = useRoute()
const patient = ref(null)

const table = useTemplateRef('table')
const pagination = ref({ pageIndex: 0, pageSize: 10 })
const globalFilter = ref('')

const reports = ref([])

const columns = [
  {
    accessorKey: 'createdAt',
    header: 'Дата создания',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
  {
    accessorKey: 'modality',
    header: 'Модальность',
    cell: ({ row }) => {
      const modality = getModalityConfig(row.getValue('modality'))

      return h(
        UBadge,
        {
          class: 'uppercase',
          variant: 'soft',
          color: modality.color,
        },
        () => modality.label,
      )
    },
  },
  {
    accessorKey: 'studyDescription',
    header: 'Исследование',
  },
]

const updateTitle = async () => {
  const fullname = `${patient.value.lastName} ${patient.value.firstName} ${patient.value.middleName}`

  await setTitle({
    name: fullname,
    birthDate: formatBirthDate(patient.value.birthDate),
  })
}

onMounted(async () => {
  console.log(route.params.id)
  patient.value = await getPatientById(route.params.id)
  if (!patient.value) {
    return router.push('/patients')
  }
  patient.value.birthDate = parseDate(patient.value.birthDate)

  reports.value = await getReportByPatientId(patient.value.id)
  await updateTitle()
})

const onSave = async (patientData) => {
  await savePatient(patientData)
  await updateTitle()
}

function onSelect(e, row) {
  router.push(`/reports/${row.original.id}`)
}
</script>

<template>
  <CommonRouterBack />
  <template v-if="patient">
    <ProtocolPatientInfo :patient="patient" />

    <USeparator />

    <PatientView v-model:patient="patient" @submit="onSave" />

    <USeparator />
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Протоколы пациента</h1>
      <div class="flex py-4 gap-4 border-b border-accented">
        <UInput
          v-model="globalFilter"
          placeholder="Поиск..."
          icon="i-lucide-search"
        />
        <UButton
          icon="i-lucide-plus"
          label="Новый протокол"
          :to="`/reports/create/${patient.id}`"
        />
      </div>
      <UTable
        ref="table"
        sticky
        :data="reports"
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
    </div>
  </template>
</template>
