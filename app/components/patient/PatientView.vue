<script setup>
import { patientSchema } from '~/composables/usePatient'

const patient = defineModel('patient', {
  type: Object,
  default: () => ({
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: null,
    gender: 'M',
  }),
})

const { savePatient, deletePatient } = usePatient()
const router = useRouter()
const route = useRoute()
const isDeleteOpen = ref(false)

const genderOptions = [
  { label: 'Мужской', value: 'M' },
  { label: 'Женский', value: 'F' },
  { label: 'Не указан', value: 'U' },
]

onMounted(() => {
  if (route.params.id) {
    patient.value.id = route.params.id
  }
})

const onSubmit = async (event) => {
  if (patient.value.id) {
    emit('submit', { ...event.data, id: patient.value.id })
  } else {
    const createdPatient = await savePatient(event.data)
    if (route.query.reportCreate) {
      router.push(`/reports/create/${createdPatient.id}`)
    } else {
      router.push(`/patients/${createdPatient.id}`)
    }
  }
}

const onDelete = async () => {
  if (!patient.value.id) return

  await deletePatient(patient.value.id)
  isDeleteOpen.value = false
  router.push('/patients')
}

const emit = defineEmits(['submit'])
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

    <div class="flex gap-2">
      <UButton
        type="submit"
        label="Сохранить пациента"
        icon="i-lucide-save"
        block
      />
      <UButton
        type="button"
        icon="i-lucide-trash"
        color="error"
        variant="soft"
        @click="isDeleteOpen = true"
      />
    </div>
  </UForm>

  <UModal v-model:open="isDeleteOpen">
    <template #content>
      <div class="p-6 space-y-4">
        <div class="space-y-1">
          <h3 class="text-lg font-semibold">Удалить пациента?</h3>
          <p class="text-sm text-muted">
            Пациент будет помечен как удаленный. Все связанные протоколы тоже
            будут помечены как удаленные.
          </p>
        </div>

        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="soft" @click="isDeleteOpen = false">
            Отмена
          </UButton>

          <UButton
            type="button"
            icon="i-lucide-trash"
            color="error"
            variant="soft"
            @click="onDelete"
          >
            Удалить
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
