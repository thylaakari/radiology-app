import { save, open } from '@tauri-apps/plugin-dialog'
import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs'
import { db } from '~/composables/useDb'

export function useDbExport() {
  const exporting = ref(false)
  const importing = ref(false)

  async function exportDb() {
    try {
      exporting.value = true

      const [patients, reports, templates] = await Promise.all([
        db.patients.toArray(),
        db.reports.toArray(),
        db.templates.toArray(),
      ])

      const data = {
        version: 7,
        exportedAt: new Date().toISOString(),
        patients,
        reports,
        templates,
      }

      const filePath = await save({
        defaultPath: `radiology-hub-${new Date().toISOString().slice(0, 10)}.json`,
        filters: [{ name: 'JSON', extensions: ['json'] }],
        title: 'Экспорт базы данных',
      })

      if (!filePath) return

      await writeTextFile(filePath, JSON.stringify(data, null, 2))
    } finally {
      exporting.value = false
    }
  }

  async function importDb() {
    try {
      importing.value = true

      const filePath = await open({
        filters: [{ name: 'JSON', extensions: ['json'] }],
        title: 'Импорт базы данных',
        multiple: false,
      })

      if (!filePath) return

      const raw = await readTextFile(filePath)
      const data = JSON.parse(raw)

      // базовая валидация структуры
      if (!data.patients || !data.reports || !data.templates) {
        throw new Error('Неверный формат файла')
      }

      // bulkPut — обновит существующие записи, добавит новые
      await Promise.all([
        db.patients.bulkPut(data.patients),
        db.reports.bulkPut(data.reports),
        db.templates.bulkPut(data.templates),
      ])

      return {
        patients: data.patients.length,
        reports: data.reports.length,
        templates: data.templates.length,
      }
    } finally {
      importing.value = false
    }
  }

  return { exportDb, exporting, importDb, importing }
}
