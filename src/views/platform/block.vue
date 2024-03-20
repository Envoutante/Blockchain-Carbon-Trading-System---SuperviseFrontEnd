<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="区块序号">
        <el-input
          v-model="searchForm.blocknum"
          size="small"
          placeholder="请输入区块序号"
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
        prop="blksize"
        label="区块大小"
        align="center"
        sortable
      />
      <el-table-column prop="blockhash" label="区块哈希" align="center" sortable
        ><template slot-scope="scope"
          ><a-tooltip>
            <template #title>{{ scope.row.blockhash }}</template>
            {{ scope.row.blockhash | ellipsis }}
          </a-tooltip></template
        ></el-table-column
      >
      <el-table-column
        prop="blocknum"
        label="区块序号"
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
        ><template slot-scope="scope"
          ><a-tag color="blue">
            <template #icon>
              <clock-circle-outlined />
            </template>
            {{ dayjs(scope.row.createdt).format("YYYY/MM/DD HH:mm:ss") }}
          </a-tag></template
        ></el-table-column
      >
      <el-table-column prop="datahash" label="数据哈希" align="center" sortable>
        <template slot-scope="scope">
          <a-tooltip>
            <template #title>{{ scope.row.datahash }}</template>
            {{ scope.row.datahash | ellipsis }}
          </a-tooltip></template
        ></el-table-column
      >
      <el-table-column
        prop="prehash"
        label="前一个区块哈希"
        align="center"
        sortable
        ><template slot-scope="scope"
          ><a-tooltip>
            <template #title>{{ scope.row.prehash }}</template>
            {{ scope.row.prehash | ellipsis }}
          </a-tooltip></template
        ></el-table-column
      >
      <el-table-column
        prop="txcount"
        label="交易数量"
        align="center"
        sortable
      />
      <el-table-column prop="txhash" label="交易哈希" align="center" sortable
        ><template slot-scope="scope">
          <a-tooltip>
            <template #title>{{ scope.row.txhash[0] }}</template>
            {{ scope.row.txhash[0] | ellipsis }}
          </a-tooltip>
        </template></el-table-column
      >
    </el-table>

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

export default {
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
      blockList: {},
      tableData: {},
      searchForm: { blocknum: "", channelname: "" },
      pageNum: 1,
      pageSize: 10,
    };
  },

  created() {
    this.getBlockList();
  },

  methods: {
    getBlockList() {
      this.listLoading = true;
      let currentChannel = localStorage.getItem("currentChannel");
      let url =
        "/api/blockAndTxList/" +
        currentChannel +
        "/0?from=Wed%20Mar%2001%202023%2015:01:46%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&to=Fri%20Oct%2003%202025%2015:01:46%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&page=" +
        this.pageNum +
        "&size=" +
        this.pageSize;
      let urlType = "GET";
      let token = localStorage.getItem("platformToken");
      dashboardAPI.turnToGet(url, urlType, token).then((response) => {
        this.blockList = response.rows.blocksData;
        this.tableData = this.blockList;
        this.listLoading = false;
      });
    },

    handleSearch() {
      let form = this.searchForm;
      let tableList = this.blockList;
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
      this.tableData = this.blockList;
      this.searchForm.blocknum = "";
      this.searchForm.channelname = "";
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageNum = 1;
      this.getBlockList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getBlockList();
    },
  },
};
</script>
