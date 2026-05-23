<script setup>
const { setTitle } = useMetaData()
onMounted(async () => {
  await setTitle('Главная')
})
</script>
<template>
  <div>Главная</div>
</template>
