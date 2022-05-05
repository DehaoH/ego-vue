<template>
<!-- 上传图片组件

action="http://localhost:3000/api/upload"   这是接口
auto-upload	是否在选取文件后立即进行上传
on-success	文件上传成功时的钩子
 -->
  <el-upload
    ref="upload"
    action="http://localhost:3000/api/upload"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="handleSuccess"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    //上传成功的回调
    handleSuccess(res,file){        
        // console.log(res);
        this.$emit('onUploadDate',res)  
    },
    //点击上传触发的事件： 
    //$refs.upload   =>    ref="upload"     适配上面的upload
    // submit手动上传文件列表
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
};
</script>

<style>
</style>