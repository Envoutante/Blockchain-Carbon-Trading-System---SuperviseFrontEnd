(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d0f79"],{"69dd":function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"app-container"},[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[l("el-form-item",{attrs:{label:"企业名称"}},[l("el-input",{attrs:{size:"small",placeholder:"企业名称"}})],1),l("el-form-item",{attrs:{label:"类型"}},[l("el-select",{attrs:{size:"small",placeholder:"请选择",clearable:""}},[l("el-option",{attrs:{value:"1",label:"CCER"}})],1)],1),l("el-form-item",[l("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.fetchData()}}},[e._v(" 查询 ")]),l("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-refresh-left"},on:{click:function(t){return e.resetData()}}},[e._v("清空")])],1)],1),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[l("el-table-column",{attrs:{align:"center",label:"编号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.id)+" ")]}}])}),l("el-table-column",{attrs:{label:"企业名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.title)+" ")]}}])}),l("el-table-column",{attrs:{label:"标的类型",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.objectType)+" ")]}}])}),l("el-table-column",{attrs:{label:"交易类型",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.transactionType)+" ")]}}])}),l("el-table-column",{attrs:{label:"减排量（万吨）",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.count))])]}}])}),l("el-table-column",{attrs:{align:"center",prop:"created_at",label:"日期",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("i",{staticClass:"el-icon-time"}),l("span",[e._v(e._s(t.row.displayTime))])]}}])}),l("el-table-column",{attrs:{"class-name":"status-col",label:"审核状态",width:"110",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-tag",{attrs:{type:e._f("statusFilter")(t.row.status)}},[e._v(e._s(t.row.status))])]}}])}),l("el-table-column",{attrs:{label:"操作",width:"200",align:"center"}},[l("el-button",{attrs:{type:"success",icon:"el-icon-search",size:"mini"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("查看")]),l("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:e.warning}},[e._v("删除")])],1)],1),l("el-dialog",{attrs:{title:"交易详情",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{attrs:{model:e.form}},[l("el-form-item",{attrs:{label:"项目所在地","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),l("el-form-item",{attrs:{label:"项目类别","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},[l("el-option",{attrs:{value:"1",label:"树林"}}),l("el-option",{attrs:{value:"1",label:"风能"}}),l("el-option",{attrs:{value:"1",label:"太阳能"}}),l("el-option",{attrs:{value:"1",label:"水电"}}),l("el-option",{attrs:{value:"1",label:"生物质发电"}}),l("el-option",{attrs:{value:"1",label:"沼气发电"}}),l("el-option",{attrs:{value:"1",label:"其他"}})],1)],1),l("el-form-item",{attrs:{label:"出售数量","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),l("el-form-item",{attrs:{label:"出售单价","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),l("el-form-item",{attrs:{label:"公司名称","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),l("el-form-item",{attrs:{label:"项目负责人","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),l("el-form-item",{attrs:{label:"手机","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),l("el-form-item",{attrs:{label:"邮箱","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),l("el-form-item",{attrs:{label:"项目说明","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.textarea,callback:function(t){e.textarea=t},expression:"textarea"}})],1)],1),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("确 定")])],1)],1),l("div",{staticClass:"block"},[l("el-pagination",{staticStyle:{padding:"30px 0"},attrs:{"current-page":e.currentPage4,"page-sizes":[10,20,30,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:30},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},o=[],n=l("b775");function i(e){return Object(n["a"])({url:"/vue-admin-template/transaction",method:"get",params:e})}var r={filters:{statusFilter:function(e){var t={"等待接洽":"gray","交易中":"primary","交易成功":"success","交易失败":"danger"};return t[e]}},data:function(){return{list:null,listLoading:!0,dialogTableVisible:!1,dialogFormVisible:!1,form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""},formLabelWidth:"120px"}},created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;this.listLoading=!0,i().then((function(t){e.list=t.data.items,e.listLoading=!1}))},warning:function(){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$message({type:"success",message:"删除成功!"})})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},handleSizeChange:function(e){console.log("每页 ".concat(e," 条"))},handleCurrentChange:function(e){console.log("当前页: ".concat(e))}}},s=r,c=l("2877"),m=Object(c["a"])(s,a,o,!1,null,null,null);t["default"]=m.exports}}]);