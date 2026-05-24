<script setup>
const report = ref({
  id: 'report_9f8b2c4a-31e5-4d72',
  patientId: '4586',
  modality: 'ct',
  studyDescription:
    'Компьютерная томография органов брюшной полости и забрюшинного пространства с внутривенным болюсным контрастированием',

  description:
    'Печень: не увеличена (КВР правой доли 148 мм), контуры ровные, четкие. Структура паренхимы однородная, плотность в нативную фазу +54 HU. В S4 определяется гиподенсное округлое образование с четкими контурами диаметром 12 мм, накапливающее контрастный препарат центрипетально в артериальную фазу, с задерживанием в венозную и отсроченную фазы (гемангиома). \nЖелчный пузырь: обычной формы, размеры 72х24 мм, стенка не утолщена (2 мм), рентгеноконтрастные конкременты не определяются. Холедох не расширен (5 мм). \nПоджелудочная железа: размеры головки 26 мм, тела 18 мм, хвоста 16 мм. Контуры четкие, волнистые. Структура дольчатая, плотность паренхимы сохранена. Вирсунгов проток не расширен. \nСелезенка: размеры 110х45 мм, контуры ровные, структура однородная. \nПочки: расположены обычно, размеры и форма сохранены. Паренхима толщиной до 17 мм, дифференцировка сохранена. Чашечно-лоханочная система не расширена. Рентгеноконтрастные конкременты не визуализируются. \nСвободная жидкость в брюшной полости не определяется. Лимфатические узлы брюшной полости и забрюшинного пространства не увеличены.',

  conclusion:
    'КТ-картина очагового образования S4 печени (более вероятно, кавернозная гемангиома). Органы брюшной полости и забрюшинного пространства без видимой острой патологии.',

  createdAt: '23.05.2026 13:10',
  updatedAt: '23.05.2026 13:15',
  deleted: false,
})

const modalityItems = ref(['КТ', 'МРТ', 'Рентген'])
const modalityValue = ref('КТ')
</script>

<template>
  <div class="flex flex-col gap-3 mb-5">
    <UFormField label="Область исследования">
      <UInput v-model="report.studyDescription" class="w-full" />
    </UFormField>
    <div class="flex gap-4 align-center">
      <UFormField>
        <USelect v-model="modalityValue" :items="modalityItems" class="w-30" />
      </UFormField>
      <UBadge
        icon="i-lucide-calendar"
        color="neutral"
        variant="outline"
        :label="`Создан: ${report.createdAt}`"
      />
      <div class="flex gap-2 items-center">
        <UChip standalone inset class="animate-pulse" />
        <span>Автосохранение</span>
      </div>
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
</template>
