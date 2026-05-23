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
    birthDate: '01.06.2025',
    gender: 'F',
  },
  {
    id: '4587',
    shortName: 'ИВС',
    birthDate: '14.03.1988',
    gender: 'M',
  },
  {
    id: '4588',
    shortName: 'КАН',
    birthDate: '22.11.1975',
    gender: 'F',
  },
  {
    id: '4589',
    shortName: 'МЕД',
    birthDate: '05.08.1962',
    gender: 'M',
  },
  {
    id: '4590',
    shortName: 'ОЛГ',
    birthDate: '19.05.1995',
    gender: 'F',
  },
  {
    id: '4591',
    shortName: 'РДВ',
    birthDate: '30.01.2010',
    gender: 'M',
  },
  {
    id: '4592',
    shortName: 'СМН',
    birthDate: '12.07.1954',
    gender: 'M',
  },
  {
    id: '4593',
    shortName: 'ТАТ',
    birthDate: '25.09.1981',
    gender: 'F',
  },
  {
    id: '4594',
    shortName: 'ФЕД',
    birthDate: '08.02.2003',
    gender: 'M',
  },
  {
    id: '4595',
    shortName: 'ЯРМ',
    birthDate: '17.10.1978',
    gender: 'F',
  },
  {
    id: '4596',
    shortName: 'БПА',
    birthDate: '03.04.1991',
    gender: 'M',
  },
  {
    id: '4597',
    shortName: 'КЛИ',
    birthDate: '29.12.1969',
    gender: 'F',
  },
  {
    id: '4598',
    shortName: 'ДМТ',
    birthDate: '11.06.1985',
    gender: 'M',
  },
  {
    id: '4599',
    shortName: 'ЗНВ',
    birthDate: '24.08.2015',
    gender: 'F',
  },
  {
    id: '4600',
    shortName: 'ЛЕС',
    birthDate: '07.02.1948',
    gender: 'M',
  },
  {
    id: '4601',
    shortName: 'МРК',
    birthDate: '16.05.2000',
    gender: 'F',
  },
  {
    id: '4602',
    shortName: 'СТВ',
    birthDate: '21.01.1993',
    gender: 'M',
  },
])

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
