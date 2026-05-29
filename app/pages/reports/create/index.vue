<script setup>
const { setTitle } = useMetaData()

onMounted(async () => {
  await setTitle('Новый протокол')
})
</script>

<template>
  <CommonRouterBack />
  <USeparator />
  <ProtocolCreatePatient />
</template>
