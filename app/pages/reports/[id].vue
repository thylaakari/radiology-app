<script setup>
const { setTitle } = useMetaData()
const { getReportById, saveReport } = useReport()
const { getPatientById } = usePatient()

const router = useRouter()
const route = useRoute()
const report = ref(null)
const patient = ref(null)

onMounted(async () => {
  report.value = await getReportById(route.params.id)
  patient.value = await getPatientById(report.value.patientId)
  if (!report.value || !patient.value) {
    return router.push('/reports')
  }
  const patientFullname = `${patient.value.lastName} ${patient.value.firstName} ${patient.value.middleName}`
  await setTitle({
    name: patientFullname,
    birthDate: formatBirthDate(patient.value.birthDate),
  })
})

const onSave = async () => {
  await saveReport(report.value)
}
</script>

<template>
  <div v-if="report && patient">
    <div class="flex flex-col gap-4">
      <CommonRouterBack />
      <ProtocolPatientInfo v-if="patient" :patient="patient" />
      <USeparator />
      <div class="flex flex-col gap-3 mb-5">
        <h1 class="text-xl font-semibold leading-snug">
          {{ report.studyDescription }}
        </h1>

        <div class="flex flex-wrap items-center gap-2">
          <UBadge
            :label="report.modality.toUpperCase()"
            variant="soft"
            :color="getModalityConfig(report.modality).color"
          />
          <UBadge
            icon="i-lucide-calendar"
            color="neutral"
            variant="outline"
            :label="`Создан: ${formatDate(report.createdAt)}`"
          />
          <UBadge
            icon="i-lucide-calendar"
            color="neutral"
            variant="outline"
            :label="`Обновлен: ${formatDate(report.updatedAt)}`"
          />
        </div>
      </div>

      <div class="w-full flex flex-col gap-4">
        <CommonEditor
          v-model="report.description"
          placeholder="Описание..."
          height-class="min-h-100"
        />
        <CommonEditor v-model="report.conclusion" placeholder="Заключение..." />
        <UButton label="Сохранить" icon="i-lucide-save" block @click="onSave" />
      </div>
    </div>
  </div>
</template>
