<template>
<!-- 广告分类页面 -->
  <div>
    <!-- tag 标签
    closable	是否可关闭
    disable-transitions	是否禁用渐变动画
    @blur="handleInputConfirm"  失去焦点触发
     -->
    <div class="title">
      <el-tag
        class="tag"
        :key="index"
        v-for="(tag, index) in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        @click="handleClick(tag)"
      >
        {{ tag.name }}
      </el-tag>
      <el-input
        class="input-new-tag tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
      >
      </el-input>
      <el-button
        v-else
        class="button-new-tag tag"
        size="small"
        @click="showInput"
        >+ 添加广告</el-button
      >
    </div>
    <div class="contentInfo">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="name"
          label="名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="url"
          label="地址"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="image"
          label="图片"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "../../api";
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      tableData: [],
    };
  },
  methods: {
    //点击关闭，删除对应内容
    handleClose(tag) {
      api
        .contentDelete({
          pid: tag.pid,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 2000, //提示框显示时间
            });
            this.http();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
              duration: 2000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 点击content的标题，显示出pid对应的内容
    handleClick(tag) {
      api
        .contentInfo({
          pid: tag.pid,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.tableData = res.data.result;
          } else {
            this.tableData = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 点击添加按钮，显示input
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    //输入框回车，添加content内容
    handleInputConfirm() {
      let inputValue = this.inputValue;
      api
        .contentInsert({
          name: inputValue,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 2000, //提示框显示时间
            });
            this.http();
            this.inputVisible = false;
            this.inputValue = "";
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
              duration: 2000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    http() {
      api
        .contentTitle()
        .then((res) => {
          // console.log(res);
          this.dynamicTags = res.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.http();
  },
};
</script>

<style scoped>
.tag {
  float: left;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.contentInfo {
  margin-top: 10px;
}
.title {
  /* 清除浮动 */
  overflow: hidden;
}
</style>