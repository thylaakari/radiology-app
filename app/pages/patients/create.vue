<script setup>
const { setTitle } = useMetaData()

onMounted(async () => {
  await setTitle('Новый пациент')
})
</script>

<template>
  <CommonRouterBack />
  <USeparator />
  <PatientView />
</template>
