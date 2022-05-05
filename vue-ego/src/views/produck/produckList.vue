<template>
<!-- 商品列表模块 -->
    <!--elementUI的table 表格
        :data="tableData"： 数据绑定
        prop:数据绑定=>tableData[i].id
        show-overflow-tooltip:一行显示，多了隐藏

    -->
<div>
  <el-table :data="tableData">
      <el-table-column prop="id" label="商品ID" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="title" label="商品标题" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="image" label="商品图片" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="price" label="商品价格" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="num" label="商品数量" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="descs" label="商品描述"  show-overflow-tooltip>
          <!-- 下面的操作是让商品描述的内容去掉html结构 -->
          <template slot-scope="scope">
              <div v-html="scope.row.descs"></div>
          </template>
      </el-table-column>

        <!-- 编辑和删除按钮操作 -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
    <productEditor />
</div>


</template>

<script>
import api from '../../api'
import productEditor from './productEditor.vue'
import { mapState,mapMutations } from 'vuex'
export default {
    data () {
        return {
            tableData:[]
        }
    },
    components: {
      productEditor  
    },
    computed: {
        //监听vuex保持的'page'页码,'search'搜索字样
        ...mapState('pubModule',['page','search']),  
        pageChange(){       //存到pageChange函数里面
            return this.page
        },
        searchChange(){
            return this.search
        }
    },
    watch: {
        //页码发生改变时，重新请求数据
        pageChange(newVal,oldVal){     
            if(newVal != oldVal){
                this.http(newVal)
            }
        },

        //vuex中的search搜索字样发生变动，进行网络请求，进行模糊搜索
        searchChange(newVal){       
           api.search({
               search:newVal
           }).then(res=>{
                // console.log(res.data.result.length);
               if(res.data.status ===200){
                    this.tableData = res.data.result;
                    this.setTotal(res.data.result.length);      //更新数据总数，给分页进行更新分页器的页码数
               }else{
                    this.tableData = [];
                    this.setTotal(-1);  //查找不到数据，数据总数给个-1，因为默认是0，给0就没变化，监听不到，分页器不会更新
               }
           }).catch(err=>{
               console.log(err);
           })
        }
    },
    mounted () {
        //刷新列表，渲染在视图上，添加成功或者修改成功后
        this.$bus.$on('onRefresh',flag=>{
            if(flag){
                this.http(1);
            }
        })
        //请求重绘
        this.http(1);

        // this.$bus.$on('onPage',data=>{  ////通过事件总线eventbus接收数据
        //     console.log(data);
        // })
    },
    methods: {
        ...mapMutations('pubModule',['setTotal']),
         //初始化的商品列表请求
        http(page){
            api.selectTbItemAllByPage({page})
            .then(res=>{
                if(res.data.status === 200){
                    // console.log(res.data);
                    this.tableData = res.data.result
                }
                // console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        //编辑按钮的事件 index代表下标，row代表整体数据全部内容
        handleEdit(index, row) {
            console.log(index, row);
            this.$bus.$emit('onEditorFlag',row);
        },

        // 删除功能的实现
        //删除按钮的事件 index代表下标，row代表整体数据全部内容
        handleDelete(index, row) {
            // console.log(index, row.id);
            
            // MessageBox 弹框组件来确认是否删除
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            //点击确认按钮
            }).then(() => {                     

                //进行网络请求删除该数据
                api.deleteItemById({
                    id:row.id
                }).then(res=>{
                    console.log(res);
                    if(res.data.status === 200){  //请求成功，代表删除成功
                        this.$message({
                            type: 'success',
                            message: res.data.msg,      //显示删除成功
                            duration:2000
                        });
                        this.http(1);               //成功后数据的重绘
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg,       //显示删除失败
                            duration:2000
                        });
                    }     
                }).catch(err=>{
                    console.log(err);
                })
            //点击取消按钮
            }).catch(() => {                    
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }

}
</script>

<style>

</style>