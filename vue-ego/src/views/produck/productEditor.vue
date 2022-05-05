<template>
<!-- 商品编辑修改模块 -->
  <div>
    <!-- 编辑商品的弹出框    -->
    <el-dialog
      title="编辑商品"
      :visible.sync="dialogEditorVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form label-width="70px" :model="editorForm" ref="editorForm">

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
          <el-input v-model="editorForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点">
          <el-input v-model="editorForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="editorForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="editorForm.num"></el-input>
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
          <WangEditor @onEditor="getEditorDate" :editorData='EditorDate'/>
        </el-form-item>
      </el-form>

      <!-- 确定和取消按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditorVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorHandle">确 定</el-button>
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
      dialogEditorVisible: false,
      dialogTreeVisible: false,
      dialogUploadVisible: false,
      editorForm: {},
      treeData: {},
      uploadData: {},
      EditorDate: "",
      EditorID:''
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

    //修改商品确认按钮
    editorHandle() {
      //网络请求修改商品
      api.updateTbItem({
        id:this.EditorID,
        title: this.editorForm.title,
        cid: this.treeData.cid,
        sellPoint: this.editorForm.sellPoint,
        price: this.editorForm.price,
        num: this.editorForm.num,
        desc: this.EditorDate,
        image: this.uploadData.url,
      }).then(res=>{
        console.log(res);
        //成功弹出消息框
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
        //刷新列表
        this.$bus.$emit('onRefresh',true);
      }).catch(err=>{
        console.log(err);
      })
      //关闭修改页面
      this.dialogEditorVisible = false;
    },
  },
  mounted() {
    //预更新数据
    //点击编辑后，显示添加弹窗，做网络请求预更新数据
    this.$bus.$on("onEditorFlag", (row) => {
      this.dialogEditorVisible = true;
      this.EditorID = row.id; //这个id修改商品时用到
      api.preUpdateItem({
        id:row.id
      }).then(res=>{
        console.log(res);
        this.treeData = {
          name:res.data.result[0].cid
        }
        this.editorForm = {
          title:res.data.result[0].title,
          sellPoint:res.data.result[0].sellPoint,
          price:res.data.result[0].price,
          num:res.data.result[0].num,
        }
        this.uploadData = {
          url:res.data.result[0].image
        }
        this.EditorDate = res.data.result[0].descs
      }).catch(err=>{
        console.log(err);
      })
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