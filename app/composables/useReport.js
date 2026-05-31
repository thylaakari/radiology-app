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
        title: reportData.id ? 'Протокол обновлен' : 'Протокол сохранен',
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

  async function getReports() {
    const reports = await db.reports.orderBy('createdAt').reverse().toArray()
    const patients = await db.patients.toArray()

    const patientsMap = Object.fromEntries(
      patients.map((p) => [
        p.id,
        `${p.lastName} ${p.firstName} ${p.middleName}`.trim(),
      ]),
    )

    return reports.map((report) => ({
      ...report,
      fullName: patientsMap[report.patientId] || '—',
    }))
  }

  async function getReportById(id) {
    return await db.reports.get(id)
  }

  async function getReportByPatientId(patientId) {
    try {
      const reports = await db.reports
        .where('patientId')
        .equals(patientId)
        .reverse()
        .sortBy('createdAt')

      return reports
    } catch (error) {
      toast.add({
        title: 'Ошибка получения протоколов',
        description: 'Не удалось получить протоколы',
        icon: 'i-lucide-circle-alert',
        color: 'error',
      })
      return []
    }
  }

  async function countToday() {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    return await db.reports
      .where('createdAt')
      .aboveOrEqual(start.toISOString())
      .count()
  }

  async function countThisMonth() {
    const start = new Date()
    start.setDate(1)
    start.setHours(0, 0, 0, 0)
    return await db.reports
      .where('createdAt')
      .aboveOrEqual(start.toISOString())
      .count()
  }

  async function countTotal() {
    return await db.reports.count()
  }

  async function getRecentReports(limit = 3) {
    const reports = await db.reports
      .orderBy('createdAt')
      .reverse()
      .limit(limit)
      .toArray()

    const patientIds = [...new Set(reports.map((r) => r.patientId))]
    const patients = await db.patients.where('id').anyOf(patientIds).toArray()

    const patientsMap = Object.fromEntries(
      patients.map((p) => [
        p.id,
        `${p.lastName} ${p.firstName} ${p.middleName}`.trim(),
      ]),
    )

    return reports.map((report) => ({
      ...report,
      fullName: patientsMap[report.patientId] || '—',
    }))
  }

  return {
    saveReport,
    getReports,
    getReportById,
    getReportByPatientId,
    getRecentReports,
    countToday,
    countThisMonth,
    countTotal,
  }
}
