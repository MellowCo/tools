import type { FormValidationStatus } from 'naive-ui/es/form/src/interface'

export default function () {
  const regexStr = ref('')
  const regexModifierArr = ref<string[]>([])
  const regexModifier = ref('')
  const inputStatus = ref<FormValidationStatus | undefined>()

  return {
    regexStr, regexModifierArr, regexModifier, inputStatus,
  }
}
