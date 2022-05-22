<!--
 * @Author: licl
 * @Date: 2022-05-22 17:22:22
 * @LastEditTime: 2022-05-22 17:27:31
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

defineEmits(['onClick'])
</script>

<template>
  <div class="cursor-pointer" @click="$emit('onClick')">
    <n-icon v-if="collapsed" size="18">
      <MenuUnfoldOutlined />
    </n-icon>
    <n-icon v-else size="18">
      <MenuFoldOutlined />
    </n-icon>
  </div>
</template>

<style scoped>

</style>
