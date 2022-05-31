<!--
 * @Author: licl
 * @Date: 2022-05-22 19:04:51
 * @LastEditTime: 2022-05-31 21:52:35
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
import type { JdProduct } from '~/api/shop/jd'
import { fetchJd } from '~/api/shop/jd'

let product = $ref<JdProduct>({ name: '', descImgs: [], specImgs: [], price: '' })

onMounted(async () => {
  // 10045665133697 100031406014 100026699914
  product = await fetchJd('100026699914')
})
</script>

<template>
  {{ product }}

  <div class="flex flex-wrap">
    <img v-for="(specImg, index) in product.specImgs" :key="index" class="w-40 h-40" :src="specImg" alt="">
  </div>

  <div class="flex flex-wrap">
    <img v-for="(backgroup, index) in product.descImgs" :key="index" class="w-40 h-40" :src="backgroup" alt="">
  </div>
</template>

<style scoped>

</style>
