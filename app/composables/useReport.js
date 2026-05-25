import { db } from '~/composables/useDb'

export function useReport() {
  const toast = useToast()

  async function saveReport(report) {
    try {
      const timestamp = new Date().toISOString()
      const reportData = {
        ...report,
        id: report.id || crypto.randomUUID(),
        createdAt: report.createdAt || timestamp,
        updatedAt: timestamp,
      }
      await db.reports.put(reportData)
      toast.add({
        title: 'Протокол сохранен',
        icon: 'i-lucide-check',
        color: 'success',
      })
      return reportData
    } catch (error) {
      toast.add({
        title: 'Ошибка сохранения',
        description: 'Не удалось сохранить протокол',
        icon: 'i-lucide-circle-alert',
        color: 'error',
      })

      throw error
    }
  }

  async function getReportById(id) {
    return await db.reports.get(id)
  }

  return {
    saveReport,
    getReportById,
  }
}
