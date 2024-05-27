<template>
  <div class="page-wrapper">
    <common-header />
    <main class="route-main">
      <slot />
    </main>
    <footer>页脚</footer>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.route-main {
  max-width: 1440px;
  margin: 0 auto;
}
@media screen and (min-width: 540px) {
  .route-main {
    padding-left: 30px;
    padding-right: 30px;
    // padding: 0 30px;
  }
}
@media screen and (min-width: 768px) {
  .route-main {
    padding-left: 60px;
    padding-right: 60px;
    // padding: 0 60px;
  }
}
@media screen and (min-width: 996px) {
  .route-main {
    padding-left: 100px;
    padding-right: 100px;
  }
}

@media screen and (max-width: 540px) {
  .route-main {
    // padding: 0 15px;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
