import { z } from 'zod'
import { db } from '~/composables/useDb'

export const patientSchema = z.object({
  lastName: z.string().min(1, 'Введите фамилию'),
  firstName: z.string(),
  middleName: z.string(),
  birthDate: z.any(),
  gender: z.enum(['M', 'F', 'U']),
})

export const usePatient = () => {
  const toast = useToast()

  const savePatient = async (data) => {
    const timestamp = new Date().toISOString()

    const lInitial = data.lastName?.[0]?.toUpperCase() || ''
    const fInitial = data.firstName?.[0]?.toUpperCase() || ''
    const mInitial = data.middleName?.[0]?.toUpperCase() || ''

    const patient = {
      ...data,
      id: data.id || crypto.randomUUID(),
      shortName: `${lInitial}${fInitial}${mInitial}`,
      birthDate: data.birthDate?.toString(),
      createdAt: data.createdAt || timestamp,
      updatedAt: timestamp,
      deleted: false,
    }

    await db.patients.put(patient)

    toast.add({
      title: data.id ? 'Пациент обновлен' : 'Пациент создан',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })

    return patient
  }

  const getPatients = async ({ page = 0, pageSize = 10 } = {}) => {
    let query = db.patients.filter((p) => !p.deleted)

    const total = await query.count()
    const items = await query
      .offset(page * pageSize)
      .limit(pageSize)
      .toArray()

    return {
      total,
      items: items.map((p) => ({
        ...p,
        fullName: `${p.lastName} ${p.firstName} ${p.middleName}`.trim(),
      })),
    }
  }

  const getPatientById = async (id) => {
    return await db.patients.get(id)
  }

  const deletePatient = async (id) => {
    const patient = await db.patients.get(id)
    if (!patient) return { reportsUpdated: 0 }

    const timestamp = new Date().toISOString()
    let reportsUpdated = 0

    await db.transaction('rw', db.patients, db.reports, async () => {
      await db.patients.update(id, {
        deleted: true,
        updatedAt: timestamp,
      })

      reportsUpdated = await db.reports.where('patientId').equals(id).modify({
        deleted: true,
        updatedAt: timestamp,
      })
    })

    toast.add({
      title: 'Пациент удален. Удалено протоколов: ' + reportsUpdated,
      color: 'warning',
      icon: 'i-lucide-trash',
    })

    return { reportsUpdated }
  }

  return {
    savePatient,
    getPatients,
    getPatientById,
    deletePatient,
  }
}
