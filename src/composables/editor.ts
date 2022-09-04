import type * as monaco from 'monaco-editor'
import { vsTheme } from '~/enum/vsEnum'

export function useVsTheme(editor: monaco.editor.IEditor): void {
  watch(isDark, (dark) => {
    const theme = dark ? vsTheme['vs-dark'] : vsTheme.vs

    editor.updateOptions({
      // @ts-ignore do it
      theme,
    })
  },
  {
    immediate: true,
  })
}
