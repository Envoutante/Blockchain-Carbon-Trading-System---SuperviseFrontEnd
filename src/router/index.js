import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Home",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "el-icon-s-home" },
      },
    ],
  },

  {
    path: "/calculate",
    component: Layout,
    redirect: "/calculate/list",
    meta: { title: "企业碳核算", icon: "el-icon-s-check" },
    children: [
      {
        path: "publish",
        name: "publishTask",
        component: () => import("@/views/calculate/publish"),
        meta: { title: "任务发布", icon: "el-icon-thumb" },
      },
      {
        path: "list",
        name: "calculateList",
        component: () => import("@/views/calculate/list"),
        meta: { title: "核算列表", icon: "el-icon-files" },
      },
      {
        path: "detail/:year/:id",
        name: "Detail",
        component: () => import("@/views/calculate/detail"),
        meta: { title: "核算详情" },
        hidden: true,
      },
    ],
  },

  {
    path: "/trade",
    component: Layout,
    redirect: "/trade/list",
    meta: { title: "企业碳交易", icon: "el-icon-s-finance" },
    children: [
      {
        path: "list",
        name: "tradeList",
        component: () => import("@/views/trade/list"),
        meta: { title: "交易列表" },
        hidden: true,
      },
      {
        path: "detail",
        name: "tradeDetail",
        component: () => import("@/views/trade/detail"),
        meta: { title: "交易详情" },
        hidden: true,
      },
    ],
  },

  {
    path: "/ccredits",
    component: Layout,
    redirect: "/ccredits/list",
    meta: { title: "企业碳配额", icon: "form" },
    children: [
      {
        path: "list",
        name: "ccreditsList",
        component: () => import("@/views/ccredits/list"),
        meta: { title: "碳配额列表" },
        hidden: true,
      },
      {
        path: "edit",
        name: "ccreditsEdit",
        component: () => import("@/views/ccredits/edit"),
        meta: { title: "添加碳配额" },
        hidden: true,
      },
    ],
  },

  {
    path: "/account",
    component: Layout,
    redirect: "/account/list",
    meta: { title: "平台账户管理", icon: "el-icon-s-tools" },
    children: [
      {
        path: "list",
        name: "accountList",
        component: () => import("@/views/account/list"),
        meta: { title: "账户列表", icon: "el-icon-tickets" },
      },
      {
        path: "bind",
        name: "Bind",
        component: () => import("@/views/account/bind"),
        meta: { title: "绑定列表", icon: "el-icon-office-building" },
      },
      {
        path: "audit",
        name: "Audit",
        component: () => import("@/views/account/audit"),
        meta: { title: "绑定详情" },
        hidden: true,
      },
    ],
  },

  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: { title: "External Link", icon: "link" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
