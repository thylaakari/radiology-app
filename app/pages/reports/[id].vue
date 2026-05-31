<script setup>
const { setTitle } = useMetaData()
const { getReportById } = useReport()
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
</script>

<template>
  <div class="flex gap-4 h-full" v-if="report && patient">
    <div class="flex flex-col gap-4 flex-1 min-w-0">
      <CommonRouterBack />
      <USeparator />
      <ProtocolPatientInfo v-if="patient" :patient="patient" />
      <ProtocolCreateProtocol :report="report" :patient="patient" />
    </div>

    <aside class="w-1/4 shrink-0 flex flex-col gap-4">
      <ProtocolTemplatePicker />
    </aside>
  </div>
</template>
