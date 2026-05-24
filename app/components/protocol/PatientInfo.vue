<script setup>
const patient = ref({
  id: '4586',
  shortName: 'Павлов И. Ж.',
  firstName: 'Илья',
  middleName: 'Жопович',
  lastName: 'Павлов',
  birthDate: '2022-03-26',
  gender: 'M',
  createdAt: '23.05.2026 13:10',
  updatedAt: '23.05.2026 15:45',
  deleted: false,
})

const { formatBirthDate, formatAge } = usePatient()

onMounted(async () => {
  const fullname = `${patient.value.lastName} ${patient.value.firstName} ${patient.value.middleName}`
  await setTitle({
    name: fullname,
    birthDate: patient.value.birthDate.split('-').reverse().join('.'),
  })
})
</script>

<template>
  <div class="flex gap-2 align-middle">
    <h1 class="text-2xl font-bold tracking-tight inline">
      {{ patient.lastName }} {{ patient.firstName }} {{ patient.middleName }}
    </h1>
    <UBadge
      :label="
        patient.gender === 'M'
          ? 'Мужской'
          : patient.gender === 'F'
            ? 'Женский'
            : 'Пол: не указан'
      "
      color="neutral"
      variant="subtle"
    />

    <UBadge
      icon="i-lucide-cake"
      variant="outline"
      color="neutral"
      :label="`${formatBirthDate(patient.birthDate)} • ${formatAge(patient.birthDate)}`"
    />
  </div>
</template>
