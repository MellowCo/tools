<!--
 * @Author: licl
 * @Date: 2022-05-22 19:04:51
 * @LastEditTime: 2022-05-28 21:45:29
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
import { fetchJd } from '~/api/shop/jd'

onMounted(async () => {
  const data = await fetchJd('10045665133697')
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
