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
