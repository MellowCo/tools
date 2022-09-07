<script setup lang="ts">
import { toCharArray } from '@meoc/utils'
import { writeText } from '@tauri-apps/api/clipboard'
import { useMessage } from 'naive-ui'
import useInput from './hook/useInput'
import useEditor from './hook/useEditor'
import { regexModifierOptions } from '~/enum'

const { regexStr, regexModifierArr, regexModifier, inputStatus } = useInput()

const { regexMatch, regexEditorRef } = useEditor(regexStr, regexModifierArr, regexModifier, inputStatus)

function onRegexChange(str: string) {
  const [_, _regexStr = str, _modifier = regexModifier.value] = str.match(/\/([\s\S]*)\/([a-z]*)/) || []

  regexStr.value = _regexStr
  regexModifier.value = _modifier
  regexModifierArr.value = toCharArray(_modifier)

  regexMatch()
}

function onModifierChange(str: string[]) {
  regexModifier.value = str.join('')
  regexMatch()
}

const message = useMessage()

async function copyRegex() {
  await writeText(`/${regexStr.value}/${regexModifier.value}`)
  message.success('复制成功')
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
          placeholder="Input Regex"
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

            <div class="i-carbon-copy-file cursor-pointer hover:color-#43a564" @click="copyRegex" />
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

<style lang="less">
.regex-match-bg {
  background: #cdf595;

  .dark & {
    background: #38590b;
  }
}

.regex-group-bg1 {
  background-color: #96b9fa;

  .dark & {
    background-color: #223c6e;
  }
}

.regex-group-bg2 {
  background-color: #c3adfe;

  .dark & {
    background-color: #513c8c;
  }
}

.regex-group-bg3 {
  background-color: #f8dd8c;

  .dark & {
    background-color: #59460e;
  }
}
</style>
