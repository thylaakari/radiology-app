<script setup>
const items = [
  [
    {
      label: 'Главная',
      to: '/',
      icon: 'i-lucide-home',
    },
    {
      label: 'Протоколы',
      to: '/reports',
      icon: 'i-lucide-file-text',
    },
    {
      label: 'Пациенты',
      to: '/patients',
      icon: 'i-lucide-users',
    },
    // {
    //   label: 'Калькуляторы',
    //   to: '/calculators',
    //   icon: 'i-lucide-calculator',
    // },
    {
      label: 'Шаблоны',
      to: '/templates',
      icon: 'i-lucide-book-open',
    },
  ],
  // [
  //   {
  //     label: 'Обратная связь',
  //     to: '/feedback',
  //     icon: 'i-lucide-message-circle',
  //   },
  //   {
  //     label: 'Настройки',
  //     to: '/settings',
  //     icon: 'i-lucide-settings',
  //   },
  //   {
  //     label: 'Помощь',
  //     to: '/help',
  //     icon: 'i-lucide-help-circle',
  //   },
  //   {
  //     label: 'О программе',
  //     to: '/about',
  //     icon: 'i-lucide-info',
  //   },
  // ],
]
</script>

<template>
  <UDashboardSidebar collapsible :ui="{ footer: 'border-t border-default' }">
    <template #header="{ collapsed }">
      <ULink to="/">
        <CommonLogoApp v-if="!collapsed" class="h-5 w-auto shrink-0" />
        <CommonSvgLogo
          v-else
          name="i-lucide-radiation"
          class="size-6 text-neutral mx-auto"
        />
      </ULink>
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
        tooltip
      />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
        tooltip
      />
    </template>

    <!-- <template #footer="{ collapsed }">
      <UButton
        :avatar="{
          src: 'https://github.com/benjamincanac.png',
          loading: 'lazy',
        }"
        :label="collapsed ? undefined : 'Benjamin'"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template> -->
  </UDashboardSidebar>
</template>
