<!--
 * @Author: licl
 * @Date: 2022-05-21 19:58:07
 * @LastEditTime: 2022-06-02 21:02:14
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
import Menu from '~/layout/components/Menu'
import Header from '~/layout/components/Header'

const collapsed = ref(false)
</script>

<template>
  <n-layout has-sider position="absolute">
    <!-- menu -->
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      class="min-h-100vh"
      :native-scrollbar="false"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Menu :collapsed="collapsed" />
    </n-layout-sider>
    <!-- menu -->

    <n-layout>
      <!-- header -->
      <n-layout-header class="fixed z-10">
        <Header v-model:collapsed="collapsed" />
      </n-layout-header>
      <!-- header -->

      <!-- content -->
      <n-layout-content
        class="content-default-background pt-44px"
        position="absolute"
        content-style="padding: 10px;"
        :native-scrollbar="false"
      >
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
