<template>
  <div>{{ id }}</div>
</template>
<script setup>
const route = useRoute()
const { id } = route.params || {}
</script>
