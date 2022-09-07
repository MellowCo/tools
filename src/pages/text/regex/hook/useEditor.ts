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
      const cacheMap: Record<string, number> = {}

      if (isGlobal) {
        // 全局匹配
        const matchs = Array.from(editor.getValue().matchAll(regex) || [])

        matchs.forEach((match) => {
          deltaDecorations = [...deltaDecorations, ...createDeltaDecorations(match, cacheMap)]
        })
      }
      else {
        const matchs = Array.from(editor.getValue().match(regex) || [])
        deltaDecorations = createDeltaDecorations(matchs, cacheMap, false)
      }
    }
    catch (e) {
      inputStatus.value = 'error'
    }

    decorations = editor.deltaDecorations(decorations, deltaDecorations)
  }

  function deltaDecorationFactory(startLineNumber: number, groupStartColumn: number, endLineNumber: number, groupEndColumn: number, className: string) {
    return {
      range: new monaco.Range(startLineNumber, groupStartColumn, endLineNumber, groupEndColumn),
      options: {
        className,
      },
    }
  }

  // 计算正则匹配的位置
  function calDeltaPos(range: monaco.Range, matchStr: string, groupStrs: string[]) {
    const { startLineNumber, startColumn, endLineNumber, endColumn } = range
    const _deltaDecorations: monaco.editor.IModelDeltaDecoration[] = []
    let currentColumn = startColumn

    groupStrs.forEach((groupStr, index) => {
      if (!groupStr)
        return

      // 计算 group 的位置
      const groupStart = matchStr.indexOf(groupStr)
      const groupStartColumn = startColumn + groupStart
      const groupEndColumn = groupStartColumn + groupStr.length

      // 设置 group 背景
      _deltaDecorations.push(deltaDecorationFactory(startLineNumber, groupStartColumn, endLineNumber, groupEndColumn, groupBgClass[index % groupBgClass.length]))

      // 设置 macth 背景
      _deltaDecorations.push(deltaDecorationFactory(startLineNumber, currentColumn, endLineNumber, groupStartColumn, 'regex-match-bg'))

      currentColumn = groupEndColumn
    })

    _deltaDecorations.push(deltaDecorationFactory(startLineNumber, currentColumn, endLineNumber, endColumn, 'regex-match-bg'))

    return _deltaDecorations
  }

  function createDeltaDecorations(match: string[], cacheMap: Record<string, number>, isGlobal = true) {
    let deltaDecorations: monaco.editor.IModelDeltaDecoration[] = []

    const [matchStr, ...groupStrs] = match

    if (cacheMap[matchStr] || !matchStr)
      return []

    cacheMap[matchStr] = 1

    const ranges = editor.getModel()?.findMatches(matchStr, true, false, true, null, true)

    if (isGlobal) {
      ranges?.forEach(({ range }) => {
        deltaDecorations = [...deltaDecorations, ...calDeltaPos(range, matchStr, groupStrs)]
      })
    }
    else {
      if (ranges?.length)
        deltaDecorations = [...deltaDecorations, ...calDeltaPos(ranges[0].range, matchStr, groupStrs)]
    }

    return deltaDecorations || []
  }

  return {
    regexMatch,
    regexEditorRef,
  }
}
