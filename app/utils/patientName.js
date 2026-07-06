export function capitalizePart(value = '') {
  const s = String(value).toLocaleLowerCase('ru-RU')
  return s.charAt(0).toLocaleUpperCase('ru-RU') + s.slice(1)
}

export function normalizeName(value = '') {
  return String(value)
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) =>
      word
        .split('-')
        .map((part) => capitalizePart(part))
        .join('-'),
    )
    .join(' ')
}
