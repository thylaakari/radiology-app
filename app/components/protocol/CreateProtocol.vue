<script setup>
const props = defineProps({
  report: Object,
  patient: Object,
})

const { saveReport } = useReport()
const { selectedTemplate } = useProtocolEditor()
const router = useRouter()
const saving = ref(false)
const copied = ref(false)
let copyTimer = null

const localReport = ref(
  props.report ?? {
    id: '',
    patientId: '',
    modality: 'КТ',
    studyDescription: '',
    description: '',
    conclusion: '',
    createdAt: '',
    updatedAt: '',
    deleted: false,
  },
)

watch(
  () => props.report,
  (val) => {
    if (val) localReport.value = val
  },
  { immediate: true },
)

async function handleSave() {
  try {
    saving.value = true
    const savedReport = await saveReport({
      ...localReport.value,
      patientId: props.patient.id,
    })
    router.push(`/reports/${savedReport.id}`)
  } finally {
    saving.value = false
  }
}

function mdToPlainText(value = '') {
  return value
    .replace(/^#{1,6}\s+/gm, '') // заголовки
    .replace(/\*\*(.+?)\*\*/g, '$1') // жирный
    .replace(/\*(.+?)\*/g, '$1') // курсив
    .replace(/~~(.+?)~~/g, '$1') // зачёркнутый
    .replace(/`(.+?)`/g, '$1') // код
    .replace(/^[-*+]\s+/gm, '') // списки
    .replace(/^\d+\.\s+/gm, '') // нумерованные списки
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // ссылки
    .trim()
}

async function handleCopy() {
  const text = [
    mdToPlainText(localReport.value.description),
    mdToPlainText(localReport.value.conclusion),
  ]
    .filter(Boolean)
    .join('\n\n')

  if (!text) return

  await navigator.clipboard.writeText(text)

  copied.value = true
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copied.value = false
  }, 5000)
}

watch(selectedTemplate, (template) => {
  if (!template) return
  localReport.value.description = template.description || ''
  localReport.value.conclusion = template.conclusion || ''
})

onBeforeUnmount(() => {
  clearTimeout(copyTimer)
})
</script>

<template>
  <div class="flex flex-col gap-3 mb-5">
    <UFormField label="Область исследования">
      <UInput
        v-model="localReport.studyDescription"
        class="w-full"
        placeholder="Грудная клетка..."
      />
    </UFormField>

    <div class="flex gap-4 items-center">
      <UFormField>
        <USelect
          v-model="localReport.modality"
          :items="modalityItems"
          class="w-30"
        />
      </UFormField>
    </div>
  </div>

  <div class="w-full flex flex-col gap-4">
    <CommonEditor
      v-model="localReport.description"
      placeholder="Описание..."
      height-class="min-h-100"
    />

    <CommonEditor
      v-model="localReport.conclusion"
      placeholder="Заключение..."
    />

    <div class="flex gap-2">
      <UButton
        label="Сохранить"
        icon="i-lucide-save"
        block
        :loading="saving"
        @click="handleSave"
      />
      <UTooltip :text="copied ? 'Скопировано' : 'Копировать'">
        <UButton
          :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          variant="outline"
          aria-label="Копировать описание и заключение"
          @click="handleCopy"
        />
      </UTooltip>
    </div>
  </div>
</template>
