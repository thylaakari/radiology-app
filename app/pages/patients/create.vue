<script setup>
const { setTitle } = useMetaData()
const router = useRouter()

onMounted(async () => {
  await setTitle('Новый пациент')
})
</script>

<template>
  <CommonRouterBack />
  <USeparator />
  <PatientView />
</template>
