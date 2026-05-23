<script setup>
const { setTitle } = useMetaData()

onMounted(async () => {
  await setTitle('')
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
