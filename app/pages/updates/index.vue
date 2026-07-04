<script setup>
import { isTauri } from '@tauri-apps/api/core'

const { data: home } = await useAsyncData(() =>
  queryCollection('content').path('/updates').first(),
)
const { setTitle } = useMetaData()
const { updateState } = useAppUpdate()

const showUpdateBlock = computed(() => isTauri() && updateState.value.hasUpdate)

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
    <div v-if="showUpdateBlock" class="space-y-2">
      <h3 class="font-semibold">Скачать новую версию</h3>
      <UPageLinks :links="links" />
    </div>

    <ContentRenderer v-if="home" :value="home" />
    <div v-else>Home not found</div>
  </div>
</template>
