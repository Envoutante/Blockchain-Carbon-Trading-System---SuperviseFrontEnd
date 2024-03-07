(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-530b2e5a"],{"29d8":function(e,t,i){},"4f7e":function(e,t,i){"use strict";i("29d8")},a7f9:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[i("el-form-item",{attrs:{label:"企业名称"}},[i("el-input",{attrs:{size:"small",placeholder:"企业名称"}})],1),i("el-form-item",[i("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.fetchData()}}},[e._v(" 查询 ")]),i("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-refresh-left"},on:{click:function(t){return e.resetData()}}},[e._v("清空")])],1)],1),i("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[i("el-form-item",[i("router-link",{attrs:{to:"/ccredits/edit"}},[i("el-button",{staticStyle:{margin:"0 10px 0 0"},attrs:{size:"small",type:"success",icon:"el-icon-circle-plus-outline"}},[e._v("批量添加")])],1),i("el-input-number",{staticStyle:{"margin-right":"10px"},attrs:{size:"small",min:1,max:10},model:{value:e.newEmission,callback:function(t){e.newEmission=t},expression:"newEmission"}}),i("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-edit"},on:{click:e.batchEdit}},[e._v("批量编辑")]),i("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-delete"},on:{click:function(t){return e.insertData()}}},[e._v("批量删除")])],1)],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.emissionList.slice(e.pageBegin,e.pageEnd),stripe:"","row-key":function(e){return e.id},"reserve-selection":!0},on:{"selection-change":e.handleSelect}},[i("el-table-column",{attrs:{type:"selection",width:"50"}}),i("el-table-column",{attrs:{prop:"enterpriseID",label:"企业组织机构代码",align:"center"}}),i("el-table-column",{attrs:{prop:"enterpriseName",label:"企业名",align:"center"}}),i("el-table-column",{attrs:{prop:"enterpriseClass",label:"企业所处行业",align:"center"}}),i("el-table-column",{attrs:{prop:"remainEmission",label:"剩余碳排放量",align:"center"}}),i("el-table-column",{attrs:{prop:"coCoin",label:"碳币余额",align:"center"}}),i("el-table-column",{attrs:{label:"操作",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(i){return e.editCcredits(t.row)}}},[e._v("编辑")]),i("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:e.warning}},[e._v("删除")])]}}])})],1),i("el-dialog",{attrs:{title:"编辑碳配额",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{attrs:{model:e.emissionItem}},[i("el-form-item",{attrs:{label:"组织代码","label-width":e.formLabelWidth}},[i("el-input",{attrs:{id:"myText",value:e.emissionItem.enterpriseID,autocomplete:"off",disabled:""}})],1),i("el-form-item",{attrs:{label:"企业名称","label-width":e.formLabelWidth}},[i("el-input",{attrs:{id:"myText",value:e.emissionItem.enterpriseName,autocomplete:"off",disabled:""}})],1),i("el-form-item",{attrs:{label:"行业类型","label-width":e.formLabelWidth}},[i("el-input",{attrs:{id:"myText",value:e.emissionItem.enterpriseClass,autocomplete:"off",disabled:""}})],1),i("el-form-item",{attrs:{label:"剩余碳排放量","label-width":e.formLabelWidth}},[i("el-input",{attrs:{id:"myText",value:e.emissionItem.remainEmission,autocomplete:"off",disabled:""}})],1),i("el-form-item",{attrs:{label:"碳币余额","label-width":e.formLabelWidth}},[i("el-input-number",{attrs:{min:1,max:10},model:{value:e.newCoCoin,callback:function(t){e.newCoCoin=t},expression:"newCoCoin"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("确 定")])],1)],1),i("div",{staticClass:"block"},[i("el-pagination",{staticStyle:{padding:"30px 0"},attrs:{"current-page":e.pageNum,"page-sizes":[10,20,30,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.emissionListLength},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},s=[],a=(i("d3b7"),i("159b"),i("e438")),o={data:function(){return{emissionList:{},emissionListLength:void 0,emissionItem:{enterpriseID:"",enterpriseName:"",enterpriseClass:"",remainEmission:"",coCoin:""},enterpriseIDList:[],newCoCoin:0,newEmission:0,listLoading:!0,dialogFormVisible:!1,batchEditVisible:!1,formLabelWidth:"120px",num:1,pageBegin:0,pageEnd:0,pageSize:10,pageNum:0,multipleSelection:[]}},created:function(){this.fetchData(),this.pageEnd=this.pageSize},methods:{tableRowClassName:function(e){e.row;var t=e.rowIndex;return t%4===0||t%2===0?"blue-row":""},fetchData:function(){var e=this;this.listLoading=!0,a["a"].getEmissionList().then((function(t){e.emissionList=t.data.emissionList,e.emissionListLength=e.emissionList.length,e.listLoading=!1}))},editCcredits:function(e){this.dialogFormVisible=!0,this.emissionItem=e,this.newCoCoin=e.coCoin,console.log(id)},handleSelect:function(e){var t=this;this.multipleSelection=e,this.enterpriseIDList=[],this.multipleSelection.forEach((function(e){t.enterpriseIDList.push(e.enterpriseID)})),console.log(this.enterpriseIDList)},batchEdit:function(){var e=this;console.log(this.enterpriseIDList);var t=!0;0==this.enterpriseIDList.length&&(t=!1,this.$message({type:"error",message:"请选择需要编辑的企业"})),t&&this.$confirm("此操作批量编辑碳配额，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a["a"].addEmission("1",e.enterpriseIDList,e.newEmission).then((function(t){e.$message({type:"success",message:"批量编辑成功"})}))})).catch((function(){e.$message({type:"info",message:"已取消批量编辑"})}))},warning:function(){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$message({type:"success",message:"删除成功!"})})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.pageSize=e,this.pageEnd=this.pageBegin+this.pageSize},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.pageNum=e,this.pageBegin=(this.pageNum-1)*this.pageSize,this.pageEnd=this.pageBegin+this.pageSize}}},l=o,r=(i("4f7e"),i("e55f"),i("2877")),c=Object(r["a"])(l,n,s,!1,null,null,null);t["default"]=c.exports},c01e:function(e,t,i){},e438:function(e,t,i){"use strict";var n=i("b775");t["a"]={getEmissionList:function(){return Object(n["a"])({url:"https://mock.apifox.com/m1/2214773-0-default/setting/emissionList",method:"get"})},addEmission:function(e,t,i){return Object(n["a"])({url:"https://mock.apifox.com/m1/2214773-0-default/setting/emissionSet",method:"post",params:{token:e,enterpriseIDList:t,emission:i}})}}},e55f:function(e,t,i){"use strict";i("c01e")}}]);