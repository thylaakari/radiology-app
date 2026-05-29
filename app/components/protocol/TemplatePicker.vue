<script setup>
const { getTemplates } = useTemplate()
const { applyTemplate } = useProtocolEditor()

const templates = ref([])

onMounted(async () => {
  templates.value = await getTemplates()
})

const templatesByModality = computed(() => {
  return Object.values(modalityMap).map((modality) => ({
    modality,
    templates: templates.value.filter((t) => t.modality === modality.label),
  }))
})

const accordionItems = computed(() =>
  templatesByModality.value.map(({ modality, templates }) => ({
    label: modality.label,
    color: modality.color,
    templates,
    slot: modality.code,
  })),
)
</script>

<template>
  <h2 class="text-lg font-semibold tracking-tight">Шаблоны</h2>

  <UAccordion :items="accordionItems" class="divide-y divide-default">
    <template #leading="{ item }">
      <UBadge
        :label="item.label"
        :color="item.color"
        variant="soft"
        size="xs"
        class="uppercase"
      />
    </template>

    <template
      v-for="mod in accordionItems"
      :key="mod.slot"
      #[mod.slot]="{ item }"
    >
      <div
        v-if="!item.templates.length"
        class="px-4 py-3 text-sm text-muted italic"
      >
        Нет шаблонов
      </div>

      <ul v-else class="py-1">
        <li
          v-for="template in item.templates"
          :key="template.id"
          class="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-elevated transition-colors rounded-md"
          @click="applyTemplate(template)"
        >
          <UIcon name="i-lucide-file-text" class="size-4 shrink-0 text-muted" />
          <span class="flex-1 truncate">{{ template.name }}</span>
          <span class="text-xs text-muted shrink-0">{{ template.region }}</span>
        </li>
      </ul>
    </template>
  </UAccordion>
</template>
