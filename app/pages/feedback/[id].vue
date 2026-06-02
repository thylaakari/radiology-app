<script setup>
const route = useRoute()
const { setTitle } = useMetaData()
const { getFeedbackById } = useFeedback()

const feedback = ref(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true

  try {
    const data = await getFeedbackById(route.params.id)

    if (!data) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Обращение не найдено',
      })
    }

    feedback.value = data
    await setTitle(data.subject || 'Обращение')
  } finally {
    loading.value = false
  }
})

const currentStatus = computed(() => {
  return (
    statusConfig[feedback.value?.f_status] || {
      label: 'Неизвестно',
      color: 'neutral',
    }
  )
})
</script>

<template>
  <div v-if="loading" class="py-8 text-sm text-muted">Загрузка...</div>

  <div v-else-if="feedback" class="space-y-6">
    <CommonRouterBack />
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0 space-y-3">
        <div class="flex items-center gap-2">
          <UBadge
            :label="currentStatus.label"
            :color="currentStatus.color"
            variant="soft"
          />
        </div>

        <h1 class="text-xl font-semibold wrap-break-word">
          {{ feedback.subject || 'Обращение' }}
        </h1>
      </div>
    </div>

    <USeparator />

    <dl class="grid gap-4 sm:grid-cols-3">
      <div class="space-y-1">
        <dt class="text-sm text-muted">Email</dt>
        <dd class="break-all">
          {{ feedback.email || '—' }}
        </dd>
      </div>

      <div class="space-y-1">
        <dt class="text-sm text-muted">Создано</dt>
        <dd>
          {{ feedback.createdAt ? formatDate(feedback.createdAt) : '—' }}
        </dd>
      </div>

      <div class="space-y-1">
        <dt class="text-sm text-muted">Обновлено</dt>
        <dd>
          {{ feedback.updatedAt ? formatDate(feedback.updatedAt) : '—' }}
        </dd>
      </div>
    </dl>

    <p class="text-sm text-muted">Сообщение</p>

    <UChatMessages>
      <UChatMessage
        id="feedback-message"
        role="user"
        variant="soft"
        :parts="[
          {
            type: 'text',
            id: 'feedback-message-part',
            text: feedback.message || '—',
          },
        ]"
      />

      <UChatMessage
        v-if="feedback.answer"
        id="feedback-answer"
        role="assistant"
        variant="solid"
        side="right"
        :parts="[
          {
            type: 'text',
            id: 'feedback-answer-part',
            text: feedback.answer || '—',
          },
        ]"
      />
    </UChatMessages>
  </div>
</template>
