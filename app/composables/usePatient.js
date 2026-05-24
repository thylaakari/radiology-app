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
    const lInitial = data.lastName ? data.lastName[0].toUpperCase() : ''
    const fInitial = data.firstName ? data.firstName[0].toUpperCase() : ''
    const mInitial = data.middleName ? data.middleName[0].toUpperCase() : ''
    const shortName = `${lInitial}${fInitial}${mInitial}`
    const timestamp = new Date().toISOString()
    const patient = {
      ...data,
      id: data.id || crypto.randomUUID(),
      shortName,
      birthDate: data.birthDate?.toDate('UTC').toISOString().split('T')[0],
      createdAt: timestamp,
      updatedAt: timestamp,
      deleted: false,
    }

    await db.patients.put(patient)

    toast.add({
      title: 'Пациент сохранен',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })

    return patient
  }

  const getPatients = async ({ page = 0, pageSize = 10, search = '' } = {}) => {
    let query = db.patients.filter((p) => !p.deleted)

    if (search) {
      const s = search.toLowerCase()

      query = query.and((p) => p.shortName?.toLowerCase().includes(s))
    }

    const total = await query.count()

    const items = await query
      .offset(page * pageSize)
      .limit(pageSize)
      .toArray()

    return {
      items,
      total,
    }
  }

  const getPatientById = async (id) => {
    return await db.patients.get(id)
  }

  const deletePatient = async (id) => {
    const patient = await db.patients.get(id)

    if (!patient) return

    await db.patients.update(id, {
      deleted: true,
      updatedAt: new Date().toISOString(),
    })

    toast.add({
      title: 'Пациент удален',
      color: 'warning',
      icon: 'i-lucide-trash',
    })
  }

  const formatBirthDate = (date) => {
    if (!date) return ''

    return date.split('-').reverse().join('.')
  }

  const getAge = (birthDate) => {
    if (!birthDate) return 0

    const today = new Date()
    const birth = new Date(birthDate)

    let age = today.getFullYear() - birth.getFullYear()

    const monthDiff = today.getMonth() - birth.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--
    }

    return age
  }

  const getAgeLabel = (age) => {
    const mod10 = age % 10
    const mod100 = age % 100

    if (mod100 >= 11 && mod100 <= 14) {
      return 'лет'
    }

    if (mod10 === 1) {
      return 'год'
    }

    if (mod10 >= 2 && mod10 <= 4) {
      return 'года'
    }

    return 'лет'
  }

  const formatAge = (birthDate) => {
    const age = getAge(birthDate)

    return `${age} ${getAgeLabel(age)}`
  }

  return {
    savePatient,
    getPatients,
    getPatientById,
    deletePatient,

    formatBirthDate,
    getAge,
    getAgeLabel,
    formatAge,
  }
}
