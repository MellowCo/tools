<!--
 * @Author: licl
 * @Date: 2022-05-22 16:08:27
 * @LastEditTime: 2022-09-03 10:02:37
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
import MenuCollapsed from './components/MenuCollapsed.vue'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="h-44px box-border px-5 flex items-center header-shadow justify-between z-11 ">
    <MenuCollapsed :collapsed="collapsed" @on-click="() => $emit('update:collapsed', !collapsed)" />

    <div class="flex text-base">
      <div m="r4" cursor="pointer" dark:i-carbon-moon i-carbon-sun @click="toggleDark()" />
      <div cursor="pointer" i="carbon-settings" />
    </div>
  </div>
</template>

<style scoped>
.header-shadow{
  box-shadow: 0 0px 2px rgb(0 21 41 / 8%);
}
</style>
