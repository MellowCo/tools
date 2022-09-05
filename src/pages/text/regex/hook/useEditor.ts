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
        const matchs = Array.from(editor.getValue().matchAll(regex) || [])
        // const cacheMap: Record<string, number> = {}
        console.log(matchs)

        matchs.forEach((match) => {
          const [matchStr, ...groupStrs] = match

          const ranges = editor.getModel()?.findMatches(matchStr, true, false, true, null, true)
          const _deltaDecorations: monaco.editor.IModelDeltaDecoration[] = []

          ranges?.forEach(({ range }) => {
            const { startLineNumber, startColumn, endLineNumber, endColumn } = range

            _deltaDecorations.push({
              range: new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn),
              options: {
                className: 'regex-match-bg',
              },
            })

            groupStrs.forEach((groupStr, index) => {
              if (!groupStr)
                return

              const startIndex = matchStr.indexOf(groupStr)
              const groupStartColumn = startColumn + startIndex
              const groupEndColumn = groupStartColumn + groupStr.length

              _deltaDecorations.push({
                range: new monaco.Range(startLineNumber, groupStartColumn, endLineNumber, groupEndColumn),
                options: {
                  className: groupBgClass[index % groupBgClass.length],
                },
              })
            })
          })

          deltaDecorations = [...deltaDecorations, ..._deltaDecorations]
        })
      }
      // else { matchs = Array.from(editor.getValue().match(regex) || []) }
    }
    catch (e) {
      console.log(e)

      inputStatus.value = 'error'
    }

    console.log(deltaDecorations)

    decorations = editor.deltaDecorations(decorations, deltaDecorations)
  }

  return {
    regexMatch,
    regexEditorRef,
  }
}
