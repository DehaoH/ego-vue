<template>
<!-- 规格参数列表展示模块 -->
  <div>
    <!-- el-table组件
    :data   数据绑定是一个数据
    prop    对应data的数据
    show-overflow-tooltip  一行显示，超出的提示
    -->
    <el-table :data="paramsData">
      <el-table-column
        prop="id"
        label="规格参数ID"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="itemCatId"
        label="产品管理ID"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="paramData"
        label="规格参数"
        show-overflow-tooltip
      ></el-table-column>
      <ParamsDelete />
    </el-table>
  </div>
</template>

<script>
import api from "../../api";
import { mapState } from "vuex";
import ParamsDelete from './ParamsDelete.vue'
export default {
  data() {
    return {
      paramsData: [],
    };
  },
  components: {
    ParamsDelete  
  },
  computed: {
    ...mapState("pubModule", ["search"]),
  },
  watch: {
    search(newVal) {
      api
        .paramsSearch({
          search: newVal,
          page: 1,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.paramsData = res.data.result;
          } else {
            this.paramsData = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.http(1);
    this.$bus.$on("onRefresh", (flag) => {
      if (flag) {
        this.http(1);
      }
    });
  },
  methods: {
    http(page) {
      api
        .selectItemParamAll(page)
        .then((res) => {
          // console.log(res);
          if (res.data.status === 200) {
            this.paramsData = res.data.result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>