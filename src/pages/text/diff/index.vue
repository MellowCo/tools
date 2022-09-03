<!-- eslint-disable no-new -->
<script setup lang="ts">
import { EditorView, basicSetup } from 'codemirror'

const text1Ref = $ref(null)
const text2Ref = $ref(null)
const diffRef = $ref(null)

onMounted(() => {
  new EditorView({
    doc: 'console.log("hello")',
    extensions: [
      basicSetup,
    ],
    parent: text1Ref as any,
  })

  new EditorView({
    doc: 'console.log("hello")',
    extensions: [
      basicSetup,
    ],
    parent: text2Ref as any,
  })
})
</script>

<template>
  <div flex absolute w-full h-full>
    <div ref="text1Ref" class="w-1/2 h-full diff-editor" />
    <div ref="text2Ref" class="w-1/2 h-full diff-editor" />
  </div>

  <div>
    <div ref="diffRef">
      111
    </div>
  </div>
</template>

<style lang="less" scoped>
.diff-editor{
  :deep(.cm-editor) {height: 50%;border: 1px solid silver;font-size: 14px}
}
</style>
