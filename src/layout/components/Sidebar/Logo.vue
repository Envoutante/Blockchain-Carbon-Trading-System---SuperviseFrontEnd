<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo" /> -->
        <img src="@/assets/logo.png" class="sidebar-left-logo" />
        <!-- <h1 v-else class="sidebar-title">{{ title }}</h1> -->
      </router-link>

      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/logo.png" class="sidebar-left-logo" />
        <span class="sidebar-title">{{ title }}</span>
        <img src="@/assets/sub_logo.png" class="sidebar-right-logo" />
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",

  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      title: "碳盟链道",
      logo: "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png",
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: transparent;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-left-logo {
      // width: 20px;
      height: 28px;
      vertical-align: middle;
      margin-right: 5px;
    }

    & .sidebar-right-logo {
      // width: 20px;
      height: 25px;
      vertical-align: middle;
      margin-left: 3px;
      margin-top: -10px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #1890ff;
      font-weight: 600;
      line-height: 50px;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-left-logo {
      margin-right: 0px;
    }
  }
}
</style>
