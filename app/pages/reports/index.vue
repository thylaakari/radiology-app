<script setup>
import { getPaginationRowModel } from '@tanstack/vue-table'

const { setTitle } = useMetaData()

const router = useRouter()
const table = useTemplateRef('table')
const pagination = ref({ pageIndex: 0, pageSize: 10 })
const globalFilter = ref('')

const data = ref([
  {
    id: '4586',
    shortName: 'ВЛА',
    modality: 'ct',
    studyDescription: 'ОБП',
    createdAt: '01.06.2025 18:59',
  },
  {
    id: '4587',
    shortName: 'ИВС',
    modality: 'mri',
    studyDescription: 'Головной мозг с контрастом',
    createdAt: '02.06.2025 09:15',
  },
  {
    id: '4588',
    shortName: 'КАН',
    modality: 'xr',
    studyDescription: 'ОГК (2 проекции)',
    createdAt: '02.06.2025 10:30',
  },
  {
    id: '4589',
    shortName: 'МЕД',
    modality: 'ct',
    studyDescription: 'ОГК и СРП',
    createdAt: '02.06.2025 11:42',
  },
  {
    id: '4590',
    shortName: 'ОЛГ',
    modality: 'us',
    studyDescription: 'УЗИ щитовидной железы',
    createdAt: '02.06.2025 14:05',
  },
  {
    id: '4591',
    shortName: 'РДВ',
    modality: 'mri',
    studyDescription: 'Пояснично-крестцовый отдел позвоночника',
    createdAt: '03.06.2025 08:20',
  },
  {
    id: '4592',
    shortName: 'СМН',
    modality: 'ct',
    studyDescription: 'Ангиография сосудов головного мозга',
    createdAt: '03.06.2025 13:14',
  },
  {
    id: '4593',
    shortName: 'ТАТ',
    modality: 'xr',
    studyDescription: 'Коленный сустав (нагрузка)',
    createdAt: '03.06.2025 15:50',
  },
  {
    id: '4594',
    shortName: 'ФЕД',
    modality: 'mri',
    studyDescription: 'Органы малого таза',
    createdAt: '04.06.2025 10:11',
  },
  {
    id: '4595',
    shortName: 'ЯРМ',
    modality: 'ct',
    studyDescription: 'Кости таза и тазобедренные суставы',
    createdAt: '04.06.2025 17:23',
  },
])

const columns = [
  {
    accessorKey: 'createdAt',
    header: 'Дата создания',
  },
  {
    accessorKey: 'shortName',
    header: 'ФИО',
  },
  {
    accessorKey: 'modality',
    header: 'Модальность',
    cell: ({ row }) => {
      const color =
        {
          ct: 'secondary',
          mri: 'error',
          xr: 'neutral',
        }[row.getValue('modality')] ?? 'warning'

      return h(UBadge, { class: 'uppercase', variant: 'soft', color }, () =>
        row.getValue('modality'),
      )
    },
  },
  {
    accessorKey: 'studyDescription',
    header: 'Исследование',
  },
]

onMounted(async () => {
  await setTitle('Протоколы')
})
function onSelect(e, row) {
  router.push(`/reports/${row.original.id}`)
}
</script>

<template>
  <div class="flex py-4 gap-4 border-b border-accented">
    <UInput
      v-model="globalFilter"
      placeholder="Поиск..."
      icon="i-lucide-search"
    />
    <UButton icon="i-lucide-plus" label="Новый протокол" to="/reports/create" />
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
