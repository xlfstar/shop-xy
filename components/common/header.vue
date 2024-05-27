<template>
  <header class="text-yellow-700 sticky top-0 z-50 bg-white">
    <div class="header-content header flex justify-between h-14 m-auto py-2 items-center">
      <NuxtLink to="/">
        <NuxtImg src="logo.png" style="object-fit: contain" class="logo" />
      </NuxtLink>
      <!-- <nav class="flex-1 pc px-8" v-if="scrollY > 40">
        <ul class="flex">
          <li></li>
        </ul>
      </nav> -->
      <div class="flex items-center">
        <span class="p-2 mx-2 cursor-pointer" @click="visible = true">
          <i class="iconfont iconsearch text-2xl"></i>
        </span>
        <span class="p-2 mx-2 cursor-pointer pc">
          <i class="iconfont iconuser1 text-2xl"></i>
        </span>
        <span class="p-2 mx-2 cursor-pointer">
          <i class="iconfont iconcart text-2xl"></i>
        </span>
        <span class="p-2 mx-2 relative cursor-pointer mobile" @click="visibleMenu = true">
          <i class="iconfont iconmenu text-2xl"></i>
        </span>
        <el-dropdown trigger="click" @command="handleCommand" class="pc">
          <span class="p-2 mx-2 cursor-pointer">
            <i class="iconfont iconyuyan1 text-2xl text-yellow-700"></i>
            <!-- <i class="iconfont icondown1"></i> -->
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="en">English</el-dropdown-item>
              <el-dropdown-item command="zh">Chinese</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
  <nav class="nav text-lg pc m-auto text-yellow-700">
    <ul class="flex items-center h-full">
      <li class="py-4 mr-4 relative">
        <NuxtLink to="/"> {{ $t('home') }} </NuxtLink>
      </li>
      <li v-for="nav in categories" :key="nav.id" class="mx-4 cate-item py-4 relative">
        <NuxtLink :to="`/category/${nav.id}`">
          {{ nav.name }}
        </NuxtLink>
      </li>
      <li class="py-4 mr-4 relative">
        <NuxtLink to="/"> {{ $t('about') }} </NuxtLink>
      </li>
      <li class="py-4 mr-4 relative">
        <NuxtLink to="/"> {{ $t('contact us') }} </NuxtLink>
      </li>
    </ul>
  </nav>
  <client-only>
    <el-drawer
      v-model="visible"
      direction="ttb"
      :show-close="false"
      ref="drawerRef"
      class="search-drawer text-yellow-700">
      <template #header="{ close }">
        <div class="flex text-yellow-700 drawer-header py-8 items-center">
          <i class="iconfont iconsearch text-2xl"></i>
          <input
            v-model="keywords"
            class="flex-1 px-4 search-input h-10"
            :placeholder="$t('Search Products')"
            ref="searchInputRef" />
          <!-- <el-input
            v-model="keywords"
            class="flex-1 px-4 search-input"
            :placeholder="$t('Search Products')"
            ref="searchInputRef" /> -->
          <el-button @click="close" link> <i class="iconfont iconclose1 text-2xl text-yellow-700"></i></el-button>
        </div>
      </template>

      <div class="search-result relative flex flex-1" :class="keywords && 'min-h-20'" v-loading="searchLoading">
        <!-- <div class="goods-list flex-1 flex flex-wrap" v-if="Array.isArray(searchResult) && searchResult.length > 0">
          <div class="goods-item" v-for="(item, i) in searchResult" :key="item.id">
            <goods-item :data="item" />
          </div>
        </div> -->
        <goods-list :query="{ status: 1, title: keywords, page: 1, limit: 4 }" class="flex-1" />
        <!-- <p
          class="text-center mt-8 text-sm font-light flex-1 text-yellow-700"
          v-if="Array.isArray(searchResult) && searchResult.length === 0">
          {{ $t('search no data', { keywords }) }}
        </p> -->
      </div>
    </el-drawer>
  </client-only>
  <client-only>
    <el-drawer
      v-model="visibleMenu"
      ref="menuRef"
      class="menu-drawer text-yellow-700 text-lg mobile"
      size="60%"
      :show-close="false">
      <template #header="{ close }">
        <div class="menu-header flex justify-between">
          <el-dropdown trigger="click" @command="handleCommand" class="mobile">
            <span class="p-2 cursor-pointer">
              <i class="iconfont iconyuyan1 text-2xl text-yellow-700"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="en">English</el-dropdown-item>
                <el-dropdown-item command="zh">Chinese</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button @click="close" link> <i class="iconfont iconclose1 text-xl text-yellow-700"></i></el-button>
        </div>
      </template>
      <div class="menu-container flex flex-col h-full">
        <nav class="flex-1">
          <ul>
            <li class="p-4 ml-4 flex">
              <NuxtLink to="/" @click="visibleMenu = false" class="flex-1"> {{ $t('home') }} </NuxtLink>
            </li>
            <li v-for="nav in categories" :key="nav.id" class="ml-4 flex">
              <NuxtLink :to="`/category/${nav.id}`" @click="visibleMenu = false" class="flex-1 p-4">
                {{ nav.name }}
              </NuxtLink>
            </li>
            <li class="ml-4 flex">
              <NuxtLink to="/" @click="visibleMenu = false" class="flex-1 p-4"> {{ $t('about') }} </NuxtLink>
            </li>
            <li class="ml-4 flex">
              <NuxtLink to="/" @click="visibleMenu = false" class="flex-1 p-4"> {{ $t('contact us') }} </NuxtLink>
            </li>
          </ul>
        </nav>
        <div>
          <nav>
            <ul>
              <li class="ml-4"></li>
              <li class="ml-4 flex">
                <NuxtLink to="/" @click="visibleMenu = false" class="flex-1 p-4"> {{ $t('Login') }} </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </el-drawer>
  </client-only>
