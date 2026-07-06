<script setup>
import { isTauri } from '@tauri-apps/api/core'

const { data: home } = await useAsyncData(() =>
  queryCollection('content').path('/updates').first(),
)
const { setTitle } = useMetaData()
const { updateState } = useAppUpdate()

const showUpdateBlock = computed(() => isTauri() && updateState.hasUpdate)

const links = ref([
  {
    label: 'Windows',
    icon: 'i-lucide-file-pen',
    to: 'https://disk.yandex.ru/d/HDLyEewOpb-l8w',
  },
  {
    label: 'MacOS',
    icon: 'i-lucide-star',
    to: 'https://disk.yandex.ru/d/YTm7Hwo9t9V2pA',
  },
  {
    label: 'Linux',
    icon: 'i-lucide-rocket',
    to: 'https://disk.yandex.ru/d/8Xre4l06ttbxTg',
  },
])

onMounted(async () => {
  await setTitle('Обновления программы')
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-if="showUpdateBlock" class="space-y-3">
      <UAlert
        color="primary"
        variant="soft"
        icon="i-lucide-download"
        title="Доступно обновление"
        :description="`Установите новую версию программы ${updateState.latestVersion}, чтобы получить последние исправления и улучшения.`"
      />

      <div class="rounded-xl border border-primary/20 bg-elevated p-4">
        <div class="mb-3 flex items-center justify-between gap-3">
          <div>
            <p class="text-sm font-medium text-highlighted">
              Новая версия готова к скачиванию
            </p>
            <p class="text-sm text-muted">
              Текущая версия будет обновлена после установки.
            </p>
          </div>

          <UBadge
            color="primary"
            variant="soft"
            :label="updateState.latestVersion"
          />
        </div>

        <UPageLinks :links="links" />
      </div>
    </div>

    <div
      v-else
      class="flex items-center gap-2 rounded-xl border border-default bg-elevated px-4 py-3 text-sm text-muted"
    >
      <UIcon name="i-lucide-badge-check" class="size-5 text-primary" />
      <span>
        У вас последняя версия программы
        <span class="font-medium text-highlighted"
          >({{ updateState.currentVersion }})</span
        >
      </span>
    </div>

    <ContentRenderer v-if="home" :value="home" />
    <div v-else>Home not found</div>
  </div>
</template>
