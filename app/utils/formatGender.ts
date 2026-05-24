export const formatGender = (gender?: string) =>
  ({
    M: 'Мужской',
    F: 'Женский',
  })[gender ?? ''] ?? 'Пол: -'
