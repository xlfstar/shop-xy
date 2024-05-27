export default function usePlatform() {
  const isPC = ref<boolean>(true)
  onMounted(() => {
    nextTick(() => {
      window.onresize = () => {
        const width = window.innerWidth || document.body.clientWidth
        isPC.value = width > 786
      }
    })
  })
  return { isPC }
}
