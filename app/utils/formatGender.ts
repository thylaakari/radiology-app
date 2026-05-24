export const formatGender = (gender?: string) =>
  ({
    M: 'М',
    F: 'Ж',
  })[gender ?? ''] ?? '-'
