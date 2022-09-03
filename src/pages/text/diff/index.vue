<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { vsTheme } from '~/enum/vsEnum'

const diffRef = $ref(null)

let diffEditor: monaco.editor.IStandaloneDiffEditor

onMounted(() => {
  const originalModel = monaco.editor.createModel('', 'text/plain')
  const modifiedModel = monaco.editor.createModel('', 'text/plain')
  const theme = isDark.value ? vsTheme['vs-dark'] : vsTheme.vs

  diffEditor = monaco.editor.createDiffEditor(diffRef as any, {
    originalEditable: true,
    readOnly: false,
    automaticLayout: true,
    theme,
  })

  diffEditor.setModel({
    original: originalModel,
    modified: modifiedModel,
  })
})

watch(isDark, (dark) => {
  const theme = dark ? vsTheme['vs-dark'] : vsTheme.vs

  diffEditor.updateOptions({
    // @ts-ignore do it
    theme,
  })
})

function inline(value: boolean) {
  diffEditor.updateOptions({
    renderSideBySide: !value,
  })
}
</script>

<template>
  <div class="absolute w-full h-full p-3 box-border">
    <div class="bg-base p-3">
      <n-checkbox label="行内比较" @update:checked="inline" />
    </div>

    <div class="flex bg-base h-full">
      <div ref="diffRef" class="w-full h-full" />
    </div>
  </div>
</template>

