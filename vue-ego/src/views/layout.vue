<template>
<!-- 整体布局组件 -->
  <div>
    <MainNav />
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import MainNav from '../components/MainNav'
export default {
  components: {
    MainNav
  }

}
</script>

<style scoped>
.content{
  margin-top: 20px;
  margin-left: 210px;
  margin-right: 10px;
}

</style>