<script setup lang="ts">
import * as monaco from 'monaco-editor'

const diffRef = $ref(null)

let diffEditor: monaco.editor.IStandaloneDiffEditor

onMounted(() => {
  const originalModel = monaco.editor.createModel('', 'text/plain')
  const modifiedModel = monaco.editor.createModel('', 'text/plain')

  diffEditor = monaco.editor.createDiffEditor(diffRef as any, {
    originalEditable: true,
    readOnly: false,
    automaticLayout: true,
  })

  useVsTheme(diffEditor)

  diffEditor.setModel({
    original: originalModel,
    modified: modifiedModel,
  })
})

function inline(value: boolean) {
  diffEditor.updateOptions({
    renderSideBySide: !value,
  })
}
</script>

<template>
  <div class="absolute wh-full p-3 box-border flex flex-col">
    <div class="bg-base p-3">
      <n-checkbox label="行内比较" @update:checked="inline" />
    </div>

    <div class="flex-1 bg-base">
      <div ref="diffRef" class="w-full h-full" />
    </div>
  </div>
</template>

