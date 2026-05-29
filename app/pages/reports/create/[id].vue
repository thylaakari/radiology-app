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
  <CommonRouterBack />
  <USeparator />
  <ProtocolPatientInfo v-if="patient" :patient="patient" />
  <ProtocolCreateProtocol />
</template>
