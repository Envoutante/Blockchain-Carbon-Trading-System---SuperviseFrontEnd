(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-017633b2"],{"07ac":function(e,t,a){var l=a("23e7"),n=a("6f53").values;l({target:"Object",stat:!0},{values:function(e){return n(e)}})},"5fd4":function(e,t,a){"use strict";var l=a("b775");t["a"]={turnToPost:function(e,t,a,n){return Object(l["a"])({url:"/turnTo",method:"post",data:{url:e,urlType:t,postBody:a,token:n}})},turnToGet:function(e,t,a){return Object(l["a"])({url:"/turnTo",method:"post",data:{url:e,urlType:t,token:a}})}}},"6f53":function(e,t,a){var l=a("83ab"),n=a("df75"),r=a("fc6a"),o=a("d1e7").f,s=function(e){return function(t){var a,s=r(t),i=n(s),c=i.length,u=0,h=[];while(c>u)a=i[u++],l&&!o.call(s,a)||h.push(e?[a,s[a]]:s[a]);return h}};e.exports={entries:s(!0),values:s(!1)}},8930:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"区块序号"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入区块序号"},model:{value:e.searchForm.blocknum,callback:function(t){e.$set(e.searchForm,"blocknum",t)},expression:"searchForm.blocknum"}})],1),a("el-form-item",{attrs:{label:"通道名"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入通道名"},model:{value:e.searchForm.channelname,callback:function(t){e.$set(e.searchForm,"channelname",t)},expression:"searchForm.channelname"}})],1),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v(" 查询 ")]),a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-refresh-left"},on:{click:e.handleReset}},[e._v("清空")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.tableData,"element-loading-text":"Loading",stripe:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"blksize",label:"区块大小",align:"center",sortable:""}}),a("el-table-column",{attrs:{prop:"blockhash",label:"哈希值",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("ellipsis")(t.row.blockhash)))]}}])}),a("el-table-column",{attrs:{prop:"blocknum",label:"区块序号",align:"center",sortable:""}}),a("el-table-column",{attrs:{prop:"channelname",label:"通道名",align:"center",sortable:""}}),a("el-table-column",{attrs:{prop:"createdt",label:"创建时间",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.dayjs(t.row.createdt).format("YYYY/MM/DD HH:mm:ss")))]}}])}),a("el-table-column",{attrs:{prop:"datahash",label:"数据哈希",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("ellipsis")(t.row.datahash)))]}}])}),a("el-table-column",{attrs:{prop:"prehash",label:"前缀哈希",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("ellipsis")(t.row.prehash)))]}}])}),a("el-table-column",{attrs:{prop:"txcount",label:"tx个数",align:"center",sortable:""}}),a("el-table-column",{attrs:{prop:"txhash",label:"tx哈希",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("ellipsis")(t.row.txhash[0])))]}}])})],1),a("div",{staticStyle:{display:"flex","justify-content":"right"}},[a("el-pagination",{staticStyle:{padding:"30px 0"},attrs:{"current-page":e.pageNum,"page-sizes":[5,10,25,50,100],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},n=[],r=(a("4de4"),a("caad"),a("fb6a"),a("b64b"),a("d3b7"),a("07ac"),a("2532"),a("5fd4")),o={filters:{ellipsis:function(e){return e?e.length>=6?e.slice(0,6)+"...":e:""}},data:function(){return{listLoading:!0,blockList:{},tableData:{},searchForm:{blocknum:"",channelname:""},pageNum:1,pageSize:10}},created:function(){this.getBlockList()},methods:{getBlockList:function(){var e=this;this.listLoading=!0;var t=localStorage.getItem("currentChannel"),a="/api/blockAndTxList/"+t+"/0?from=Wed%20Mar%2001%202023%2015:01:46%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&to=Fri%20Oct%2003%202025%2015:01:46%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&page="+this.pageNum+"&size="+this.pageSize,l="GET",n=localStorage.getItem("platformToken");r["a"].turnToGet(a,l,n).then((function(t){e.blockList=t.rows.blocksData,e.tableData=e.blockList,e.listLoading=!1}))},handleSearch:function(){var e=this.searchForm,t=this.blockList,a=t.filter((function(t){return Object.values(e).every((function(a,l){var n=String(t[Object.keys(e)[l]]),r=String(a);return n.includes(r)}))}));this.tableData=a},handleReset:function(){this.tableData=this.blockList,this.searchForm.blocknum="",this.searchForm.channelname=""},handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.pageSize=e,this.pageNum=1,this.getBlockList()},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.pageNum=e,this.getBlockList()}}},s=o,i=a("2877"),c=Object(i["a"])(s,l,n,!1,null,null,null);t["default"]=c.exports}}]);