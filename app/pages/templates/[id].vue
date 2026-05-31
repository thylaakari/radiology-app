<script setup>
import { templateSchema } from '~/composables/useTemplate'

const { setTitle } = useMetaData()
const { getTemplateById, saveTemplate } = useTemplate()

const router = useRouter()
const route = useRoute()

const isEdit = route.params.id === 'create' ? false : true

const template = ref({
  name: '',
  modality: '',
  region: '',
  description: '',
  conclusion: '',
})

const regionOptions = [
  { label: 'Голова', value: 'Голова' },
  { label: 'Шея', value: 'Шея' },
  { label: 'Грудная клетка', value: 'Грудная клетка' },
  { label: 'Живот', value: 'Живот' },
  { label: 'Таз', value: 'Таз' },
  { label: 'Верхние конечности', value: 'Верхние конечности' },
  { label: 'Нижние конечности', value: 'Нижние конечности' },
]

onMounted(async () => {
  await setTitle(isEdit ? 'Редактирование шаблона' : 'Новый шаблон')

  if (isEdit) {
    const existing = await getTemplateById(route.params.id)
    template.value = { ...existing }
  }
})

const onSubmit = async (event) => {
  const saved = await saveTemplate({
    ...event.data,
    id: isEdit ? route.params.id : undefined,
  })
  router.push(isEdit ? `/templates/${saved.id}` : '/templates')
}
</script>

<template>
  <CommonRouterBack />
  <UForm
    :schema="templateSchema"
    :state="template"
    class="flex flex-col gap-6"
    @submit="onSubmit"
  >
    <UFormField label="Название шаблона" name="name">
      <UInput
        v-model="template.name"
        placeholder="Например: КТ грудной клетки без к/у — норма"
        class="w-full"
      />
    </UFormField>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UFormField label="Модальность" name="modality">
        <USelect
          v-model="template.modality"
          :items="modalityItems"
          placeholder="Выберите модальность"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Часть тела" name="region">
        <USelect
          v-model="template.region"
          :items="regionOptions"
          placeholder="Выберите часть тела"
          class="w-full"
        />
      </UFormField>
    </div>

    <CommonEditor
      v-model="template.description"
      placeholder="Описание..."
      heightClass="min-h-100"
    />

    <CommonEditor v-model="template.conclusion" placeholder="Заключение..." />

    <div class="flex items-center gap-3 pt-2">
      <UButton
        type="submit"
        :label="isEdit ? 'Сохранить изменения' : 'Создать шаблон'"
        icon="i-lucide-save"
        block
      />
    </div>
  </UForm>
</template>
