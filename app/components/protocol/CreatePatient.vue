<script setup>
const router = useRouter()

const patient = ref({
  id: '4586',
  shortName: '',
  firstName: '',
  middleName: '',
  lastName: '',
  birthDate: '',
  gender: 'M',
  createdAt: '',
  updatedAt: '',
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
})
</script>

<template>
  <div class="flex flex-col gap-4">
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
      <UFormField label="Дата рождения">
        <UInputDate v-model="patient.birthDate" icon="i-lucide-calendar" />
      </UFormField>

      <UFormField label="Пол">
        <USelect v-model="patient.gender" :items="genderOptions" />
      </UFormField>
    </div>

    <UButton label="Найти пациента" icon="i-lucide-save" block />
    <UButton
      label="Создать протокол с пустым пациентом"
      icon="i-lucide-plus"
      variant="outline"
      block
    />
  </div>
</template>
