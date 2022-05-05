<template>
<!-- 商品搜索，新建商品栏模块 -->
  <div class="head">
      <!-- elementUI的form表单
      阻止默认事件：@submit.native.prevent
      回车事件的监听；@keyup.enter.native='onSubmitSearch'
       -->
    <el-form ref='searchForm' :model='search' @submit.native.prevent>
      <!-- 搜索输入框 回车事件的监听；@keyup.enter.native='onSubmitSearch'-->
      <el-form-item>
        <el-input v-model="search.content" @keyup.enter.native='onSubmitSearch'></el-input>
      </el-form-item>
      <!-- 搜索按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmitSearch">{{$t('message.search')}}</el-button>
      </el-form-item>
      <!-- 添加按钮 -->
      <el-form-item>
        <el-button type="primary"  @click="changeFlag">{{$t('message.add')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data () {
        return {
            search:{
              content:''
            }//form绑定的数据，就是输入框的数据
        }
    },
    methods: {
        //获取vuex的mutations方法
        ...mapMutations('pubModule',['setSearch']),

        // 点击搜索按钮事件：将搜索的内容去更新vuex的search
        onSubmitSearch(){
            this.setSearch(this.search.content);
        },

        //点击添加按钮：用eventbus传递数据，将添加商品页面打开
        changeFlag(){
          this.$bus.$emit('onFlag',true)
        }
    }
};
</script>

<style scoped>
.head{
    width: 100%;
}
.el-form{
    display: flex;
     width: 100%;
}
.el-form-item:first-child{
    flex: 1;
}
.el-form-item{
margin-right: 10px;
}

</style>