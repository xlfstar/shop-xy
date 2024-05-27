<template>
  <div class="detail-container flex mt-8">
    <div class="left-images pc shrink-0">
      <div>
        <zoom-image :images="imgList" />
      </div>
    </div>
    <div class="right-content flex-1 pl-12 pc">
      <p class="title text-2xl">{{ detail.title }}</p>
      <div class="flex py-4 justify-between">
        <p class="text-rose-600 text-2xl">
          <span>${{ price }}</span
          ><span class="ml-4 text-base line-through text-gray-400">${{ cost_price }}</span>
        </p>
        <p>
          <span class="capitalize">{{ $t('stock') }}:</span
          ><span class="text-base text-gray-400">{{ currentSku.stock }}</span>
        </p>
      </div>

      <div v-for="(item, i) in attr" :key="i">
        <div>
          <span class="font-bold">{{ item.name }}:</span
          ><span class="font-normal ml-2 light-primary">{{ checkedIndexArr[i] }}</span>
        </div>
        <div class="flex gap-2 my-4">
          <div
            @click="changeAttr(i, ele.name)"
            v-for="(ele, k) in item.children"
            class="checked-attr"
            :class="{ checked: checkedIndexArr[i] === ele.name }">
            {{ ele.name }}
          </div>
        </div>
      </div>
      <p class="font-bold capitalize">{{ $t('quantity') }}</p>
      <div class="flex items-center mt-4">
        <div
          class="border border-gray-400 action-quantity flex justify-center items-center"
          :class="{ disabled: quantity === 1 }"
          @click="changeQuantity(1)">
          <i class="iconfont iconjian text-2xl"></i>
        </div>
        <span style="min-width: 44px" class="text-center px-4">{{ quantity }}</span>
        <div
          class="border border-gray-400 action-quantity flex justify-center items-center"
          @click="changeQuantity(2)"
          :class="{ disabled: quantity >= currentSku.stock }">
          <i class="iconfont iconadd text-2xl"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import _ from 'lodash'
const route = useRoute()
const quantity = ref(1)
const { id } = route.params
const { data } = await useFetch(`/api/goods/findOne/${id}`)
const { data: detail } = data.value || {}

const { data: skusData } = await useFetch(`/api/sku/list`, { query: { goods_id: id } })
const { data: skus } = skusData.value || {}
const imgList = skus.map((i) => i.sku_image)

imgList.unshift(detail.main_image)
let attr = []
skus.forEach((item) => {
  const obj = JSON.parse(item.spec_values)

  // 遍历每个对象的 spec_values 属性
  for (let key in obj) {
    // 检查 result 数组中是否已经有相同的属性名
    let existingIndex = attr.findIndex((e) => e.name === key)
    if (existingIndex === -1) {
      // 如果不存在，则创建一个新对象并添加到 result 数组中
      attr.push({ name: key, children: [{ name: obj[key] }] })
    } else {
      // 如果已存在相同的属性名，则将当前值添加到对应属性的 children 数组中
      let existingChildren = attr[existingIndex].children
      let existingChildIndex = existingChildren.findIndex((child) => child.name === obj[key])
      if (existingChildIndex === -1) {
        existingChildren.push({ name: obj[key] })
      }
    }
  }
})

const checkedIndexArr = ref(attr.map((i) => i.children[0].name))

const changeAttr = (i, k) => {
  checkedIndexArr.value[i] = k
}

const currentSku = computed(() => {
  for (let i = 0; i < skus.length; i++) {
    const obj = JSON.parse(skus[i].spec_values)
    let res1 = []
    Object.entries(obj).forEach(([key, value]) => {
      res1.push(value)
    })
    if (_.isEqual(checkedIndexArr.value, res1)) {
      return skus[i]
    }
  }
})
const price = computed(() => {
  return divideWithPrecision(currentSku.value.price, 100)
})
const cost_price = computed(() => {
  return divideWithPrecision(currentSku.value.cost_price, 100)
})

const changeQuantity = (type) => {
  switch (type) {
    case 1: //减
      if (quantity.value === 1) return
      quantity.value--
      break
    case 2: //加
      if (quantity.value >= currentSku.value.stock) return
      quantity.value++
      break
    default:
      break
  }
}

watch(
  currentSku,
  (n) => {
    console.log({ n })
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
// .rgba(126, 56, 17, 1)
.detail-container {
  color: rgba(126, 56, 17, 1);
  .title {
    line-height: 1.25;
  }
  .checked-attr {
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    border: 1px solid rgba(126, 56, 17, 0.5);
    cursor: pointer;
    color: rgba(126, 56, 17, 0.5);
    padding: 0 1rem;
    transition: all linear 0.05s;
    &.checked {
      border: 1px solid rgba(126, 56, 17, 1);
      color: rgba(126, 56, 17, 1);
    }
  }
  .light-primary {
    color: rgba(126, 56, 17, 0.5);
  }
  .action-quantity {
    height: 44px;
    width: 44px;
    cursor: pointer;
    border-radius: 4px;
    &.disabled {
      cursor: not-allowed;
    }
  }
}
</style>
