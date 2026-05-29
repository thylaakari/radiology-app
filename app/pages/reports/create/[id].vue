<script setup>
const { setTitle } = useMetaData()
const { getPatientById } = usePatient()
const route = useRoute()

const patient = ref(null)

onMounted(async () => {
  patient.value = await getPatientById(route.params.id)
  await setTitle('Новый протокол')
})
</script>

<template>
  <div class="flex gap-4 h-full">
    <div class="flex flex-col gap-4 flex-1 min-w-0">
      <CommonRouterBack />
      <USeparator />
      <ProtocolPatientInfo v-if="patient" :patient="patient" />
      <ProtocolCreateProtocol />
    </div>

    <aside class="w-1/4 shrink-0 flex flex-col gap-4">
      <ProtocolTemplatePicker />
    </aside>
  </div>
</template>
