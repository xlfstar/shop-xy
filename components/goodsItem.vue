<template>
  <NuxtLink :to="`/goods/detail/${data.id}`">
    <div class="goods-card flex flex-col h-full ra">
      <el-image :src="data.main_image" class="rounded-2xl h-0 goods-img w-full" fit="cover" />
      <div class="py-2">
        <div class="">{{ data.title }}</div>
        <div>
          <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value} points" />
        </div>
        <div>
          <span class="mr-4 text-red-400">${{ price }}</span>
          <span class="text-gray-400 line-through">${{ cost_price }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
import { divideWithPrecision } from '@/utils'
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
let randomNumber = Number((Math.random() * 5).toFixed(1))
const value = ref(randomNumber)
const price = computed(() => {
  return divideWithPrecision(props.data.price, 100)
})
const cost_price = computed(() => divideWithPrecision(props.data.cost_price, 100))
onMounted(() => {})
</script>
<style lang="scss" scoped>
.goods-card {
  // border-radius: ;
}
.goods-img {
  padding-top: 100%;
}
:deep(.el-image__inner) {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
:deep(.el-rate .el-rate__icon) {
  margin-right: 0;
}
</style>
<style></style>
