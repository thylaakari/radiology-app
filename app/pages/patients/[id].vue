<script setup>
import { parseDate } from '@internationalized/date'

const router = useRouter()
const { setTitle } = useMetaData()
const { getPatientById, savePatient } = usePatient()
const route = useRoute()

const patient = ref(null)

const genderOptions = [
  { label: 'Мужской', value: 'M' },
  { label: 'Женский', value: 'F' },
  { label: 'Не указан', value: 'U' },
]

const updateTitle = async () => {
  const fullname = `${patient.value.lastName} ${patient.value.firstName} ${patient.value.middleName}`

  await setTitle({
    name: fullname,
    birthDate: formatBirthDate(patient.value.birthDate),
  })
}

onMounted(async () => {
  patient.value = await getPatientById(route.params.id)
  if (!patient.value) {
    return router.push('/patients')
  }
  patient.value.birthDate = parseDate(patient.value.birthDate)
  await updateTitle()
})

const onSave = async () => {
  await savePatient(patient.value)
  await updateTitle()
}
</script>

<template>
  <UContainer v-if="patient" :ui="{ base: 'mx-0' }">
    <UButton
      label="Назад"
      icon="i-lucide-arrow-left"
      variant="link"
      @click="router.back()"
    />

    <div class="mb-4 flex flex-col gap-2">
      <h1 class="text-2xl font-bold tracking-tight">
        {{ patient.lastName }}
        {{ patient.firstName }}
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
                : 'Пол не указан'
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

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
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
          <UInputDate v-model="patient.birthDate" icon="i-lucide-calendar" />
        </UFormField>

        <UFormField label="Пол пациента">
          <USelect v-model="patient.gender" :items="genderOptions" />
        </UFormField>
      </div>

      <UButton
        label="Сохранить изменения"
        icon="i-lucide-save"
        block
        @click="onSave"
      />

      <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-clock" />
          <span> Карточка создана: {{ formatDate(patient.createdAt) }} </span>
        </div>

        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-refresh-cw" />
          <span>
            Последнее обновление: {{ formatDate(patient.updatedAt) }}
          </span>
        </div>
      </div>
    </div>
  </UContainer>
</template>
