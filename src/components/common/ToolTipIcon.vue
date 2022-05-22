<!--
 * @Author: licl
 * @Date: 2022-05-22 17:33:35
 * @LastEditTime: 2022-05-22 17:45:37
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
defineProps({
  tip: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <n-tooltip placement="bottom-end">
    <template #trigger>
      <n-icon size="18" style="font-weight: bold">
        <slot />
      </n-icon>
    </template>
    <span>{{ tip }}</span>
  </n-tooltip>
</template>

