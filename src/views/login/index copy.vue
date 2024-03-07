<template>
  <div class="container">
    <div class="welcome">
      <div class="pinkbox">
        <div class="signup nodisplay">
          <h1>注册</h1>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <input type="text" placeholder="username" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="confirm password" />
            <button class="button register">注册账号</button>
          </el-form>
        </div>
        <div class="signin">
          <h1>登录</h1>
          <form class="more-padding" autocomplete="off">
            <input
              type="text"
              placeholder="用户名"
              v-model="loginForm.username"
            />
            <input
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            />
            <el-checkbox v-model="rememberCheck"
              ><label for="remember">记住我</label></el-checkbox
            >

            <el-button class="button login" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </form>
        </div>
      </div>
      <div class="leftbox">
        <h2 class="title"><span>碳盟</span>&<br />链道</h2>
        <p class="desc">pick your perfect <span>bouquet</span></p>
        <img
          class="flower smaller"
          src="https://image.ibb.co/d5X6pn/1357d638624297b.jpg"
          alt="1357d638624297b"
          border="0"
        />
        <p class="account">have an account?</p>
        <button class="button" id="signin">login</button>
      </div>
      <div class="rightbox">
        <h2 class="title"><span>碳盟</span>&<br />链道</h2>
        <p class="desc">链接绿色未来，碳盟领航之道</p>
        <img
          class="flower"
          src="https://preview.ibb.co/jvu2Un/0057c1c1bab51a0.jpg"
        />
        <p class="account">还没有账户?</p>
        <button class="button register" id="signup">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
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
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$gray: #8e9aaf;
$lavender: #cbc0d3;
// $pale: #eac7cc;
$pale: #134089;
$white: #f6f6f6;

// $pink: darken($pale, 20%);
$pink: #ffffff;

@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400|Lora");

$sans-serif: "Open Sans", sans-serif;
$serif: "Lora", serif;

body {
  background: $lavender;
}

/* div box styling */
.container {
  margin: auto;
  width: 650px;
  height: 550px;
  position: relative;
}

.welcome {
  background: $white;
  width: 650px;
  height: 415px;
  position: absolute;
  top: 25%;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.pinkbox {
  position: absolute;
  top: -10%;
  left: 5%;
  background: $pale;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  z-index: 2;
}

.nodisplay {
  display: none;
  transition: all 0.5s ease;
}

.leftbox,
.rightbox {
  position: absolute;
  width: 50%;
  transition: 1s all ease;
}

.leftbox {
  left: -2%;
}
.rightbox {
  right: -2%;
}

/* font & button styling */
h1 {
  font-family: $sans-serif;
  text-align: center;
  margin-top: 95px;
  text-transform: uppercase;
  color: $white;
  font-size: 2em;
  letter-spacing: 8px;
}

.title {
  font-family: $serif;
  color: $gray;
  font-size: 1.8em;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  font-weight: 300;
  margin-top: 20%;
}
.desc {
  margin-top: -8px;
}
.account {
  margin-top: 45%;
  font-size: 10px;
}
p {
  font-family: $sans-serif;
  font-size: 0.7em;
  letter-spacing: 2px;
  color: $gray;
  text-align: center;
}

span {
  color: $pale;
}

.flower {
  position: absolute;
  width: 120px;
  height: 120px;
  top: 46%;
  left: 29%;
  opacity: 0.7;
}

.smaller {
  width: 90px;
  height: 100px;
  top: 48%;
  left: 38%;
  opacity: 0.9;
}

button {
  background-color: $gray;
  width: 100px;
  padding: 12px;
  font-family: $sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 11px;
  margin: auto;
  outline: none;
  display: block;
  // &:hover {
  //   background: $pale;
  //   color: $white;
  //   transition: background-color 1s ease-out;
  // }
}

.button {
  margin-top: 3%;
  background: $white;
  color: $pale;
  font-size: 15px;
  // border: solid 1px $pale;
}

/* form styling */

form {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 7px;
}
.more-padding {
  padding-top: 35px;
  input {
    padding: 12px;
  }
  .login,
  .register {
    margin-top: 45px;
  }
}

.login {
  margin-top: 25px;
  padding: 12px;
  background-color: $pale;
  border: 1px solid $white;
  color: $white;
  border-radius: 0;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.2);
  }
}

.register {
  margin-top: 25px;
  padding: 12px;
  background-color: $pale;
  border: 0;
  color: $white;
  border-radius: 0;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
}

input {
  background: $pale;
  width: 65%;
  color: $pink;
  border: none;
  border-bottom: 1px solid rgba($white, 0.5);
  padding: 9px;
  margin: 7px;
  &::placeholder {
    color: rgba($white, 1);
    letter-spacing: 2px;
    font-size: 1.3em;
    font-weight: 100;
  }
  &:focus {
    color: $pink;
    outline: none;
    border-bottom: 1.2px solid rgba($pink, 0.7);
    font-size: 1em;
    transition: 0.8s all ease;
    &::placeholder {
      opacity: 0;
    }
  }
}

label {
  font-family: $sans-serif;
  color: $pink;
  font-size: 0.8em;
  letter-spacing: 1px;
}

.el-checkbox {
  display: inline;
  white-space: nowrap;
  position: relative;
  left: -62px;
}
</style>