</template>
<script setup>
import _ from 'lodash'
const { locale, setLocale } = useI18n()
const { isPC } = usePlatform()

const clear = ref(false)

const currentLang = ref('en')
// const scrollY = ref(0)

// if (process.client) {
//   console.log(1111)
//   _.throttle(() => {
//     document.addEventListener('scroll', () => {
//       scrollY.value = window.scrollY
//     })
//   }, 100)()
// } else {

// }
const visibleMenu = ref(false)
const visible = ref(false)
const keywords = useState('keywords', () => '')
const searchLoading = ref(false)
const searchResult = ref(null)
const drawerRef = ref(null)
const searchInputRef = ref(null)
const categories = useState('categories')
// const { data } = await useFetch('/api/category/list', { query: { status: 1 } })
// const { data: navList, code, message } = data.value || {}

function handleCommand(e) {
  currentLang.value = e
}

async function getSearchResult(query) {
  try {
    const { data } = await useFetch('/api/goods/list', { query })
    const { data: products, message, code } = data.value || {}
    if (code === 200) {
      searchResult.value = products
    } else {
      searchResult.value = []
    }
  } catch (error) {
  } finally {
    searchLoading.value = false
  }
}

const throttled = _.throttle(getSearchResult, 3000, { leading: false })

const changeResult = (e, l) => {
  searchResult.value = e
}

watch(
  () => keywords.value,
  async (n) => {
    if (!n) {
      visible.value = false
      // searchResult.value = null
      clear.value = true
      return
    }
    // const query = { page: 1, limit: 4, title: n }
    // searchLoading.value = true
    // throttled(query)
  }
)
watch(
  () => visible.value,
  (n) => {
    if (!n) {
      keywords.value = ''
      // searchResult.value = null
      clear.value = true
    }
  }
)
watch(
  () => currentLang.value,
  (n) => {
    setLocale(n)
  }
)

// watch(
//   () => searchLoading.value,
//   (n) => {
//     console.log('---searchLoading', searchLoading)
//   }
// )
</script>
<style lang="scss" scoped>
header {
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.05);
}
.header {
  .cate-item {
    text-transform: capitalize;
  }
}
.header-content,
.nav {
  max-width: 1440px;
}
.drawer-header,
.search-result {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

.goods-list {
  margin-left: -5px;
  margin-right: -5px;
}
@media screen and (min-width: 540px) {
  .header-content {
    height: 60px;
  }
  .logo {
    width: 36px;
    height: 36px;
  }
  .header-content,
  .nav {
    padding-left: 30px;
    padding-right: 30px;
    // padding: 0 30px;
  }
  .drawer-header,
  .search-result {
    padding-left: 15px;
    padding-right: 15px;
  }
  .goods-item {
    width: 50%;
    padding: 5px;
  }
}
@media screen and (min-width: 768px) {
  .logo {
    width: 36px;
    height: 36px;
  }
  .header-content {
    height: 60px;
  }
  .header-content,
  .nav {
    padding-left: 60px;
    padding-right: 60px;
    // padding: 0 60px;
  }
  .drawer-header,
  .search-result {
    padding-left: 15px;
    padding-right: 15px;
  }
  .goods-item {
    width: 50%;
    padding: 5px;
  }
}
@media screen and (min-width: 996px) {
  .logo {
    width: 48px;
    height: 48px;
  }
  .header-content {
    height: 100px;
  }
  .header-content,
  .nav {
    padding-left: 100px;
    padding-right: 100px;
  }
  .drawer-header,
  .search-result {
    padding-left: 60px;
    padding-right: 60px;
  }
  .search-drawer {
    padding-left: 60px;
    padding-right: 60px;
  }
  .goods-item {
    width: 25%;
    padding: 5px;
  }
}

@media screen and (max-width: 540px) {
  .logo {
    width: 36px;
    height: 36px;
  }
  .header-content {
    height: 60px;
  }
  .header-content,
  .nav,
  .drawer-header,
  .search-result {
    // padding: 0 15px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .goods-item {
    width: 50%;
    padding: 5px;
  }
}
.nav {
  text-transform: capitalize;
  li {
    &::after {
      position: absolute;
      content: '';
      height: 2px;
      width: 0;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgb(161 98 7 / var(--tw-text-opacity));
      transition: all linear 0.1s;
    }
    &:hover {
      &::after {
        width: 50%;
      }
    }
  }
}
.search-input {
  outline: none;
}
.menu-container {
  li {
    border-bottom: 0.5px solid rgb(161 98 7 / var(--tw-text-opacity));
  }
}
</style>
<style lang="scss">
.search-drawer {
  &.el-drawer {
    height: auto !important;
  }
  /* background-color: red; */
  .el-drawer__header {
    padding: 0;
    margin: 0;
  }
  .el-drawer__body {
    // display: flex;
    width: 100%;
    padding: 0;
    margin: 0 auto;
  }
  .el-loading-mask {
    background: #fff;
  }
}
.menu-drawer {
  .el-drawer__header {
    border-bottom: 0.5px solid rgb(161 98 7 / var(--tw-text-opacity));
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 0;
  }
  .el-drawer__body {
    padding: 0;
  }
}
</style>
