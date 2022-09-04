<script setup lang="ts">
import * as monaco from 'monaco-editor'
import type { FormValidationStatus } from 'naive-ui/es/form/src/interface'
import { toCharArray } from '@meoc/utils'
import { regexModifierOptions } from '~/enum'

const regexEditorRef = $ref(null)

let editor: monaco.editor.IStandaloneCodeEditor

let decorations: string[] = []

onMounted(() => {
  editor = monaco.editor.create(regexEditorRef as any, {
    automaticLayout: true,
  })

  editor.onDidChangeModelContent((e) => {
    regexMatch()
  })
  useVsTheme(editor)
})

let regexStr = $ref('')
let regexModifierArr = $ref<string[]>([])
let regexModifier = $ref('')

let inputStatus = $ref<FormValidationStatus | undefined>()

function onRegexChange(str: string) {
  const [_, _regexStr = str, _modifier = regexModifier] = str.match(/\/([\s\S]*)\/([a-z]*)/) || []

  regexStr = _regexStr
  regexModifier = _modifier
  regexModifierArr = toCharArray(_modifier)

  regexMatch()
}

function onModifierChange(str: string[]) {
  regexModifier = str.join('')
  regexMatch()
}

function regexMatch() {
  inputStatus = undefined
  let deltaDecorations: monaco.editor.IModelDeltaDecoration[] = []

  try {
    const regex = new RegExp(regexStr, regexModifier)

    const matchs = editor.getValue().match(regex) || []

    // 是否为 g 全局匹配
    const searchArr = matchs.input ? [Array.from(matchs)[0]] : Array.from(matchs)

    const cacheMap: Record<string, number> = {}

    searchArr.forEach((searchStr) => {
      if (cacheMap[searchStr])
        return

      cacheMap[searchStr] = 1

      // @ts-ignore do it
      const ranges = editor.getModel()?.findMatches(searchStr, true, false, true, null, true)

      const _deltaDecorations = ranges?.map(({ range }) => {
        const { startLineNumber, startColumn, endLineNumber, endColumn } = range
        return {
          range: new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn),
          options: {
            className: 'regex-bg',
          },
        }
      }) || []

      deltaDecorations = [...deltaDecorations, ..._deltaDecorations]
    })
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
          :value="regexStr"
          :status="inputStatus"
          type="text"
          placeholder="Tiny Input"
          @input="onRegexChange"
        >
          <template #suffix>
            <n-popselect
              v-model:value="regexModifierArr"
              :options="regexModifierOptions"
              multiple
              size="medium"
              scrollable
              @update:value="onModifierChange"
            >
              <div class="mr-3 cursor-pointer">
                / <span class="color-#43a564 hover:color-white">{{ regexModifier }}</span>
              </div>
            </n-popselect>

            <div class="i-carbon-copy-file cursor-pointer hover:color-#43a564" @click="regexMatch" />
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
