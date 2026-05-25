<script setup>
const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
})

const { patient } = toRefs(props)

const fullName = computed(() => {
  return [
    patient.value.lastName,
    patient.value.firstName,
    patient.value.middleName,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold tracking-tight">
        {{ fullName }}
      </h1>

      <div class="flex flex-wrap items-center gap-2">
        <UBadge
          :label="formatGender(patient.gender)"
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

    <div class="flex flex-wrap gap-2">
      <UBadge color="neutral" variant="subtle"> ID: {{ patient.id }} </UBadge>

      <UBadge color="neutral" variant="subtle">
        Создан: {{ formatDate(patient.createdAt) }}
      </UBadge>

      <UBadge color="neutral" variant="subtle">
        Обновлен: {{ formatDate(patient.updatedAt) }}
      </UBadge>
    </div>
  </div>
</template>
