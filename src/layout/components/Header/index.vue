<!--
 * @Author: licl
 * @Date: 2022-05-22 16:08:27
 * @LastEditTime: 2022-06-02 20:57:44
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
import MenuCollapsed from './components/MenuCollapsed.vue'
import Setting from './components/Setting.vue'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="h-44px box-border px-5 flex items-center header-shadow justify-between">
    <MenuCollapsed :collapsed="collapsed" @on-click="() => $emit('update:collapsed', !collapsed)" />
    <div class="cursor-pointer">
      <Setting />
    </div>
  </div>
</template>

<style scoped>
.header-shadow{
  box-shadow: 0 0px 2px rgb(0 21 41 / 8%);
}
</style>
