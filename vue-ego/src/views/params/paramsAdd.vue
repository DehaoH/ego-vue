<template>
<!-- 添加规格参数模块 -->
  <div>
    <el-dialog
      title="选择类目"
      :visible.sync="dialogParamsVisible"
      width="70%"
      :before-close="handleClose"
    >
      <!-- 树形选择器 -->
      <ParamsTree @onTreeDate='getID'/>
      <!-- 添加弹框 -->
      <el-dialog
        title="添加规格参数"
        :visible.sync="dialogParamsChildVisible"
        width="60%"
        :before-close="handleClose"
        append-to-body
      >
        <el-form :model="paramsDoMain" ref="paramsDoMain">
          <el-form-item
            label="规格参数"
            v-for="(item, index) in paramsDoMain.domains"
            :key="index"
          >
            <el-button @click="delMainParamsHandle(index)"
              >删除主结构</el-button
            >
            <el-input
              placeholder="添加主结构"
              style="width: 70%"
              v-model="item.value"
              class="ParamsInput"
            >
            </el-input>
            <!-- 子结构 -->
            <div
              class="childParams"
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
            >
              <el-input
                placeholder="添加子结构"
                style="width: 80%"
                class="ParamsInput"
                v-model="childItem.childValue"
              >
              </el-input>
              <el-button @click="delChildParamsHandle(index, childIndex)"
                >删除子结构</el-button
              >
            </div>
            <!-- 添加子结构 -->
            <div class="childBtn">
              <el-button @click="addChildParamsHandle(index)"
                >添加子结构</el-button
              >
            </div>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <!-- 添加主结构 -->
          <el-button @click="addMainParamsHandle">添加主结构</el-button>
          <el-button @click="dialogParamsChildVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHandle">确 定</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogParamsVisible = false">取 消</el-button>
        <el-button type="primary" @click="upChildHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ParamsTree from "../../components/pubTree";
import api from '../../api'
export default {
  data() {
    return {
      dialogParamsVisible: false,
      dialogParamsChildVisible: false,
      paramsCid:'',
      paramsDoMain: {
        domains: [
          {
            value: "",
            children: [
              {
                childValue: "",
                // value并不是在这里添加，这里只添加一个结构，具体数据，有添加商品的时候处理
                value: "",
              },
            ],
          },
        ],
      },
    };
  },
  components: {
    ParamsTree,
  },
  methods: {
    //handleClose"：关闭的时候有个确认关闭的弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 打开添加弹框
    upChildHandle() {
      this.dialogParamsChildVisible = true;
    },
    getID(data){
        this.paramsCid=data.cid
    //    console.log(data);
    },
    //添加提交
    addHandle() {
      this.dialogParamsVisible = false;
      this.dialogParamsChildVisible = false;
      api.insertItemParam({
          itemCatId:this.paramsCid,
          paramData:this.paramsDoMain
      }).then(res=>{
        //   console.log(res);
          if(res.data.status === 200){
              //刷新列表
              this.$bus.$emit('onRefresh',true)
          }
      }).catch(error=>{
          console.log(error);
      })
    },
    /**
     * 添加主结构
     */
    addMainParamsHandle() {
      this.paramsDoMain.domains.push({
        value: "",
        children: [
          {
            childValue: "",
            value: "",
          },
        ],
      });
    },
    /**
     * 删除主结构
     */
    delMainParamsHandle(index) {
      this.paramsDoMain.domains.splice(index, 1);
    },
    /**
     * 添加子结构
     */
    addChildParamsHandle(index) {
      this.paramsDoMain.domains[index].children.push({
        childValue: "",
        value: "",
      });
    },
    /**
     * 删除子结构
     */
    delChildParamsHandle(index, childIndex) {
      this.paramsDoMain.domains[index].children.splice(childIndex, 1);
    },
  },
  mounted() {
    //pubHead.vue中添加按钮触发，传过来的true
    this.$bus.$on("onFlag", (flag) => {
      this.dialogParamsVisible = flag;
    });
    
  },
};
</script>

<style scoped>
.ParamsInput {
  float: left;
}
.childParams {
  text-align: right;
}
.childBtn {
  text-align: left;
}
</style>