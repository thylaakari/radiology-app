<script setup>
import { feedbackSchema } from '~/composables/useFeedback'

const { setTitle } = useMetaData()
const { saveFeedback } = useFeedback()
const router = useRouter()
const toast = useToast()

const loading = ref(false)

const state = reactive({
  id: '',
  documentId: '',
  subject: '',
  message: '',
  email: '',
  status: 'new',
  createdAt: '',
  updatedAt: '',
})

onMounted(async () => {
  await setTitle('Новое обращение')
})

async function onSubmit(event) {
  try {
    loading.value = true
    await saveFeedback(event.data)
    await router.push(`/`)

    toast.add({
      title: 'Обращение создано',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })
  } catch (error) {
    toast.add({
      title: 'Ошибка',
      description: error.message,
      color: 'error',
      icon: 'i-lucide-alert-circle',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mb-4 border-b border-accented pb-4">
    <h1 class="text-xl font-semibold">Новое обращение</h1>
  </div>

  <UForm
    :schema="feedbackSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField name="email" label="Email" required>
      <UInput
        v-model="state.email"
        class="w-full"
        placeholder="example@email.com"
      />
    </UFormField>

    <UFormField name="subject" label="Тема" required>
      <UInput
        v-model="state.subject"
        class="w-full"
        placeholder="Кратко опишите проблему или предложение"
      />
    </UFormField>

    <UFormField name="message" label="Сообщение" required>
      <UTextarea
        v-model="state.message"
        class="w-full"
        :rows="10"
        placeholder="Опишите подробнее"
      />
    </UFormField>

    <div class="flex justify-end gap-3">
      <UButton type="submit" icon="i-lucide-send" :loading="loading">
        Отправить
      </UButton>
    </div>
  </UForm>
</template>
