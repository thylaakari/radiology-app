<script setup>
const router = useRouter()

const { setTitle } = useMetaData()

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

const genderOptions = [
  { label: 'Мужской', value: 'M' },
  { label: 'Женский', value: 'F' },
  { label: 'Не указан', value: 'U' },
]

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
  <UContainer :ui="{ base: 'mx-0' }">
    <UButton
      label="Назад"
      icon="i-lucide-arrow-left"
      @click="router.back()"
      variant="link"
    />

    <div class="flex flex-col gap-2 mb-4">
      <h1 class="text-2xl font-bold tracking-tight">
        {{ patient.lastName }} {{ patient.firstName }}
        {{ patient.middleName }}
      </h1>

      <div class="flex flex-wrap items-center gap-2">
        <UBadge :label="`ID: ${patient.id}`" variant="soft" color="neutral" />

        <UBadge
          :label="
            patient.gender === 'M'
              ? 'Мужчина'
              : patient.gender === 'F'
                ? 'Женщина'
                : 'Пол: Неизвестен'
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
    </div>

    <div class="flex flex-col gap-4">
      <USeparator />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField label="Фамилия">
          <UInput
            v-model="patient.lastName"
            placeholder="Введите фамилию"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Имя">
          <UInput
            v-model="patient.firstName"
            placeholder="Введите имя"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Отчество">
          <UInput
            v-model="patient.middleName"
            placeholder="Введите отчество"
            class="w-full"
          />
        </UFormField>
      </div>

      <div class="flex gap-4">
        <UFormField label="Дата рождения" class="flex-1">
          <UInput
            v-model="patient.birthDate"
            type="date"
            icon="i-lucide-calendar"
          />
        </UFormField>

        <UFormField label="Пол пациента">
          <USelect v-model="patient.gender" :items="genderOptions" />
        </UFormField>
      </div>

      <UButton label="Сохранить изменения" icon="i-lucide-save" block />

      <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-clock" />
          <span>Карточка создана: {{ patient.createdAt }}</span>
        </div>

        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-refresh-cw" />
          <span>Последнее обновление: {{ patient.updatedAt }}</span>
        </div>
      </div>
    </div>
  </UContainer>
</template>
