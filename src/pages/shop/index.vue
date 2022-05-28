<!--
 * @Author: licl
 * @Date: 2022-05-22 19:04:51
 * @LastEditTime: 2022-05-23 08:53:35
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
import { ResponseType, fetch } from '@tauri-apps/api/http'

onMounted(async () => {
  const data = await fetch('https://item.jd.com/10045665133697.html', {
    method: 'GET',
    responseType: ResponseType.Text,
  })
  console.log(data)
})
</script>

<template>
  <div>
    jdddddddd
  </div>
</template>

<style scoped>

</style>
