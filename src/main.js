import Vue from "vue";
Vue.config.devtools = true;

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 避免页面抖动
ElementUI.Dialog.props.lockScroll.default = false;
// 取消英文显示
// import locale from "element-ui/lib/locale/lang/en"; // lang i18n
import locale from "element-ui/lib/locale/lang/zh-CN.js";

// dataV 数据可视化
import dataV from "@jiaminghi/data-view";
Vue.use(dataV);

// dayjs 时间戳
import dayjs from "dayjs";
Vue.prototype.dayjs = dayjs;

import "@/styles/index.scss"; // global css

// 原本的
import App from "./App";
import store from "./store";
import router from "./router";

// ant-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

// 使用axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import "@/icons"; // icon
import "@/permission"; // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
