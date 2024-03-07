<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="user-layout-lang">
        <!-- <select-lang class="select-lang-trigger" /> -->
        <!-- <span @click="() => this.$refs.NetworkSetting.open()">
          <a-icon
            type="api"
            style="color: aliceblue; margin-right: 20px; cursor: pointer"
          />
          <network-setting ref="NetworkSetting"></network-setting>
        </span> -->
      </div>

      <div class="user-layout-content" style="margin-top: 20px">
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <div
            class="user-layout-content-inner"
            style="
              width: auto;
              background-color: white;
              border-left: 2px solid #f0f2f5;
              border-top: 2px solid #f0f2f5;
              border-bottom: 2px solid #f0f2f5;

              width: 500px;
              height: 570px;
              padding: 0px;
              border-radius: 10px 0 0 10px;
            "
          >
            <Carousel
              autoplay
              style="max-height: 570px; margin-left: 10px"
              dotsClass="carousel_dot"
            >
              <img
                src="@/assets/pages/user/login/login_bg_1.jpg"
                style="max-height: 560px"
              />
              <img
                src="@/assets/pages/user/login/login_bg_2.jpg"
                style="max-height: 560px"
              />
              <img
                src="@/assets/pages/user/login/login_bg_3.jpg"
                style="max-height: 560px"
              />
              <img
                src="@/assets/pages/user/login/login_bg_4.jpg"
                style="max-height: 560px"
              />
            </Carousel>
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
              height: 570px;
              padding: 30px;
              padding-top: 50px;
            "
          >
            <div class="top">
              <div class="header" style="padding-left: 50px">
                <a href="/">
                  <!-- <img src="~@/assets/logo.svg" class="logo" alt="logo" /> -->
                  <span class="title">碳盟链道 </span>
                  <!-- 差图片 -->
                  <!-- <img
                    class="logo"
                    v-if="this.$store.state.app.lang.includes('zh')"
                    src="@/assets/header/EnterpriseSideIndication.png"
                    style="
                      width: auto;
                      transform: scale(0.85) translateY(-20px);
                    "
                  />
                  <img
                    class="logo"
                    v-else
                    src="@/assets/header/EnterpriseSideIndication_EN.png"
                    style="
                      width: auto;
                      transform: scale(0.65) translateY(-25px);
                    "
                  /> -->
                </a>
              </div>
              <div class="desc">
                {{ $t("layouts.userLayout.title") }}
              </div>
            </div>

            <router-view />

            <div class="footer">
              <!-- <div class="links">
            <a href="_self">帮助</a>
            <a href="_self">隐私</a>
            <a href="_self">条款</a>
          </div>
          <div class="copyright">Copyright &copy; 2018 vueComponent</div> -->
              <!-- 碳盟链道CarbonLink · 企业端 （修改footer请） -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { deviceMixin } from "@/store/device-mixin";
// import SelectLang from "@/components/SelectLang";
import { Carousel } from "ant-design-vue";
// import NetworkSetting from "@/components/GlobalHeader/NetworkSetting.vue";

export default {
  name: "UserLayout",
  // components: {
  //   SelectLang,
  //   Carousel,
  //   NetworkSetting,
  // },
  // mixins: [deviceMixin],
  mounted() {
    document.body.classList.add("userLayout");
  },
  beforeDestroy() {
    document.body.classList.remove("userLayout");
  },
};
</script>

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

<style scoped></style>
