<!--
 * @Author: licl
 * @Date: 2022-05-21 19:58:44
 * @LastEditTime: 2022-05-28 22:30:43
 * @LastEditors: licl
 * @Description: 侧边栏
-->
<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { routes } from '~/router'
import { generateMenu } from '~/utils'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const menuOptions: MenuOption[] = generateMenu(routes)
const router = useRouter()

function handleUpdateValue(_: any, item: MenuOption) {
  const { key } = item

  router.push({
    name: key as string,
    query: {
      a: 1,
    },
  })
}
</script>

<template>
  <n-menu
    :options="menuOptions"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    @update:value="handleUpdateValue"
  />
</template>

<style scoped>

</style>
