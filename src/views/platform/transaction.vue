<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="链码名">
        <el-input
          v-model="searchForm.chaincodename"
          size="small"
          placeholder="请输入链码名"
        />
      </el-form-item>

      <el-form-item label="通道名">
        <el-input
          v-model="searchForm.channelname"
          size="small"
          placeholder="请输入通道名"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
        >
          查询
        </el-button>

        <el-button
          size="small"
          type="primary"
          icon="el-icon-refresh-left"
          @click="handleReset"
          >清空</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      v-loading="listLoading"
      element-loading-text="加载中"
      stripe
      fit
      highlight-current-row
    >
      <el-table-column
        prop="chaincodename"
        label="链码名"
        align="center"
        sortable
      />
      <el-table-column
        prop="channelname"
        label="通道名"
        align="center"
        sortable
      />
      <el-table-column prop="createdt" label="创建时间" align="center" sortable
        ><template slot-scope="scope">{{
          dayjs(scope.row.createdt).format("YYYY/MM/DD HH:mm:ss")
        }}</template></el-table-column
      >
      <el-table-column
        prop="creator_msp_id"
        label="创建者ID"
        align="center"
        sortable
      />
      <el-table-column prop="txhash" label="tx哈希" align="center" sortable
        ><template slot-scope="scope"
          ><a-tooltip>
            <template #title> {{ scope.row.txhash }} 点击查看交易详情</template>
            <el-link
              @click="openDialog(scope.row.txhash)"
              type="primary"
              :underline="false"
              >{{ scope.row.txhash | ellipsis }}</el-link
            ></a-tooltip
          ></template
        ></el-table-column
      >
      <el-table-column prop="type" label="类型" align="center" sortable />
    </el-table>

    <!-- 对话框：交易事务日志 -->
    <sonDialog ref="son" />

    <!-- 分页 -->
    <div style="display: flex; justify-content: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 25, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        style="padding: 30px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import dashboardAPI from "@/api/dashboard";
import sonDialog from "./dialog.vue";

export default {
  components: { sonDialog },

  filters: {
    // 当标题字数超出时，超出部分显示’...‘。此处限制超出8位即触发隐藏效果
    ellipsis(value) {
      if (!value) return "";
      if (value.length >= 6) {
        return value.slice(0, 6) + "...";
      }
      return value;
    },
  },

  data() {
    return {
      listLoading: true,
      transactionList: {},
      tableData: {},
      searchForm: { chaincodename: "", channelname: "" },
      pageNum: 1,
      pageSize: 10,
    };
  },

  created() {
    this.getTransactionList();
  },

  methods: {
    getTransactionList() {
      let currentChannel = localStorage.getItem("currentChannel");
      let url =
        "/api/txList/" +
        currentChannel +
        "/0/0?from=Mon%20Aug%2028%202023%2015:04:43%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&to=Fri%20Sep%2005%202025%2015:04:43%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&page=" +
        this.pageNum +
        "&size=" +
        this.pageSize;
      let urlType = "GET";
      let token = localStorage.getItem("platformToken");
      dashboardAPI.turnToGet(url, urlType, token).then((response) => {
        this.transactionList = response.rows.txnsData;
        this.tableData = this.transactionList;
        this.listLoading = false;
      });
    },

    openDialog(txhash) {
      this.$refs.son.open(txhash);
    },

    handleSearch() {
      let form = this.searchForm;
      let tableList = this.transactionList;
      // 筛选后的数据
      const filterList = tableList.filter((item) => {
        return Object.values(form).every((key, index) => {
          // 使用String()将item中的整数转换为字符串
          const itemKey = String(item[Object.keys(form)[index]]);
          // 确保form中的值也是字符串类型
          const formValue = String(key);
          // 现在可以安全地进行字符串比较
          return itemKey.includes(formValue);
        });
      });

      this.tableData = filterList;
    },
    handleReset() {
      this.tableData = this.transactionList;
      this.searchForm.chaincodename = "";
      this.searchForm.channelname = "";
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageNum = 1;
      this.getTransactionList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getTransactionList();
    },
  },
};
</script>
