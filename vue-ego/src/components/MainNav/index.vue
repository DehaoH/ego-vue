<template>
<!-- 头部导航栏模块 -->
  <div>
    <div class="header">
      <div class="login">
        <!-- 语言切换的下拉列表
        command	点击菜单项触发的事件回调
          command获得绑定的参数
         -->
        <el-dropdown class="lang" @command="handleLang">
          <span class="el-dropdown-link">
            语言切换<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh"> 中文 </el-dropdown-item>
            <el-dropdown-item command="en"> English </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!--  elementUI：Badge 标记效果 -->
        <el-badge :value="12" class="item">
          <i class="el-icon-bell"></i>
        </el-badge>
        <!-- 用户名称显示 -->
        <span class="user-name">{{ username }}</span>
        <!-- elementUI：Dropdown 下拉菜单 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            用户中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <!--  tag="span" router-link默认渲染成a标签，改为span标签 -->
              <router-link to="user" tag="span">用户中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="logout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 
        elementUI的导航
        :default-active：高亮效果的指引，对应index
        router：开启路由效果，index作为路由
    -->
    <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/produck">
        <i class="el-icon-s-platform"></i>
        <span>{{ $t("message.produck") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-s-tools"></i>
        <span>{{ $t("message.params") }}</span>
      </el-menu-item>
      <el-menu-item index="/content">
        <i class="el-icon-s-grid"></i>
        <span>{{ $t("message.content") }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      currentIndex: "/produck",
    };
  },
  computed: {
    ...mapState("loginModule", ["username"]),
  },
  mounted() {
    this.currentIndex = this.$route.path;  //让高亮跟着路由来
  },
  methods: {
    ...mapMutations("loginModule", ["clearToken", "clearUsername"]),
    /**
     * 用户退出登录
     * 1.去除vuex登录状态
     * 2.移除本地存储的登录状态：localStroage
     * 3.返回登录页面
     */
    logout() {
      this.clearToken();
      this.clearUsername();
      localStorage.removeItem("ego");
      this.$router.push("/login");
    },

    //语言切换
    handleLang(command) {
      console.log(command);
      this.$i18n.locale = command;
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  text-align: left;
}
.header {
  height: 50px;
  line-height: 50px;
  background: #fff;
  width: 100%;
  box-shadow: 0px 5px 30px #888888;
}
.header .login {
  height: 50px;
  float: right;
  margin-right: 20px;
}
.header .login .item {
  height: 25px;
  margin-right: 30px;
}
.header .login .item i {
  display: block;
  font-size: 25px;
}
.user-name {
  height: 40px;
  line-height: 40px;
  width: 40px;
  color: #ffd04b;
  display: inline-block;
  background: #888888;
  border-radius: 50%;
  margin-top: 5px;
  margin-right: 10px;
}
.lang {
  margin-right: 10px;
}
</style>