<script lang="ts" setup>
import { JSONEditor } from 'vanilla-jsoneditor'

const jsonRef = ref(null)

const jsoneditor = ref()

onMounted(() => {
  jsoneditor.value = new JSONEditor({
    target: jsonRef.value as any,
    props: {
      mode: 'text' as any,
    },
  })
})
</script>

<template>
  <div ref="jsonRef" class="absolute w-full h-full customer-theme" :class="{ 'jse-theme-dark': isDark }" />
</template>

<style lang="less" scoped>
@import "vanilla-jsoneditor/themes/jse-theme-dark.css";

.jse-theme-dark{
  &.customer-theme{
    --jse-theme-color: #18181c;
    --jse-theme-color-highlight: #333333 ;
  }
}

.customer-theme{
  --jse-theme-color: #3883fa;
  --jse-theme-color-highlight: #5f9dff;
}
</style>
