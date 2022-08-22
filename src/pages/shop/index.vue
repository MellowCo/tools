<script setup lang="ts">
import { CloudUploadOutlined, SearchOutlined } from '@vicons/antd'
import type { JdProduct } from '~/api/shop/jd'
import { fetchJd } from '~/api/shop/jd'

const products = $ref<JdProduct[]>([])

const codes = $ref<string[]>(['10045665133697', '100031406014', '100026699914'])

function handleSearch() {
  if (codes.length === 0)
    return

  codes.forEach((code) => {
    fetchJd(code).then((res) => {
      products.push(res)
    })
  })
}
</script>

<template>
  <div class="p-3">
    <div class="flex justify-center gap-2 bg-white p-3">
      <div class="w-8/12 flex">
        <n-select
          v-model:value="codes"
          filterable
          multiple
          tag
          placeholder="输入，按回车确认"
          :show-arrow="false"
          :show="false"
        />
      </div>
      <n-button strong type="warning">
        <template #icon>
          <n-icon>
            <CloudUploadOutlined />
          </n-icon>
        </template>
      </n-button>

      <n-button strong type="info" @click="handleSearch">
        <template #icon>
          <n-icon>
            <SearchOutlined />
          </n-icon>
        </template>
      </n-button>
    </div>

    <!-- {{ products }} -->

    <div v-for="(product, pIndex) in products" :key="pIndex" class="p-4 bg-white mt-3 rounded-2">
      <div class="text-lg font-bold">
        {{ product.name }}
      </div>

      <div class="text-base mt-3">
        规格图
      </div>
      <n-image-group class="flex flex-wrap">
        <n-image
          v-for="(specImg, index) in product.specImgs"
          :key="index"
          class="m-2"
          width="150"
          :src="specImg"
        />
      </n-image-group>

      <div class="text-base mt-3">
        描述图
      </div>
      <n-image-group class="flex flex-wrap">
        <n-image
          v-for="(descImg, index) in product.descImgs"
          :key="index"
          class="m-2"
          width="150"
          :src="descImg"
          object-fit="contain"
        />
      </n-image-group>
    </div>
  </div>
</template>

<style scoped>

</style>
