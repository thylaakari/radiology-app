<script setup>
const { setTitle } = useMetaData()
let patientFullname = 'Павлов Илья Жопович'
let patientBirthDate = '01.01.2001'
await setTitle({
  name: patientFullname,
  birthDate: patientBirthDate,
})

const router = useRouter()
const report = ref({
  id: 'report_9f8b2c4a-31e5-4d72',
  patientId: '4586', // ID пациента (например, ВЛА из предыдущего списка)
  modality: 'ct',
  studyDescription:
    'Компьютерная томография органов брюшной полости и забрюшинного пространства с внутривенным болюсным контрастированием',

  // Подробное описание исследования (находки по органам)
  description:
    'Печень: не увеличена (КВР правой доли 148 мм), контуры ровные, четкие. Структура паренхимы однородная, плотность в нативную фазу +54 HU. В S4 определяется гиподенсное округлое образование с четкими контурами диаметром 12 мм, накапливающее контрастный препарат центрипетально в артериальную фазу, с задерживанием в венозную и отсроченную фазы (гемангиома). \nЖелчный пузырь: обычной формы, размеры 72х24 мм, стенка не утолщена (2 мм), рентгеноконтрастные конкременты не определяются. Холедох не расширен (5 мм). \nПоджелудочная железа: размеры головки 26 мм, тела 18 мм, хвоста 16 мм. Контуры четкие, волнистые. Структура дольчатая, плотность паренхимы сохранена. Вирсунгов проток не расширен. \nСелезенка: размеры 110х45 мм, контуры ровные, структура однородная. \nПочки: расположены обычно, размеры и форма сохранены. Паренхима толщиной до 17 мм, дифференцировка сохранена. Чашечно-лоханочная система не расширена. Рентгеноконтрастные конкременты не визуализируются. \nСвободная жидкость в брюшной полости не определяется. Лимфатические узлы брюшной полости и забрюшинного пространства не увеличены.',

  // Заключение радиолога
  conclusion:
    'КТ-картина очагового образования S4 печени (более вероятно, кавернозная гемангиома). Органы брюшной полости и забрюшинного пространства без видимой острой патологии.',

  createdAt: '23.05.2026 13:10',
  updatedAt: '23.05.2026 13:15',
  deleted: false,
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
    <div class="flex flex-col gap-3 mb-5">
      <h1 class="text-xl font-semibold leading-snug">
        {{ report.studyDescription }}
      </h1>

      <div class="flex flex-wrap items-center gap-2">
        <UBadge :label="report.modality.toUpperCase()" variant="soft" />
        <UBadge
          icon="i-lucide-calendar"
          color="neutral"
          variant="outline"
          :label="`Создан: ${report.createdAt}`"
        />
        <UBadge
          icon="i-lucide-calendar"
          color="neutral"
          variant="outline"
          :label="`Обновлен: ${report.updatedAt}`"
        />
      </div>
    </div>

    <div class="w-full flex flex-col gap-4">
      <CommonEditor
        v-model="report.description"
        placeholder="Описание..."
        height-class="min-h-100"
      />
      <CommonEditor v-model="report.conclusion" placeholder="Заключение..." />
      <UButton label="Сохранить" icon="i-lucide-save" block />
    </div>
  </UContainer>
</template>
