<template>
  <div class="app-container">
    <div v-if="parseInt(role) === 1">
      <el-result
        icon="error"
        title="警告提示"
        subTitle="您没有访问本页面的权限"
      />
    </div>

    <div v-else>
      <!--查询表单-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="甲方企业">
          <el-input
            v-model="searchForm.publishName"
            size="small"
            placeholder="请输入甲方企业"
          />
        </el-form-item>

        <el-form-item label="交易编号">
          <el-input
            v-model="searchForm.tradeID"
            size="small"
            placeholder="请输入交易编号"
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

      <el-table
        :data="tableData.slice(pageBegin, pageEnd)"
        v-loading="listLoading"
        element-loading-text="加载中"
        stripe
        fit
        highlight-current-row
        :default-sort="{ prop: 'tradeID', order: 'ascending' }"
      >
        <el-table-column
          prop="tradeID"
          label="交易编号"
          align="center"
          sortable
        />
        <el-table-column
          prop="tradeStatus"
          label="交易状态"
          align="center"
          :filters="[
            { text: '已达成', value: 'YES' },
            { text: '未达成', value: 'NO' },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.tradeStatus === 'YES'">已达成</span>
            <span v-else-if="scope.row.tradeStatus === 'NO'">未达成</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tradeType"
          label="交易类型"
          align="center"
          :filters="[
            { text: '收购', value: 'SOLD' },
            { text: '出售', value: 'SALE' },
          ]"
          :filter-method="filterType"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.tradeType === 'SOLD'">
              <a-tag color="#108ee9">收购碳排量</a-tag></span
            >
            <span v-else-if="scope.row.tradeType === 'SALE'"
              ><a-tag color="#f50">出售碳排量</a-tag></span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="emission"
          label="交易总量(tCO₂)"
          align="center"
          sortable
        />
        <el-table-column
          prop="perEmission"
          label="交易单价(碳币)"
          align="center"
          sortable
        />
        <el-table-column
          prop="publishName"
          label="甲方企业"
          align="center"
          sortable
          ><template slot-scope="scope"
            ><a-tag color="cyan">{{ scope.row.publishName }}</a-tag></template
          ></el-table-column
        >
        <el-table-column
          prop="orderCount"
          label="关联交易数"
          align="center"
          sortable
        >
          <template slot-scope="scope">{{
            scope.row.orderID.length
          }}</template></el-table-column
        >
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link
              :to="{
                path: '/trade/detail',
                query: { orderID: scope.row.orderID },
              }"
            >
              <el-link type="primary" :underline="false">详情</el-link>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div style="display: flex; justify-content: right">
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
  </div>
</template>

<script>
import tradeAPI from "@/api/trade";
import Cookie from "js-cookie";

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
      role: undefined,
      orderCount: 0,
      tableData: [],
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
      searchForm: { tradeID: "", publishName: "" },
    };
  },
  created() {
    this.fetchData();
    this.pageEnd = this.pageSize;
  },
  methods: {
    handleSearch() {
      let form = this.searchForm;
      let tableList = this.tradeListEnterprise;
      // 筛选后的数据
      const filterList = tableList.filter((item) => {
        return Object.values(form).every((key, index) => {
          return item[Object.keys(form)[index]].includes(key);
        });
      });
      this.tableData = filterList;
    },
    handleReset() {
      this.tableData = this.tradeListEnterprise;
      this.searchForm.tradeID = "";
      this.searchForm.publishName = "";
    },

    fetchData() {
      this.listLoading = true;
      let token = Cookie.get("token");
      this.role = Cookie.get("role");
      tradeAPI.getTradeList(token).then((response) => {
        this.tradeListEnterprise = response.data.tradeListEnterprise;
        this.tradeListEnterpriseLength = this.tradeListEnterprise.length;
        this.tableData = this.tradeListEnterprise;
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
    formatter(row, column) {
      return row.address;
    },
    filterStatus(value, row) {
      return row.tradeStatus === value;
    },
    filterType(value, row) {
      return row.tradeType === value;
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
