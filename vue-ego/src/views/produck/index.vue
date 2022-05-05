<template>
<!-- 商品信息页面 -->
  <div>
    <produckAdd />
    <produckHaed />
    <produckList />
    <produckPagination />
  </div>
</template>

<script>
// import produckHaed from './produckHaed.vue'
import produckHaed from '../../components/pubHead/index.vue'
import produckList from './produckList.vue'
import produckPagination from './produckPagination.vue'
import produckAdd from './produckAdd.vue'
export default {
  components: {
    produckList,
    produckPagination,
    produckHaed,
    produckAdd
  }

}
</script>

<style>

</style>