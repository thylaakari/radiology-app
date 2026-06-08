<script setup lang="ts">
const { data: home } = await useAsyncData(() =>
  queryCollection('content').path('/about').first(),
)
const { setTitle } = useMetaData()

onMounted(async () => {
  await setTitle('О программе')
})
</script>

<template>
  <ContentRenderer v-if="home" :value="home" />
  <div v-else>Home not found</div>
</template>
