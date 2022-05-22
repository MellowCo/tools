<!--
 * @Author: licl
 * @Date: 2022-05-21 19:58:44
 * @LastEditTime: 2022-05-22 15:24:14
 * @LastEditors: licl
 * @Description: 侧边栏
-->
<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { routes } from '~/router'
import { generateMenu } from '~/utils'

const menuOptions: MenuOption[] = generateMenu(routes)
const router = useRouter()

function handleUpdateValue(_, item: MenuOption) {
  const { path } = item

  if (path)
    router.push(path as string)
}

const collapsed = ref(true)
</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      @update:value="handleUpdateValue"
    />
  </n-layout-sider>
</template>

<style scoped>

</style>
