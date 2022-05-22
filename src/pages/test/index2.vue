<!--
 * @Author: licl
 * @Date: 2022-05-22 18:32:03
 * @LastEditTime: 2022-05-22 18:32:14
 * @LastEditors: licl
 * @Description:
-->
<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div>
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Hi,
    </p>
    <p text-sm op50>
      <em>Dynamic route222222222!</em>
    </p>

    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
