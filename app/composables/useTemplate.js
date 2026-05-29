import { z } from 'zod'
import { db } from '~/composables/useDb'

export const templateSchema = z.object({
  name: z.string().min(1, 'Введите название'),
  modality: z.string().min(1, 'Выберите модальность'),
  region: z.string().min(1, 'Выберите часть тела'),
  description: z.string().min(1, 'Введите описание'),
  conclusion: z.string().min(1, 'Введите заключение'),
})

export function useTemplate() {
  const toast = useToast()

  async function saveTemplate(template) {
    try {
      const timestamp = new Date().toISOString()
      const templateData = {
        ...template,
        id: template.id || crypto.randomUUID(),
        createdAt: template.createdAt || timestamp,
        updatedAt: timestamp,
      }
      await db.templates.put(templateData)
      toast.add({
        title: template.id ? 'Шаблон обновлен' : 'Шаблон сохранен',
        icon: 'i-lucide-check',
        color: 'success',
      })
      return templateData
    } catch (error) {
      toast.add({
        title: 'Ошибка сохранения',
        description: 'Не удалось сохранить шаблон',
        icon: 'i-lucide-circle-alert',
        color: 'error',
      })

      throw error
    }
  }

  async function getTemplates() {
    return await db.templates.orderBy('createdAt').reverse().toArray()
  }

  async function getTemplateById(id) {
    return await db.templates.get(id)
  }

  return {
    saveTemplate,
    getTemplates,
    getTemplateById,
  }
}
