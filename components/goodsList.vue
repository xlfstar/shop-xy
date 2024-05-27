<template>
  <div class="list-box flex flex-wrap w-full" v-if="Array.isArray(list) && list.length > 0">
    <div class="item-box" v-for="item in list">
      <goods-item :data="item" />
    </div>
  </div>
  <p
    class="text-center mt-8 text-sm font-light flex-1 text-yellow-700"
    v-if="Array.isArray(list) && list.length === 0 && query.title">
    {{ $t('search no data', { keywords }) }}
  </p>
</template>
<script setup>
import _ from 'lodash'
const emit = defineEmits(['change', 'update:loading'])
const props = defineProps({
  query: {
    type: Object,
    default: () => {}
  },
  loading: {
    type: Boolean,
    default: false
  }
  // loading:Boolean
})
const loading1 = ref(props.loading)
const list = ref(null)
const fetctList = async (query) => {
  try {
    // emit('update:loading', true)
    const { data } = await useFetch('/api/goods/list', { query })
    if (data.value.code === 200) {
      list.value = data.value.data || []
      // emit('change', list.value)
    }
  } catch (error) {
  } finally {
    // loading1.value = false
    // emit('update:loading', false)
  }
}

const throttled = _.throttle(fetctList, 3000)
watch(
  () => props.query,
  async (n) => {
    console.log(11111)
    const { title } = n || {}
    if (title === '') {
      list.value = null
      return
    }
    // fetctList(n)
    throttled(n)
  },
  {
    deep: true,
    immediate: true
  }
)
// watch(
//   () => props.loading,
//   (n) => {
//     loading1.value =
//   },
//   {
//     immediate: true
//   }
// )
onMounted(async () => {
  // console.log('---props.query', props.query)
})
</script>
<style lang="scss" scoped>
@media screen and (min-width: 540px) {
  .list-box {
    margin-left: -10px;
    margin-right: -10px;
    .item-box {
      padding: 10px;
      width: 50%;
    }
  }
}
@media screen and (min-width: 768px) {
  .list-box {
    margin-left: -10px;
    margin-right: -10px;
    .item-box {
      padding: 10px;
      width: 50%;
    }
  }
}
@media screen and (min-width: 996px) {
  .list-box {
    margin-left: -10px;
    margin-right: -10px;
    .item-box {
      padding: 10px;
      width: 25%;
    }
  }
}
@media screen and (max-width: 540px) {
  .list-box {
    margin-left: -5px;
    margin-right: -5px;
    .item-box {
      padding: 5px;
      width: 50%;
    }
  }
}
</style>
