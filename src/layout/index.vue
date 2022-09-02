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
      bordered
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
      <n-layout-header position="absolute" class="z-10">
        <Header v-model:collapsed="collapsed" />
      </n-layout-header>
      <!-- header -->

      <!-- content -->
      <n-layout-content
        class="bg-gray-100 pt-44px"
        position="absolute"
        :native-scrollbar="false"
      >
        <router-view />
      </n-layout-content>
      <!-- content -->
    </n-layout>
  </n-layout>
</template>
