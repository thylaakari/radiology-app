<template>
  <UDashboardGroup>
    <CommonSidebar />
    <UDashboardPanel>
      <template #header>
        <CommonNavbar />
      </template>

      <template #body>
        <slot></slot>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
