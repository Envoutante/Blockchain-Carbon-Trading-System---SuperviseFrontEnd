<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        style="float: left"
        menu-trigger="click"
        @open="open"
        unique-opened="true"
      >
        <el-submenu index="1">
          <template slot="title"
            ><span v-if="language === 1">中文</span>
            <span v-if="language === 2">英文</span>
          </template>
          <el-menu-item>中文</el-menu-item>
          <el-menu-item>英文</el-menu-item>
        </el-submenu>
        <el-menu-item index="2"
          ><span>消息中心</span><el-badge is-dot class="item"
        /></el-menu-item>
        <el-submenu index="3">
          <template slot="title"
            ><span v-if="userType === 1">数据审核员</span>
            <span v-if="userType === 2">监管员</span>
            <span v-if="userType === 3">管理员</span></template
          >
          <el-menu-item><router-link to="/">主页</router-link></el-menu-item>
          <el-menu-item @click="logout">退出</el-menu-item>
        </el-submenu>
      </el-menu>

      <div class="avatar-container" style="float: right">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  data() {
    return {
      language: 1,
      userType: 1,
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    open(index) {
      let element = document.querySelector(".el-menu--popup");
      element.style.minWidth = "70px";
      element.style.margin = "7px 0 0 15px";
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style scoped>
.el-popper {
  margin-top: -5px;
}

.el-menu-item,
.el-submenu /deep/ .el-submenu__title {
  height: 50px;
  line-height: 50px;
  border-bottom: 0px;
}

.el-menu-item.is-active,
.el-submenu.is-active /deep/ .el-submenu__title {
  color: #909399;
  border-bottom: 0px;
}

.el-menu--collapse .el-menu .el-submenu,
.el-submenu /deep/ .el-menu--popup {
  min-width: 100px;
}

.item {
  margin-top: -6px;
  margin-left: 6px;
}
</style>
