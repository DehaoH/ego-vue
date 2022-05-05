<template>
<!-- 添加商品模块 -->
  <div>
    <!-- elementUI Dialog 对话框 
    :visible.sync="dialogVisible"：显示或者隐藏的属性
    :before-close="handleClose"：关闭的时候有个确认关闭的弹窗
    -->
    <el-dialog
      title="添加商品"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form label-width="70px" :model="addForm" ref="addForm">

        <!-- 选择类目部分，Tree 树形控件 -->
        <el-form-item label="商品类目">
          <el-button
            class="ProduckTreeBTN"
            type="primary"
            @click="ProduckTreeDialog"
            >类目选择</el-button
          >
          <span class="treeDate">{{ treeData.name }}</span>
          <!-- 类目选择的对话框
                append-to-body嵌套需要
               -->
          <el-dialog
            title="类目选择"
            :visible.sync="dialogTreeVisible"
            width="50%"
            append-to-body
          >
            <ProduckTree @onTreeDate="getTreeDate" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogTreeVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogTreeVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-form-item>

        <!-- input输入框部分 -->
        <el-form-item label="商品标题">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点">
          <el-input v-model="addForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="addForm.num"></el-input>
        </el-form-item>

        <!-- 上传图片部分 upload-->
        <el-form-item label="上传图片">
          <el-button
            class="ProduckTreeBTN"
            type="primary"
            @click="ProduckUploadDialog"
            >上传图片</el-button
          >
          <img class="uploadData" :src="uploadData.url" alt="" />
          <el-dialog
            title="上传图片"
            :visible.sync="dialogUploadVisible"
            width="50%"
            append-to-body
          >
            <ProductUpload @onUploadDate="getUploadDate" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogUploadVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogUploadVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-form-item>

        <!-- 商品描述部分 副文本编辑器 -->
        <el-form-item label="商品描述">
          <WangEditor @onEditor="getEditorDate" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addhandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProduckTree from "./produckTree.vue";
import ProductUpload from "./productUpload.vue";
import WangEditor from "./wangeEditor.vue";
import api from "../../api";

export default {
  data() {
    return {
      dialogVisible: false,
      dialogTreeVisible: false,
      dialogUploadVisible: false,
      addForm: {},
      treeData: {},
      uploadData: {},
      EditorDate: "",
    };
  },
  components: {
    ProduckTree,
    ProductUpload,
    WangEditor,
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

    //打开选择类目对话框的按钮
    ProduckTreeDialog() {
      this.dialogTreeVisible = true;
    },

    //打开图片上传对话框的按钮
    ProduckUploadDialog() {
      this.dialogUploadVisible = true;
    },

    //获取类目选择返回的数据
    getTreeDate(data) {
      this.treeData = data;
    },

    //获取图片上传返回的数据
    getUploadDate(data) {
      if (data.url) {
        data.url = data.url.replace("upload", "http://localhost:3000");
      }
      this.uploadData = data; //获取上传的图片数据url
    },

    //获取副文本编辑器返回的数据
    getEditorDate(data) {
      this.EditorDate = data;
      // console.log(this.EditorDate);
    },

    //添加商品对话框的确认按钮
    addhandle() {
      // console.log(this.addForm);    //获取input框的数据

      api
        .insertTbItem({
          title: this.addForm.title,
          cid: this.treeData.cid,
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.EditorDate,
          image: this.uploadData.url,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.dialogVisible = false;
            //添加商品成功，弹框
            this.$message({
              message: res.data.msg,
              type: 'success',
              duration:'1000'
            });
            //成功要刷新商品管理页面，传递一个true去list页面，同级用eventbus传递
            this.$bus.$emit("onRefresh", true);
          } else {
            console.log("添加失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  //点击添加传来的true，显示添加弹窗，用的是eventbus传递数据
  mounted() {
    this.$bus.$on("onFlag", (flag) => {
      this.dialogVisible = flag;
    });
  },
};
</script>

<style scoped>
.ProduckTreeBTN {
  float: left;
}
.treeDate {
  float: left;
  margin-left: 10px;
}
.uploadData {
  width: 300px;
  float: left;
  margin-left: 10px;
}
</style>