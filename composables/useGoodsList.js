export default function useGoodsList(cate_id) {
  const list = ref([])

  const fetchList = async () => {
    try {
      const query = { cate_id: cate_id.value, page: 1, limit: 8, status: 1 }
      const { data } = await useFetch('/goods/list', { query })
      if (data.code === 200) {
        list.value = data.data
      }
    } catch (error) {}
  }
  watch(
    () => cate_id.value,
    () => {
      fetchList()
    }
  )
  onMounted(() => {})
  return { list, fetchList }
}
