<script setup>
const { title } = useMetaData()
</script>

<template>
  <UDashboardNavbar>
    <template #title>{{ title || 'Дашборд' }}</template>
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>
    <template #right>
      <UColorModeSwitch />
    </template>
  </UDashboardNavbar>
</template>
