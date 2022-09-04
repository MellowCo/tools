<script setup lang="ts">
import * as monaco from 'monaco-editor'
import type { FormValidationStatus } from 'naive-ui/es/form/src/interface'

const regexEditorRef = $ref(null)

let editor: monaco.editor.IStandaloneCodeEditor

let decorations: string[] = []

// \(\w*\)
const regexStr = $ref('')
let inputStatus = $ref<FormValidationStatus | undefined>()

onMounted(() => {
  editor = monaco.editor.create(regexEditorRef as any, {
    automaticLayout: true,
  })

  editor.onDidChangeModelContent((e) => {
    regexMatch()
  })
  useVsTheme(editor)
})

function onRegexChange(str: string) {
  regexMatch()
}

function regexMatch() {
  inputStatus = undefined
  let deltaDecorations: monaco.editor.IModelDeltaDecoration[] = []

  try {
    const regex = new RegExp(regexStr)

    // @ts-ignore do it
    const ranges = editor.getModel()?.findMatches(regex, true, true)

    deltaDecorations = ranges?.map(({ range }) => {
      const { startLineNumber, startColumn, endLineNumber, endColumn } = range
      return {
        range: new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn),
        options: {
          className: 'regex-bg',
        },
      }
    }) || []
  }
  catch (e) {
    inputStatus = 'error'
  }

  decorations = editor.deltaDecorations(decorations, deltaDecorations)
}
</script>

<template>
  <div class="absolute wh-full box-border p-3">
    <div class="bg-base p-3 mb-4">
      <div class="mb-2">
        正则表达式
      </div>
      <div class="flex">
        <n-input
          v-model:value="regexStr"
          :status="inputStatus"
          type="text"
          placeholder="Tiny Input"
          @input="onRegexChange"
        >
          <template #suffix>
            <div class="i-carbon-copy-file cursor-pointer" @click="regexMatch" />
          </template>
        </n-input>
      </div>
    </div>

    <div class="flex flex-col box-border bg-base w-full h-1/2 p-3 h-85%">
      <div class="mb-2">
        文本
      </div>

      <div class="wh-full">
        <div ref="regexEditorRef" class="wh-full" />
      </div>
    </div>
  </div>
</template>

<style>
.regex-bg{
  background-color: #c5e893;
  opacity: .6;
}
</style>
