<template>
  <UDashboardGroup>
    <CommonSidebar />
    <UDashboardPanel>
      <template #header>
        <CommonNavbar />
      </template>

      <template #body>
        <UContainer :ui="{ base: 'mx-0' }">
          <div class="flex flex-col gap-4">
            <slot></slot>
          </div>
        </UContainer>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
