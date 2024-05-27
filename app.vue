<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const categories = useState('categories', () => [])
const { data: cates } = await useFetch('/api/category/list', { query: { status: 1 } })
categories.value = cates.value.data
// console.log({ categories }, 111)
</script>
<style lang="scss">
@import './assets/style/common.scss';
</style>
