<!--
 * @Author: licl
 * @Date: 2022-05-21 19:58:07
 * @LastEditTime: 2022-05-22 17:00:42
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
import Menu from '~/layout/components/Menu'
import Header from '~/layout/components/Header'

const collapsed = ref(false)
</script>

<template>
  <n-layout has-sider>
    <!-- menu -->
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      class="min-h-100vh"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Menu :collapsed="collapsed" />
    </n-layout-sider>
    <!-- menu -->

    <n-layout>
      <!-- header -->
      <n-layout-header>
        <Header v-model:collapsed="collapsed" />
      </n-layout-header>
      <!-- header -->

      <!-- content -->
      <n-layout-content class="content-default-background p-2">
        <router-view />
      </n-layout-content>
      <!-- content -->
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
.content-default-background{
  background-color: #f7f7f7;
}
</style>
