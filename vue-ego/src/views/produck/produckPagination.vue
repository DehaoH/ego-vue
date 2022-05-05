<template>
  <!-- 商品分页器模块 -->
  <!-- Pagination 分页
total：总数，来适配下面总共有多少也
layout	组件布局，子组件名用逗号分隔	 prev上一页, pager（...）, next下一页
 -->
  <el-pagination
    class="pagination"
    background
    layout="prev, pager, next"
    @current-change="currentChange"
    :total="total"
  >
  </el-pagination>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import api from "../../api";
export default {
  data() {
    return {
      total: 0,
    };
  },
  computed: {
    //获取vuex的state数据
    ...mapState("pubModule", ["vuexTotal","search"]),

    //返回vuex存储的vuexTotal商品总数的方法
    // updateTotal() {
    //   return this.vuexTotal;
    // },
    // getSearch(){
    //     return this.search;
    // }
  },
  watch: {
    //监控updateTotal方法，vuexTotal商品总数数据发生变化，改变分页器的总商品数total
    //获取搜索出来的商品数量
    vuexTotal(newVal) {
      this.total = newVal;
    },
    //如果搜索的内容为空，就是全部内容都搜索出来，重新获取商品总数
    search(newVal){
        // console.log(newVal);
        if(newVal==''){
            this.getTotal();
        }
    }
  },
  mounted() {
    //初始化的商品总数的请求，拿来适配需要分页器一共有多少页
    this.getTotal();
  },
  methods: {
    //获取vuex的mutations方法
    ...mapMutations("pubModule", ["setPage"]),

    //点击分页器触发：val参数是页码数，将页码传到到vuex，在商品列表页面重新请求当前页码的数据
    currentChange(val) {
      //有2种方法传递给list页面，1是存在vuex，2是通过eventbus传
      this.setPage(val);
      // this.$bus.$emit('onPage',val);  //通过事件总线eventbus发送数据
    },
    //获取商品总数量
    getTotal() {
      api
        .total()
        .then((res) => {
          // console.log(res.data.result[0]['count(*)']);
          this.total = res.data.result[0]["count(*)"];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}
</style>