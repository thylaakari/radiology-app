<script setup>
const { setTitle } = useMetaData()
const router = useRouter()

const selectedPatient = ref(null)

onMounted(async () => {
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
      <ProtocolCreatePatient
        v-if="!selectedPatient"
        @select-patient="selectedPatient = $event"
      />

      <template v-else>
        <ProtocolPatientInfo :patient="selectedPatient" />

        <ProtocolCreateProtocol :patient="selectedPatient" />
      </template>
    </div>
  </UContainer>
</template>
