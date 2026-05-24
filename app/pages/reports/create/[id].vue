<script setup>
const { setTitle } = useMetaData()
const route = useRoute()
const { getPatientById } = usePatient()

const patient = ref(null)

onMounted(async () => {
  patient.value = await getPatientById(route.params.id)
  await setTitle('Новый протокол')
})
</script>

<template>
  <ProtocolPatientInfo v-if="patient" :patient="patient" />

  <ProtocolCreateProtocol />
</template>
