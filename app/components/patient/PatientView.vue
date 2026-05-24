<script setup>
import { patientSchema } from '~/composables/usePatient'

const { savePatient } = usePatient()
const router = useRouter()
const patient = ref({
  id: '',
  firstName: '',
  middleName: '',
  lastName: '',
  birthDate: null,
  gender: 'M',
})

const genderOptions = [
  { label: 'Мужской', value: 'M' },
  { label: 'Женский', value: 'F' },
  { label: 'Не указан', value: 'U' },
]

const onSubmit = async (event) => {
  const createdPatient = await savePatient(event.data)

  router.push(`/patients/${createdPatient.id}`)

  patient.value = {
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: null,
    gender: 'M',
  }
}
</script>

<template>
  <UForm
    :schema="patientSchema"
    :state="patient"
    class="flex flex-col gap-6"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UFormField label="Фамилия" name="lastName">
        <UInput
          v-model="patient.lastName"
          placeholder="Введите фамилию"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Имя" name="firstName">
        <UInput
          v-model="patient.firstName"
          placeholder="Введите имя"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Отчество" name="middleName">
        <UInput
          v-model="patient.middleName"
          placeholder="Введите отчество"
          class="w-full"
        />
      </UFormField>
    </div>

    <div class="flex gap-4">
      <UFormField label="Дата рождения" name="birthDate">
        <UInputDate v-model="patient.birthDate" icon="i-lucide-calendar" />
      </UFormField>

      <UFormField label="Пол" name="gender">
        <USelect v-model="patient.gender" :items="genderOptions" class="w-32" />
      </UFormField>
    </div>

    <UButton
      type="submit"
      label="Сохранить пациента"
      icon="i-lucide-save"
      block
    />
  </UForm>
</template>
