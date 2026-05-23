<script setup>
const { setTitle } = useMetaData()
await callOnce(async () => {
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
