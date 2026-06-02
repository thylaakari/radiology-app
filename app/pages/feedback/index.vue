<script setup>
import { h, resolveComponent } from 'vue'
import { getPaginationRowModel } from '@tanstack/vue-table'

const UBadge = resolveComponent('UBadge')

const { setTitle } = useMetaData()
const { getFeedback } = useFeedback()
const router = useRouter()

const pagination = ref({ pageIndex: 0, pageSize: 10 })
const globalFilter = ref('')
const loading = ref(false)
const data = ref([])
const total = ref(0)

const columns = [
  {
    accessorKey: 'createdAt',
    header: 'Дата',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
  {
    accessorKey: 'f_status',
    header: 'Статус',
    cell: ({ row }) => {
      const status = statusConfig[row.getValue('f_status')] ?? {
        label: 'Неизвестно',
        color: 'neutral',
      }

      return h(
        UBadge,
        {
          variant: 'soft',
          color: status.color,
        },
        () => status.label,
      )
    },
  },
  {
    accessorKey: 'subject',
    header: 'Тема',
    meta: {
      class: {
        td: 'max-w-0 w-full',
      },
    },
    cell: ({ row }) =>
      h(
        'div',
        {
          class: 'truncate max-w-full',
          title: row.getValue('subject'),
        },
        row.getValue('subject'),
      ),
  },
]

onMounted(async () => {
  await setTitle('Обращения')
  await loadFeedback()
})

watch(
  () => [pagination.value.pageIndex, pagination.value.pageSize],
  async () => {
    await loadFeedback()
  },
)

async function loadFeedback() {
  try {
    loading.value = true
    const result = await getFeedback({
      page: pagination.value.pageIndex + 1,
      pageSize: pagination.value.pageSize,
    })

    data.value = result.items
    total.value = result.total
  } finally {
    loading.value = false
  }
}

async function onSelect(e, row) {
  router.push(`/feedback/${row.original.documentId}`)
}
</script>

<template>
  <div class="flex py-4 gap-4 border-b border-accented">
    <UInput
      v-model="globalFilter"
      placeholder="Поиск..."
      icon="i-lucide-search"
    />
    <UButton
      icon="i-lucide-plus"
      label="Новое обращение"
      to="/feedback/create"
    />
  </div>

  <UTable
    ref="table"
    sticky
    :data="data"
    :loading="loading"
    loading-color="primary"
    loading-animation="carousel"
    :columns="columns"
    @select="onSelect"
    v-model:pagination="pagination"
    v-model:global-filter="globalFilter"
    :pagination-options="{
      manualPagination: true,
      rowCount: total,
      getPaginationRowModel: getPaginationRowModel(),
    }"
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
