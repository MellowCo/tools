<!--
 * @Author: licl
 * @Date: 2022-05-22 16:08:27
 * @LastEditTime: 2022-05-22 16:59:14
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="h-64px box-border px-5 flex items-center shadow">
    <div class="cursor-pointer" @click="() => $emit('update:collapsed', !collapsed)">
      <n-icon v-if="collapsed" size="18">
        <MenuUnfoldOutlined />
      </n-icon>
      <n-icon v-else size="18">
        <MenuFoldOutlined />
      </n-icon>
    </div>
  </div>
</template>

<style scoped>

</style>
