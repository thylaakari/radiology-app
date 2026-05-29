<script setup>
const { saveReport } = useReport()
const { selectedTemplate } = useProtocolEditor()
const route = useRoute()
const router = useRouter()

const report = ref({
  id: '',
  patientId: route.params.id,
  modality: 'КТ',
  studyDescription: '',
  description: '',
  conclusion: '',
  createdAt: '',
  updatedAt: '',
  deleted: false,
})
const saving = ref(false)

async function handleSave() {
  try {
    saving.value = true
    const savedReport = await saveReport(report.value)
    await router.push(`/reports/${savedReport.id}`)
  } finally {
    saving.value = false
  }
}

watch(selectedTemplate, (template) => {
  if (!template) return

  report.value.description = template.description || ''
  report.value.conclusion = template.conclusion || ''
})
</script>

<template>
  <div class="flex flex-col gap-3 mb-5">
    <UFormField label="Область исследования">
      <UInput
        v-model="report.studyDescription"
        class="w-full"
        placeholder="Грудная клетка..."
      />
    </UFormField>

    <div class="flex gap-4 items-center">
      <UFormField>
        <USelect
          v-model="report.modality"
          :items="modalityItems"
          class="w-30"
        />
      </UFormField>
    </div>
  </div>

  <div class="w-full flex flex-col gap-4">
    <CommonEditor
      v-model="report.description"
      placeholder="Описание..."
      height-class="min-h-100"
    />

    <CommonEditor v-model="report.conclusion" placeholder="Заключение..." />

    <UButton
      label="Сохранить"
      icon="i-lucide-save"
      block
      :loading="saving"
      @click="handleSave"
    />
  </div>
</template>
