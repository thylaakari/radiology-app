export function useBackupReminder() {
  const toast = useToast()

  const lastBackupAt = useState('backup:last-backup-at', () => null)
  const reminderShown = useState('backup:reminder-shown', () => false)
  const loading = useState('backup:loading', () => false)

  const WEEK_MS = 7 * 24 * 60 * 60 * 1000
  const SETTINGS_KEY = 'lastBackupAt'

  const hasBackup = computed(() => Boolean(lastBackupAt.value))

  const msFromLastBackup = computed(() => {
    if (!lastBackupAt.value) return null

    const timestamp = new Date(lastBackupAt.value).getTime()
    if (Number.isNaN(timestamp)) return null

    return Date.now() - timestamp
  })

  const isBackupExpired = computed(() => {
    if (!lastBackupAt.value) return true
    if (msFromLastBackup.value === null) return true

    return msFromLastBackup.value >= WEEK_MS
  })

  const daysFromLastBackup = computed(() => {
    if (msFromLastBackup.value === null) return null
    return Math.floor(msFromLastBackup.value / (24 * 60 * 60 * 1000))
  })

  async function loadLastBackupAt() {
    if (import.meta.server) return null

    loading.value = true

    try {
      const row = await db.settings.get(SETTINGS_KEY)
      lastBackupAt.value = row?.value || null
      return lastBackupAt.value
    } finally {
      loading.value = false
    }
  }

  async function markBackupDone(date = new Date()) {
    if (import.meta.server) return null

    const value = typeof date === 'string' ? new Date(date) : date

    if (Number.isNaN(value.getTime())) {
      throw new Error('Некорректная дата бэкапа')
    }

    const iso = value.toISOString()

    await db.settings.put({
      key: SETTINGS_KEY,
      value: iso,
      updatedAt: new Date().toISOString(),
    })

    lastBackupAt.value = iso
    reminderShown.value = false

    return iso
  }

  async function resetBackupReminder() {
    if (import.meta.server) return

    await db.settings.delete(SETTINGS_KEY)
    lastBackupAt.value = null
    reminderShown.value = false
  }

  function canShowReminder() {
    return isBackupExpired.value && !reminderShown.value
  }

  function showBackupReminder(options = {}) {
    if (!canShowReminder()) return false

    const title = options.title || 'Давно не делался бэкап'

    let description = options.description
    if (!description) {
      description = hasBackup.value
        ? `С последнего экспорта прошло ${daysFromLastBackup.value} дн. Рекомендуется делать резервную копию хотя бы раз в неделю.`
        : 'Резервная копия ещё не создавалась. Рекомендуется делать экспорт базы хотя бы раз в неделю.'
    }

    toast.add({
      title,
      description,
      color: options.color || 'warning',
      icon: options.icon || 'i-lucide-triangle-alert',
      duration: options.duration || 8000,
    })

    reminderShown.value = true
    return true
  }

  async function checkBackupReminder(options = {}) {
    await loadLastBackupAt()
    return showBackupReminder(options)
  }

  return {
    loading,
    lastBackupAt,
    hasBackup,
    isBackupExpired,
    daysFromLastBackup,
    loadLastBackupAt,
    markBackupDone,
    resetBackupReminder,
    canShowReminder,
    showBackupReminder,
    checkBackupReminder,
  }
}
