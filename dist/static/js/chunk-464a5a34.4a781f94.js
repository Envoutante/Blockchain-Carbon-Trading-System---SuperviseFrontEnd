(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-464a5a34"],{"07ac":function(e,t,a){var l=a("23e7"),i=a("6f53").values;l({target:"Object",stat:!0},{values:function(e){return i(e)}})},"6f53":function(e,t,a){var l=a("83ab"),i=a("df75"),n=a("fc6a"),r=a("d1e7").f,s=function(e){return function(t){var a,s=n(t),o=i(s),c=o.length,u=0,p=[];while(c>u)a=o[u++],l&&!r.call(s,a)||p.push(e?[a,s[a]]:s[a]);return p}};e.exports={entries:s(!0),values:s(!1)}},dca7:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"邮件编号"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入邮件编号"},model:{value:e.searchForm.id,callback:function(t){e.$set(e.searchForm,"id",t)},expression:"searchForm.id"}})],1),a("el-form-item",{attrs:{label:"发信模板ID"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入发信模板ID"},model:{value:e.searchForm.template_id,callback:function(t){e.$set(e.searchForm,"template_id",t)},expression:"searchForm.template_id"}})],1),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v(" 查询 ")]),a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-refresh-left"},on:{click:e.handleReset}},[e._v("清空")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.tableData,"element-loading-text":"加载中",stripe:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"id",label:"邮件编号",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a-tooltip",{scopedSlots:e._u([{key:"title",fn:function(){return[e._v(e._s(t.row.id))]},proxy:!0}],null,!0)},[a("el-link",{attrs:{type:"primary",underline:!1}},[e._v(e._s(e._f("ellipsis")(t.row.id)))])],1)]}}])}),a("el-table-column",{attrs:{prop:"result",label:"发信状态",align:"center",filters:[{text:"发信成功",value:"1"},{text:"发信失败",value:"0"}],"filter-method":e.filterStatus,"filter-placement":"bottom-end"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a-tag",{attrs:{color:e._f("tagFilter")(t.row.result)}},[e._v(e._s(e._f("sendFilter")(t.row.result)))])]}}])}),a("el-table-column",{attrs:{prop:"to_enterpriseName",label:"收信企业",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(JSON.parse(t.row.template_params).to_enterpriseName)+" ")]}}])}),a("el-table-column",{attrs:{prop:"to_email",label:"收信邮箱",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-link",{attrs:{type:"primary",underline:!1}},[e._v(e._s(JSON.parse(t.row.template_params).to_email))])]}}])}),a("el-table-column",{attrs:{prop:"service_id",label:"发信服务器ID",align:"center",sortable:""}}),a("el-table-column",{attrs:{prop:"template_id",label:"发信模板ID",align:"center",sortable:""}}),a("el-table-column",{attrs:{prop:"created_at",label:"创建时间",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a-tag",{attrs:{color:"blue"},scopedSlots:e._u([{key:"icon",fn:function(){return[a("clock-circle-outlined")]},proxy:!0}],null,!0)},[e._v(" "+e._s(e.dayjs(t.row.created_at).format("YYYY/MM/DD HH:mm:ss"))+" ")])]}}])})],1),a("div",{staticStyle:{display:"flex","justify-content":"right"}},[a("el-pagination",{staticStyle:{padding:"30px 0"},attrs:{"current-page":e.pageNum,"page-sizes":[5,10,25,50,100],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},i=[],n=(a("4de4"),a("caad"),a("fb6a"),a("b64b"),a("d3b7"),a("07ac"),a("2532"),a("8520")),r={components:{ClockCircleOutlined:n["ClockCircleOutlined"]},filters:{sendFilter:function(e){var t={1:"发信成功",0:"发信失败"};return t[e]},tagFilter:function(e){var t={1:"cyan",0:"red"};return t[e]},ellipsis:function(e){return e?e.length>=10?"..."+e.slice(6,15)+"...":e:""}},data:function(){return{listLoading:!0,EmailDetailparam:{},EmailDetailList:[],tableData:[],searchForm:{id:"",template_id:""},pageNum:1,pageSize:10}},created:function(){this.getEmailDetail()},methods:{getEmailDetail:function(){var e=this;this.axios({url:"https://mock.apifox.com/m1/2214773-0-default/getEmailDetailParam",method:"get",contentType:"application/json"}).then((function(t){e.EmailDetailparam=t.data.data,e.getEmailList()}))},getEmailList:function(){var e=this;this.axios({url:"https://api.emailjs.com/api/v1.1/history?user_id="+this.EmailDetailparam.user_id+"&accessToken="+this.EmailDetailparam.accessToken+"&page="+this.pageNum+"&count="+this.pageSize,method:"get",contentType:"application/json"}).then((function(t){e.EmailDetailList=t.data.rows,e.tableData=e.EmailDetailList,e.listLoading=!1,console.log(e.EmailDetailList)}))},handleSearch:function(){var e=this.searchForm,t=this.EmailDetailList,a=t.filter((function(t){return Object.values(e).every((function(a,l){var i=String(t[Object.keys(e)[l]]),n=String(a);return i.includes(n)}))}));this.tableData=a},handleReset:function(){this.tableData=this.EmailDetailList,this.searchForm.id="",this.searchForm.template_id=""},filterStatus:function(e,t){return t.result===parseInt(e)},handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.pageSize=e,this.pageNum=1,this.getEmailDetail()},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.pageNum=e,this.getEmailDetail()}}},s=r,o=a("2877"),c=Object(o["a"])(s,l,i,!1,null,null,null);t["default"]=c.exports}}]);