<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div
      class="container"
      style="display: flex; justify-content: center; align-items: center"
    >
      <div class="user-layout-content" style="padding: 45px 0">
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <div
            class="user-layout-content-inner"
            style="
              width: auto;
              background-color: #d2d2d2;
              border-left: 2px solid #f0f2f5;
              border-top: 2px solid #f0f2f5;
              border-bottom: 2px solid #f0f2f5;

              width: 500px;
              height: 563px;
              padding: 0px;
              border-radius: 10px 0 0 10px;
            "
          >
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <el-carousel
                  height="560px"
                  direction="horizontal"
                  :autoplay="true"
                  :interval="3000"
                  indicator-position="none"
                >
                  <el-carousel-item>
                    <img
                      src="@/assets/pages/user/login/login_bg_1.jpg"
                      style="max-height: 560px"
                    />
                  </el-carousel-item>
                  <el-carousel-item>
                    <img
                      src="@/assets/pages/user/login/login_bg_2.jpg"
                      style="max-height: 560px"
                    />
                  </el-carousel-item>
                  <el-carousel-item>
                    <img
                      src="@/assets/pages/user/login/login_bg_3.jpg"
                      style="max-height: 560px"
                    />
                  </el-carousel-item>
                  <el-carousel-item>
                    <img
                      src="@/assets/pages/user/login/login_bg_4.jpg"
                      style="max-height: 560px"
                    />
                  </el-carousel-item>
                </el-carousel>
              </el-col>
            </el-row>
          </div>

          <div
            class="user-layout-content-inner"
            style="
              width: auto;
              background-color: white;
              border-right: 2px solid #f0f2f5;
              border-top: 2px solid #f0f2f5;
              border-bottom: 2px solid #f0f2f5;
              border-radius: 0px 10px 10px 0px;

              width: 500px;
              height: 563px;
              padding: 30px;
              padding-top: 50px;
            "
          >
            <div class="top">
              <div class="header" style="padding-left: 50px">
                <a href="/">
                  <img src="@/assets/logo.png" class="logo" alt="logo" />
                  <span class="title">碳盟链道</span>
                  <img
                    class="logo"
                    src="@/assets/sub_logo.png"
                    style="
                      width: auto;
                      transform: scale(0.65) translateY(-25px);
                    "
                  />
                </a>
              </div>
              <div class="desc">链接绿色未来，碳盟领航之道</div>
            </div>

            <!-- 用户登录表单 -->
            <div class="user-layout-login">
              <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                auto-complete="on"
                label-width="80px"
              >
                <el-form-item prop="userName">
                  <el-input
                    style="width: 350px"
                    prefix-icon="el-icon-user"
                    placeholder="请输入账户名"
                    v-model="loginForm.userName"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="userPwd">
                  <el-input
                    style="width: 350px"
                    show-password
                    prefix-icon="el-icon-lock"
                    placeholder="请输入账户密码"
                    v-model="loginForm.userPwd"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button
                    style="
                      width: 350px;
                      background-color: #1890ff;
                      color: #ffff;
                      border-radius: 8px;
                      font-size: 15px;
                    "
                    @click.native.prevent="handleLogin"
                    >监管端登录</el-button
                  ></el-form-item
                >
                <el-form-item>
                  <div style="width: 350px">
                    <router-link
                      :to="'/register'"
                      style="float: left; color: #1890ff"
                      >注册监管端账户</router-link
                    ><router-link
                      :to="'/user/forget'"
                      style="float: right; color: #1890ff"
                      >忘记密码</router-link
                    >
                  </div></el-form-item
                >
                <el-form-item
                  style="
                    margin-top: 80px;
                    box-shadow: 0 -2px 0 rgba(0, 0, 0, 0.2);
                  "
                >
                  <div style="width: 350px; padding: 5px">
                    <router-link
                      :to="'/user/register'"
                      style="float: left; color: #134089"
                      ><svg
                        t="1709624066310"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="6904"
                        id="mx_n_1709624066311"
                        width="11"
                        height="11"
                      >
                        <path
                          d="M512 0C229.205333 0 0 229.205333 0 512s229.205333 512 512 512 512-229.205333 512-512S794.794667 0 512 0zM394.410667 87.893333c-30.506667 25.813333-57.813333 61.226667-80.512 104.106667-20.693333-10.496-40.533333-22.485333-59.178667-36.010667h-1.408A438.442667 438.442667 0 0 1 394.410667 87.893333zM198.186667 203.605333A520.96 520.96 0 0 0 284.586667 257.92c-22.101333 60.074667-36.565333 129.493333-41.088 204.074667H74.794667a438.101333 438.101333 0 0 1 123.392-258.389334zM72.533333 534.016h169.813334c2.176 85.290667 17.493333 164.565333 42.282666 232.106667-30.72 15.189333-59.605333 33.493333-86.4 54.272A438.272 438.272 0 0 1 72.533333 534.016z m180.906667 333.994667h1.408c18.688-13.525333 38.4-25.514667 59.178667-36.010667 22.826667 42.88 50.005333 78.293333 80.512 104.106667a436.48 436.48 0 0 1-141.098667-68.096z m227.584 38.101333c-39.381333-12.501333-74.88-48.426667-102.997333-100.309333a437.802667 437.802667 0 0 1 102.997333-19.712v120.021333z m0-192.213333a508.16 508.16 0 0 0-131.669333 25.514666c-20.309333-58.88-32.896-129.28-34.986667-205.397333h166.656v179.882667z m0-251.904H315.52c4.096-65.408 16-125.781333 33.706667-177.408 41.813333 13.994667 85.888 22.698667 131.669333 25.514666v151.893334h0.085333z m0-224.085334a437.802667 437.802667 0 0 1-102.997333-19.712c28.117333-52.010667 63.616-87.893333 102.997333-100.266666v119.978666z m468.224 224.085334h-168.704c-4.48-74.581333-18.986667-144-41.088-204.074667 30.72-15.232 59.605333-33.536 86.4-54.314667a438.101333 438.101333 0 0 1 123.392 258.389334zM770.56 155.989333h-1.408c-18.688 13.525333-38.4 25.514667-59.178667 36.010667-22.826667-42.88-50.005333-78.293333-80.512-104.106667a436.48 436.48 0 0 1 141.098667 68.096z m-217.6-34.389333c35.413333 15.018667 67.285333 49.066667 93.013333 96.597333-29.696 9.514667-60.928 15.914667-93.013333 18.901334V121.6z m0 187.818667c42.197333-3.328 82.986667-11.818667 121.685333-24.832 17.792 51.626667 29.696 112 33.706667 177.408h-155.392V309.418667z m0 224.597333h156.714667c-2.133333 76.074667-14.72 146.474667-34.986667 205.397333a510.72 510.72 0 0 0-121.728-24.832v-180.565333z m0 368.384v-115.498667c32.085333 2.986667 63.189333 9.386667 93.013333 18.901334-25.728 47.488-57.6 81.578667-93.013333 96.597333z m76.586667 33.706667c30.506667-25.813333 57.813333-61.226667 80.512-104.106667 20.693333 10.496 40.533333 22.485333 59.178666 36.010667h1.408a438.442667 438.442667 0 0 1-141.098666 68.096z m196.224-115.712a520.96 520.96 0 0 0-86.4-54.314667c24.874667-67.498667 40.106667-146.858667 42.282666-232.106667h169.813334a438.272 438.272 0 0 1-125.696 286.421334z"
                          fill="#134089"
                          opacity=".65"
                          p-id="6905"
                        ></path></svg
                      >&ensp;切换英文(Switch to English)</router-link
                    ><router-link
                      :to="'/user/forget'"
                      style="float: right; color: #134089"
                      >前往企业端&ensp;<svg
                        t="1709624225353"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="9066"
                        id="mx_n_1709624225354"
                        width="11"
                        height="11"
                      >
                        <path
                          d="M1024 503.617014c0-28.474818-10.88877-55.218366-31.026161-75.355758L697.67859 132.829329a56.949635 56.949635 0 0 0-80.549563 0 57.200214 57.200214 0 0 0 0 80.777363l240.874176 240.783057H56.585158C25.103399 454.412529 0 480.222104 0 511.726642v0.637836c0 31.481758 25.103399 57.473572 56.585158 57.473571h801.440825L617.197366 810.484428a57.040755 57.040755 0 0 0 80.595124 80.640683l295.181349-295.454707a105.539064 105.539064 0 0 0 31.026161-75.378537v-16.674853z"
                          fill="#134089"
                          opacity=".65"
                          p-id="9067"
                        ></path></svg
                    ></router-link></div
                ></el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",

  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error("Please enter the correct user name"));
    //   } else {
    //     callback();
    //   }
    // };

    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error("The password can not be less than 6 digits"));
    //   } else {
    //     callback();
    //   }
    // };

    return {
      loginForm: {
        // userName: "cstring",
        // userPwd: "cstring",
        userName: this.$route.query.userName,
        userPwd: this.$route.query.userPwd,
      },

      loginRules: {
        userName: [
          {
            required: true,
            message: "请输入账户名",
            trigger: "blur",
            // validator: validateUsername,
          },
        ],
        userPwd: [
          {
            required: true,
            message: "请输入账户密码",
            trigger: "blur",
            // validator: validatePassword,
          },
        ],
      },

      loading: false,
      passwordType: "password",
      redirect: undefined,
      remember: "",
      rememberCheck: false,
    };
  },

  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },

  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
              this.$message({
                type: "success",
                message: "欢迎登录碳盟链道！",
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.$message({
            message: "请完成登录信息填写！",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 7px;
}

::v-deep .el-form-item__content {
  margin-left: 0 !important;
}
</style>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f7f9fe url(~@/assets/background.svg) no-repeat 50%;
    background: #4e73df url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    //padding: 50px 0 84px;
    position: relative;

    .user-layout-lang {
      width: 100%;
      height: 40px;
      line-height: 44px;
      text-align: right;

      .select-lang-trigger {
        cursor: pointer;
        padding: 12px;
        margin-right: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        vertical-align: middle;
      }
    }

    .user-layout-content {
      padding: 32px 0 24px;

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, 0.85);
            font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        // position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
