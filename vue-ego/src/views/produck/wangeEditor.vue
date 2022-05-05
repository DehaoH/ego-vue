<template>
<!-- wangRditor富文本编辑器模块 -->
  <div>
    <div ref="wangEditor" id="wangEditor" style="text-align: left"></div>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  data() {
    return {
      editorContent: "",  //编译器的内容
    };
  },
  props:{
    editorData:{
      type:String,
      default:""
    }
  },
  watch:{
    editorData(newVal){
      this.editor.txt.html(newVal)
    }
  },
  mounted() {
    // 老版本这样加载
    this.editor = new wangEditor(this.$refs.wangEditor);
    this.editor.config.onchange = (newHtml) => {
      this.editorContent = newHtml;
      // console.log(newHtml);
      this.$emit("onEditor",newHtml)
    };

    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
    ];

    // 创建编辑器
    this.editor.create();
  },
};
</script>

<style>
</style>