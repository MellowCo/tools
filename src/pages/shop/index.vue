<!--
 * @Author: licl
 * @Date: 2022-05-22 19:04:51
 * @LastEditTime: 2022-05-31 20:56:39
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
import { fetchJd } from '~/api/shop/jd'

let _specImgs = $ref<string[]>()
let _descImgs = $ref<string[]>()

onMounted(async () => {
  // 10045665133697 100031406014
  const { descImgs, specImgs } = await fetchJd('100031406014')
  _specImgs = specImgs
  _descImgs = descImgs
})
</script>

<template>
  {{ _specImgs }}

  <div class="flex flex-wrap">
    <img v-for="(specImg, index) in _specImgs" :key="index" class="w-40 h-40" :src="specImg" alt="">
  </div>

  {{ _descImgs }}
  <div class="flex flex-wrap">
    <img v-for="(backgroup, index) in _descImgs" :key="index" class="w-40 h-40" :src="backgroup" alt="">
  </div>
</template>

<style scoped>

</style>
