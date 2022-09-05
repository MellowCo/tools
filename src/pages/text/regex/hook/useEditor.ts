import * as monaco from 'monaco-editor'
import type { FormValidationStatus } from 'naive-ui/es/form/src/interface'
import type { Ref } from 'vue'

export default function (regexStr: Ref<string>, regexModifierArr: Ref<string[]>, regexModifier: Ref<string>, inputStatus: Ref<FormValidationStatus | undefined>) {
  const regexEditorRef = ref(null)
  let editor: monaco.editor.IStandaloneCodeEditor
  let decorations: string[] = []

  const groupBgClass = ['regex-group-bg1', 'regex-group-bg2', 'regex-group-bg3']

  onMounted(() => {
    editor = monaco.editor.create(regexEditorRef.value as any, {
      automaticLayout: true,
    })

    editor.onDidChangeModelContent(() => {
      regexMatch()
    })
    useVsTheme(editor)
  })

  function regexMatch() {
    inputStatus.value = undefined
    let deltaDecorations: monaco.editor.IModelDeltaDecoration[] = []

    const isGlobal = regexModifierArr.value.includes('g')

    try {
      const regex = new RegExp(regexStr.value, regexModifier.value)
      if (isGlobal) {
        // 全局匹配
        const matchs = Array.from(editor.getValue().matchAll(regex) || [])

        matchs.forEach((match) => {
          const [matchStr, ...groupStrs] = match

          const ranges = editor.getModel()?.findMatches(matchStr, true, false, true, null, true)
          const _deltaDecorations: monaco.editor.IModelDeltaDecoration[] = []

          ranges?.forEach(({ range }) => {
            const { startLineNumber, startColumn, endLineNumber, endColumn } = range

            let startIndex = startColumn

            groupStrs.forEach((groupStr, index) => {
              if (!groupStr)
                return
              // 计算 group 的位置
              const groupStart = matchStr.indexOf(groupStr)
              const groupStartColumn = startColumn + groupStart
              const groupEndColumn = groupStartColumn + groupStr.length

              // 设置 group 背景
              _deltaDecorations.push(createDeltaDecoration(startLineNumber, groupStartColumn, endLineNumber, groupEndColumn, groupBgClass[index % groupBgClass.length]))

              // 设置 macth 背景
              _deltaDecorations.push(createDeltaDecoration(startLineNumber, startIndex, endLineNumber, groupStartColumn, 'regex-match-bg'))

              startIndex = groupEndColumn
            })

            _deltaDecorations.push(createDeltaDecoration(startLineNumber, startIndex, endLineNumber, endColumn, 'regex-match-bg'))
          })

          deltaDecorations = [...deltaDecorations, ..._deltaDecorations]
        })
      }
      // else { matchs = Array.from(editor.getValue().match(regex) || []) }
    }
    catch (e) {
      inputStatus.value = 'error'
    }

    decorations = editor.deltaDecorations(decorations, deltaDecorations)
  }

  function createDeltaDecoration(startLineNumber: number, groupStartColumn: number, endLineNumber: number, groupEndColumn: number, className: string) {
    return {
      range: new monaco.Range(startLineNumber, groupStartColumn, endLineNumber, groupEndColumn),
      options: {
        className,
      },
    }
  }

  return {
    regexMatch,
    regexEditorRef,
  }
}
