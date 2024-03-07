<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="企业名称">
        <el-input size="small" placeholder="企业名称" />
      </el-form-item>

      <el-form-item label="类型">
        <el-select size="small" placeholder="请选择" clearable>
          <el-option value="1" label="CCER" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="fetchData()"
        >
          查询
        </el-button>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-refresh-left"
          @click="resetData()"
          >清空</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      :data="tradeListEnterprise.slice(pageBegin, pageEnd)"
      v-loading="listLoading"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
    >
      <el-table-column prop="tradeID" label="交易编号" align="center" />
      <el-table-column label="交易状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.tradeStatus === 'YES'">已达成交易</span>
          <span v-else-if="scope.row.tradeStatus === 'NO'">未达成交易</span>
        </template>
      </el-table-column>
      <el-table-column prop="tradeType" label="交易类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.tradeType === 'SOLD'">购买</span>
          <span v-else-if="scope.row.tradeType === 'SALE'">出售</span>
        </template>
      </el-table-column>
      <el-table-column prop="emission" label="交易总量" align="center" />
      <el-table-column prop="perEmission" label="交易单价" align="center" />
      <el-table-column prop="publishName" label="甲方企业" align="center" />
      <!-- <el-table-column prop="orderID" label="订单编号" align="center" /> -->
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link
            :to="'/trade/detail/' + scope.row.orderID"
            style="margin-right: 10px"
          >
            <el-button icon="el-icon-document-copy" size="mini">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.tradeListEnterpriseLength"
        style="padding: 30px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tradeAPI from "@/api/trade";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        等待接洽: "gray",
        交易中: "primary",
        交易成功: "success",
        交易失败: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      tradeListEnterprise: [],
      tradeListEnterpriseLength: undefined,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      pageBegin: 0,
      pageEnd: 0,
      pageSize: 10,
      pageNum: 0,
    };
  },
  created() {
    this.fetchData();
    this.pageEnd = this.pageSize;
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      tradeAPI.getTradeList("123").then((response) => {
        this.tradeListEnterprise = response.data.tradeListEnterprise;
        console.log("内容为：" + response);
        this.tradeListEnterpriseLength = this.tradeListEnterprise.length;
        this.listLoading = false;
      });
    },
    warning() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageEnd = this.pageBegin + this.pageSize;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.pageBegin = (this.pageNum - 1) * this.pageSize;
      this.pageEnd = this.pageBegin + this.pageSize;
    },
  },
};
</script>
