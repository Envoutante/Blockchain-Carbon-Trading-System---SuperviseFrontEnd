(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64695b8a"],{"029b":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app-container"},[s("router-link",{attrs:{to:"/ccredits/list"}},[s("el-button",{staticStyle:{margin:"0 0 20px 0"},attrs:{type:"primary",size:"small"}},[t._v("返回")])],1),s("div",{staticClass:"content-container"},[t._l(t.enterpriseIDList,(function(e,i){return s("div",{key:i},[s("span",{staticStyle:{"font-size":"18px",color:"#1890ff","font-weight":"600"}},[t._v("企业 "+t._s(i+1))]),s("el-form",{staticClass:"form-table",staticStyle:{"margin-top":"20px"},attrs:{"label-width":"200px"}},[s("el-row",[s("el-col",{attrs:{span:10}},[s("el-form-item",{attrs:{label:"企业组织机构代码："}},[s("el-input",{model:{value:e.enterpriseID,callback:function(s){t.$set(e,"enterpriseID",s)},expression:"item.enterpriseID"}})],1)],1)],1)],1)],1)})),s("el-form",{staticClass:"form-table",staticStyle:{"margin-top":"20px","border-top":"2px solid #fafafa","padding-top":"30px"},attrs:{"label-width":"200px"}},[s("el-row",[s("el-col",{attrs:{span:10}},[s("el-form-item",{attrs:{label:"统一设置碳配额："}},[s("el-input-number",{attrs:{min:1,max:10},model:{value:t.emission,callback:function(e){t.emission=e},expression:"emission"}})],1)],1)],1)],1),s("div",[s("el-button",{attrs:{type:"success",size:"small"},on:{click:t.submitForm}},[t._v("提交")]),s("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.addForm}},[t._v("添加")]),t.enterpriseIDList.length>1?s("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(e){return t.removeIdx(t.item,t.index)}}},[t._v("删除")]):t._e()],1)],2)],1)},n=[],r=(s("a434"),s("d3b7"),s("159b"),s("e438")),a={data:function(){return{enterpriseIDList:[{enterpriseID:""}],emission:""}},methods:{submitForm:function(){var t=this,e=!0;this.enterpriseIDList.forEach((function(t){""==t.enterpriseID&&(e=!1)})),""==this.emission&&(e=!1),e||this.$message({message:"请完善信息后再提交",type:"error"}),e&&r["a"].addEmission("1",this.enterpriseIDList,this.emission).then((function(e){t.$message({message:e.message,type:"success"})})),console.log(this.enterpriseIDList)},addForm:function(){var t=this,e=!0;this.enterpriseIDList.forEach((function(s){""==s.enterpriseID&&(t.$message({message:"请完善信息后再添加",type:"warning"}),e=!1)})),e&&this.enterpriseIDList.push({enterpriseID:""}),console.log(this.enterpriseIDList)},removeIdx:function(t,e){this.enterpriseIDList.splice(e,1),this.$message({message:"删除成功",type:"success"})}}},o=a,l=(s("8016"),s("2877")),c=Object(l["a"])(o,i,n,!1,null,"3f3822c0",null);e["default"]=c.exports},"0f1f":function(t,e,s){},8016:function(t,e,s){"use strict";s("0f1f")},e438:function(t,e,s){"use strict";var i=s("b775");e["a"]={getEmissionList:function(){return Object(i["a"])({url:"https://mock.apifox.com/m1/2214773-0-default/setting/emissionList",method:"get"})},addEmission:function(t,e,s){return Object(i["a"])({url:"https://mock.apifox.com/m1/2214773-0-default/setting/emissionSet",method:"post",params:{token:t,enterpriseIDList:e,emission:s}})}}}}]);