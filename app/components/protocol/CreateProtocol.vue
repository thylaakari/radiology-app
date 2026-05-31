<script setup>
const props = defineProps({
  report: Object,
  patient: Object,
})

const { saveReport } = useReport()
const { selectedTemplate } = useProtocolEditor()
const route = useRoute()
const saving = ref(false)

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
    await saveReport({ ...localReport.value, patientId: props.patient.id })
  } finally {
    saving.value = false
  }
}

watch(selectedTemplate, (template) => {
  if (!template) return
  localReport.value.description = template.description || ''
  localReport.value.conclusion = template.conclusion || ''
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

    <UButton
      label="Сохранить"
      icon="i-lucide-save"
      block
      :loading="saving"
      @click="handleSave"
    />
  </div>
</template>
