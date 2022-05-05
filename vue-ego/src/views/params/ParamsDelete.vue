<template>
<!-- 删除规格参数模块 -->
  <el-table-column label="操作" width="100">
    <template slot-scope="scope">
      <el-button
        size="mini"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)"
        >删除</el-button
      >
    </template>
  </el-table-column>
</template>

<script>
import api from '../../api'
export default {
  methods: {
    handleDelete(index, row) {
    //   console.log(index, row.id);

      // MessageBox 弹框组件来确认是否删除
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        //点击确认按钮
      })
        .then(() => {
          //进行网络请求删除该数据
          api
            .deleteParams({
              id: row.id,
            })
            .then((res) => {
              console.log(res);
              if (res.data.status === 200) {
                //请求成功，代表删除成功
                this.$message({
                  type: "success",
                  message: res.data.msg, //显示删除成功
                  duration: 2000,
                });
                //成功后数据的重绘
                this.$bus.$emit('onRefresh',true);
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg, //显示删除失败
                  duration: 2000,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
          //点击取消按钮
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>