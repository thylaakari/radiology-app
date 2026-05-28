<script setup>
const props = defineProps({
  heightClass: {
    type: String,
    default: 'min-h-30',
  },
})

const value = defineModel()

const items = [
  [
    { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' },
    { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' },
    { kind: 'mark', mark: 'underline', icon: 'i-lucide-underline' },
  ],
  [
    { kind: 'bulletList', icon: 'i-lucide-list' },
    { kind: 'orderedList', icon: 'i-lucide-list-ordered' },
  ],
  [
    { kind: 'link', icon: 'i-lucide-link' },
    { kind: 'horizontalRule', icon: 'i-lucide-minus' },
  ],
  [
    { kind: 'undo', icon: 'i-lucide-undo' },
    { kind: 'redo', icon: 'i-lucide-redo' },
  ],
]
</script>

<template>
  <UEditor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    :ui="{
      content: [
        props.heightClass,
        'flex flex-col [&>.tiptap]:flex-1 [&>.tiptap]:p-4 [&>.tiptap]:focus:outline-none',
      ],
    }"
    class="border border-default focus-within:border-primary rounded-xl"
  >
    <UEditorToolbar
      :editor="editor"
      :items="items"
      class="border-b border-default p-1.5"
    />
  </UEditor>
</template>
