<script lang="ts" setup>
import { darkTheme, lightTheme } from 'naive-ui'
import Application from '~/components/Application/index.vue'
</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : lightTheme">
    <Application>
      <router-view />
    </Application>
  </NConfigProvider>
</template>
