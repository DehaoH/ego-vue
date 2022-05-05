<template>
<!-- 规格参数模块 -->
  <div>
      <ParamsHead />
      <ParamsList />
      <paramsAdd />

  </div>
</template>

<script>
import ParamsList from './ParamsList.vue'
import ParamsHead from '../../components/pubHead/index.vue'
import paramsAdd from './paramsAdd.vue'
export default {
  components: {
    ParamsList,
    ParamsHead,
    paramsAdd
  }

}
</script>

<style>

</style>