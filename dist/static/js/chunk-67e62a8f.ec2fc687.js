(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67e62a8f"],{"08e8":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app-container"},[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.back}},[t._v("返回")]),t._l(this.orderList,(function(e,i){return s("el-descriptions",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:i,staticClass:"margin-top",staticStyle:{"margin-top":"10px"},attrs:{column:2,border:""}},[s("el-descriptions-item",{attrs:{span:2}},[s("template",{slot:"label"},[s("i",{staticClass:"el-icon-document"}),t._v(" 交易编号 ")]),t._v(" "+t._s(e.orderID)+" ")],2),s("el-descriptions-item",[s("template",{slot:"label"},[s("i",{staticClass:"el-icon-user"}),t._v(" 乙方 ")]),t._v(" "+t._s(e.purchaseName)+" ")],2),s("el-descriptions-item",[s("template",{slot:"label"},[s("i",{staticClass:"el-icon-user"}),t._v(" 甲方 ")]),t._v(" "+t._s(e.publishName)+" ")],2),s("el-descriptions-item",[s("template",{slot:"label"},[s("i",{staticClass:"el-icon-shopping-cart-1"}),t._v(" 交易类型 ")]),t._v(" "+t._s("SOLD"===e.tradeType?"收购碳排量":"SALE"===e.tradeType?"出售碳排量":"")+" ")],2),s("el-descriptions-item",[s("template",{slot:"label"},[s("i",{staticClass:"el-icon-coin"}),t._v(" 交易量 ")]),t._v(" "+t._s(e.dealNum)+" ")],2),s("el-descriptions-item",[s("template",{slot:"label"},[s("i",{staticClass:"el-icon-time"}),t._v(" 时间戳 ")]),t._v(" "+t._s(t.dayjs(1e3*parseInt(e.orderTime)).format("YYYY[年]-MM[月]-DD[日] HH:mm:ss"))+" ")],2)],1)})),t.orderID.length?t._e():s("el-empty",{attrs:{description:"暂无相关交易"}})],2)},r=[],a=s("2465"),o=(s("5a0c"),{data:function(){return{listLoading:!0,orderID:[],orderList:[]}},created:function(){this.getOrderID(),this.getOrderList()},methods:{getOrderID:function(){this.orderID=this.$route.query.orderID,console.log("打印"+this.orderID)},getOrderList:function(){var t=this;this.listLoading=!0;for(var e=0;e<this.orderID.length;e++){var s=this.orderID[e];a["a"].getOrder(s).then((function(e){t.orderList.push(e.data.orderListEnterprise[0])}))}this.listLoading=!1},back:function(){this.$router.push("/trade/list")}}}),l=o,n=s("2877"),c=Object(n["a"])(l,i,r,!1,null,null,null);e["default"]=c.exports},2465:function(t,e,s){"use strict";var i=s("b775");e["a"]={getTradeList:function(t){return Object(i["a"])({url:"/public/tradeList",method:"post",data:{token:t}})},getOrder:function(t){return Object(i["a"])({url:"/public/order",method:"post",data:{orderID:t}})}}}}]);