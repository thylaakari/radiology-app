import { getVersion } from '@tauri-apps/api/app'
import { fetch } from '@tauri-apps/plugin-http'
import { openUrl } from '@tauri-apps/plugin-opener'

const updateState = ref({
  checked: false,
  hasUpdate: false,
  currentVersion: '',
  latestVersion: '',
  notes: '',
  downloadUrl: '',
  error: '',
})

function normalizeVersion(version) {
  return String(version || '')
    .trim()
    .replace(/^v/i, '')
}

function compareVersions(a, b) {
  const aParts = normalizeVersion(a).split('.').map(Number)
  const bParts = normalizeVersion(b).split('.').map(Number)
  const maxLength = Math.max(aParts.length, bParts.length)

  for (let i = 0; i < maxLength; i += 1) {
    const aNum = aParts[i] || 0
    const bNum = bParts[i] || 0

    if (aNum > bNum) return 1
    if (aNum < bNum) return -1
  }

  return 0
}

export function useAppUpdate() {
  async function checkAppUpdate() {
    try {
      const currentVersion = await getVersion()

      const response = await fetch(
        'https://www.radiologyhub.ru/updates/latest.json',
        {
          method: 'GET',
        },
      )

      const latest = await response.json()

      const latestVersion = latest.version || ''
      const downloadUrl = latest.downloads?.['windows-x86_64'] || ''

      updateState.value = {
        checked: true,
        hasUpdate: compareVersions(latestVersion, currentVersion) === 1,
        currentVersion,
        latestVersion,
        notes: latest.notes || '',
        downloadUrl,
        error: '',
      }

      return updateState.value
    } catch (error) {
      console.error('checkAppUpdate error:', error)

      updateState.value = {
        checked: true,
        hasUpdate: false,
        currentVersion: '',
        latestVersion: '',
        notes: '',
        downloadUrl: '',
        error: String(
          error?.message || error || 'Не удалось проверить обновление',
        ),
      }

      return updateState.value
    }
  }

  async function openDownloadPage() {
    if (!updateState.value.downloadUrl) return
    await openUrl(updateState.value.downloadUrl)
  }

  return {
    updateState,
    checkAppUpdate,
    openDownloadPage,
  }
}
