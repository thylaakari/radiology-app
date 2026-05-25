export const normalizeDate = (date) => {
  if (!date) return ''

  return typeof date === 'string' ? date : date.toString()
}

export const formatBirthDate = (date) => {
  const value = normalizeDate(date)

  if (!value) return ''

  return value.split('-').reverse().join('.')
}

export const getAge = (birthDate) => {
  const value = normalizeDate(birthDate)

  if (!value) return 0

  const today = new Date()
  const birth = new Date(value)

  let age = today.getFullYear() - birth.getFullYear()

  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export const getAgeLabel = (age) => {
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

export const formatAge = (birthDate) => {
  const age = getAge(birthDate)

  return `${age} ${getAgeLabel(age)}`
}
