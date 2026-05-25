<script setup>
const { setTitle } = useMetaData()
const { getPatientById } = usePatient()
const route = useRoute()
const router = useRouter()

const patient = ref(null)

onMounted(async () => {
  patient.value = await getPatientById(route.params.id)
  await setTitle('Новый протокол')
})
</script>

<template>
  <UContainer :ui="{ base: 'mx-0' }">
    <div class="flex flex-col gap-4">
      <UButton
        label="Назад"
        icon="i-lucide-arrow-left"
        @click="router.back()"
        variant="link"
      />

      <USeparator />
      <ProtocolPatientInfo v-if="patient" :patient="patient" />
      <ProtocolCreateProtocol />
    </div>
  </UContainer>
</template>
