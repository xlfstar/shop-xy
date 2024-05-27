<template>
  <div class="mt-4">
    <el-carousel :interval="5000" motion-blur :autoplay="true" :height="bannerHeight">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <!-- <h3 text="2xl" justify="center">{{ item.banner_image }}</h3> -->
        <el-image :src="item.banner_image" fit="cover" class="w-full rounded-3xl" @load="loadImg" ref="bannerRef" />
      </el-carousel-item>
    </el-carousel>
    <div class="goods-container text-yellow-700">
      <div class="floor mt-4" v-for="cate in categories" :key="cate.id">
        <p class="text-3xl capitalize p-4 category relative">{{ cate.name }}</p>
        <!-- <div class="floor-goods-list" v-for="goods in floorList[cate.id]" :key="goods.id">{{ goods.title }}</div> -->
        <goods-list :query="{ status: 1, cate_id: cate.id, page: 1, limit: 8 }" :cate_id="cate.id" />
        <div class="flex justify-center py-4">
          <el-button link
            ><span class="text-yellow-700 text-lg">{{ $t('View more') }}</span
            ><i class="iconfont icondown1 text-yellow-700 text-sm"></i
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const categories = useState('categories')
const banners = useState('banners', () => [])
const { data: bannerList } = await useFetch('/api/goods/banner/list')
banners.value = bannerList.value.data
const bannerRef = ref(null)
const bannerHeight = ref('')

const loadImg = () => {
  nextTick(() => {
    bannerHeight.value = bannerRef.value[0].$el.offsetHeight + 'px'
  })
}

onMounted(() => {
  loadImg()
  window.addEventListener(
    'resize',
    () => {
      bannerHeight.value = bannerRef.value[0].$el.offsetHeight + 'px'
      loadImg()
    },
    false
  )
})
</script>
<style lang="scss" scoped>
.goods-container {
  .floor {
    .category {
      &::before {
        position: absolute;
        content: '';
        height: 40%;
        width: 5px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: rgb(161 98 7 / var(--tw-text-opacity));
      }
    }
  }
}
</style>
