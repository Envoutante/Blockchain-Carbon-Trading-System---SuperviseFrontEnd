<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="avatar-container" style="float: right">
        <div class="avatar-wrapper">
          <el-dropdown :hide-on-click="true" trigger="click">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              :size="30"
            />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><router-link to="/">主页</router-link></el-dropdown-item
              >
              <!-- <el-dropdown-item @click.native="logout">退出</el-dropdown-item> -->
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              <!-- <el-dropdown-item
                ><router-link to="/login">退出</router-link></el-dropdown-item
              > -->
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color: #ffffff; margin-left: 10px; font-size: 15px"
            >数据审核员</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Cookies from "js-cookie";

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
    // async logout() {
    //   await this.$store.dispatch("user/logout");
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    // },
    logout() {
      this.$confirm("确定退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          // this.$store.dispatch("logout");
          // this.$store.commit("SET_PERMS", "");
          this.$message({
            type: "success",
            message: "退出系统成功！",
          });
          setTimeout(() => {
            // 最重要的就是这个,删除cookies
            Cookies.remove("token");
            location.reload(); // 不能省，强制跳到登陆页
            this.$router.push(`/login`);
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
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
  background: #134089;
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
      margin-right: 20px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
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
.el-dropdown {
  display: flex;
  align-items: center;
}
</style>
