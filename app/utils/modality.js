export const modalityMap = {
  КТ: {
    code: 'ct',
    label: 'КТ',
    color: 'secondary',
  },

  МРТ: {
    code: 'mri',
    label: 'МРТ',
    color: 'error',
  },

  Рентген: {
    code: 'xr',
    label: 'Рентген',
    color: 'neutral',
  },

  УЗИ: {
    code: 'us',
    label: 'УЗИ',
    color: 'warning',
  },
}

export const modalityItems = Object.values(modalityMap).map((item) => ({
  label: item.label,
  value: item.label,
}))

export function getModalityConfig(modality) {
  return (
    modalityMap[modality] || {
      code: 'unknown',
      label: modality,
      color: 'neutral',
    }
  )
}
