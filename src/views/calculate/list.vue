<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="企业名称">
        <el-input size="small" placeholder="企业名称" />
      </el-form-item>

      <el-form-item label="企业类型">
        <el-select size="small" placeholder="请选择" clearable>
          <el-option value="1" label="电网企业" />
          <el-option value="1" label="化工生产企业" />
          <el-option value="1" label="电解铝生产企业" />
          <el-option value="1" label="镁冶炼企业" />
          <el-option value="1" label="平板玻璃生产企业" />
          <el-option value="1" label="水泥生产企业" />
          <el-option value="1" label="陶瓷生产企业" />
          <el-option value="1" label="民航企业" />
          <el-option value="1" label="钢铁生产企业" />
          <el-option value="1" label="发电企业" />
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
      :data="reportList.slice(pageBegin, pageEnd)"
      v-loading="listLoading"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
    >
      <el-table-column prop="enterpriseID" label="组织代码" align="center" />
      <el-table-column prop="enterpriseName" label="企业名称" align="center" />
      <el-table-column label="行业类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.enterpriseClass | companyFilter }}
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.auditStatus | tagFilter">
            {{ scope.row.auditStatus | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="submitTime" label="填报时间" align="center" />
      <el-table-column prop="taskYear" label="上报年份" align="center" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- {path: item.path, query: {value:chil.value, cindex:cindex}} -->
          <!-- '/calculate/detail/' + scope.row.enterpriseID -->
          <router-link
            :to="
              '/calculate/detail/' +
              scope.row.taskYear +
              '/' +
              scope.row.enterpriseID
            "
            style="margin-right: 10px"
          >
            <el-button type="success" icon="el-icon-search" size="mini"
              >查看</el-button
            >
          </router-link>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="warning"
            >删除</el-button
          >
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
        :total="this.reportListLength"
        style="padding: 30px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import calculateAPI from "@/api/calculate";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        PASS: "审核通过",
        AUDIT: "审核中",
        REFUSE: "审核拒绝",
      };
      return statusMap[status];
    },
    tagFilter(status) {
      const tagMap = {
        PASS: "success",
        AUDIT: "primary",
        REFUSE: "danger",
      };
      return tagMap[status];
    },
    companyFilter(type) {
      const companyMap = {
        1: "发电企业",
        2: "电网企业",
        3: "钢铁生产企业",
        4: "化工生产企业",
        5: "电解铝生产企业",
        6: "镁冶炼企业",
        7: "平板玻璃生产企业",
        8: "水泥生产企业",
        9: "陶瓷生产企业",
        10: "民航企业",
      };
      return companyMap[type];
    },
  },

  data() {
    let disabledDate = (date) => {
      return date.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
    };

    return {
      reportList: {},
      reportListLength: undefined,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: "150px",
      taskFormVisible: false,
      taskYear: "",
      taskBeginTime: "",
      taskEndTime: "",
      taskDescription: "",
      startDateOptions: {
        disabledDate: (time) => {
          return (
            time.getTime() < Date.now() ||
            time.getTime() >= new Date(this.taskEndTime).getTime() ||
            time.getTime() >
              new Date().setFullYear(new Date().getFullYear() + 1, 0, 0)
          );
        },
      },
      endDateOptions: {
        disabledDate: (time) => {
          return (
            time.getTime() < Date.now() ||
            time.getTime() <= new Date(this.taskBeginTime).getTime() ||
            time.getTime() >
              new Date().setFullYear(new Date().getFullYear() + 1, 0, 0)
          );
        },
      },
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
    taskPublish() {
      let token = "123";
      this.taskYear = new Date().getFullYear();
      calculateAPI
        .taskPublish(
          token,
          this.taskYear,
          this.taskBeginTime / 1000,
          this.taskEndTime / 1000,
          this.taskDescription
        )
        .then((response) => {
          this.$message({
            message: response.message,
            type: "success",
          });
          this.taskFormVisible = false;
          console.log(this.taskBeginTime / 1000);
        });
    },
    fetchData() {
      this.listLoading = true;
      calculateAPI.getReportList().then((response) => {
        this.reportList = response.data.reportList;
        this.reportListLength = this.reportList.length;
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

<style>
.el-dialog__body .el-form-item__label {
  padding: 0 25px 0 0;
}
</style>
