<template>
<!-- Tree 树形控件模块 -->
  <div>
    <!-- Tree 树形控件 
      懒加载自定义叶子节点 
      props	配置选项
      node-click	节点被点击时的回调
      load	加载子树数据的方法，仅当 lazy 属性为true 时生效
      lazy	是否懒加载子节点，需与 load 方法结合使用
      -->
    <el-tree :props="props" :load="loadNode" lazy @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
import api from "../../api";
export default {
  data() {
    return {
      props: {
        label: "name",  //props	配置选项：：label	指定节点标签为节点对象的某个属性值
      },
    };
  },
  methods: {
    //点击选择的回调
    handleNodeClick(data) {
      //data是选择的数据，
      this.$emit("onTreeDate",data);

    },

    //懒加载
    loadNode(node, resolve) {
      // console.log(node);

      //第一次加载，就是tree的第一层
      if (node.level === 0) {
        api
          .selectItmeCategoryByParentId()
          .then((res) => {
            // console.log(res);
            if (res.data.status === 200) {
              return resolve(res.data.result);  //适配tree的数据  [{ name: 'region' }]
            }
            return resolve([]);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //非第一次加载，就是tree的后面层
      if (node.level >= 1) {
        api
          .selectItmeCategoryByParentId({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.data.status === 200) {
              return resolve(res.data.result);
            }
            return resolve([]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>
</style>