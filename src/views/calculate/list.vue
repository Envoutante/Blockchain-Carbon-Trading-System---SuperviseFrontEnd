<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="企业名">
        <el-input
          v-model="searchForm.enterpriseName"
          size="small"
          placeholder="请输入企业名"
        />
      </el-form-item>

      <el-form-item label="企业组织机构代码">
        <el-input
          v-model="searchForm.enterpriseID"
          size="small"
          placeholder="请输入企业组织机构代码"
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
      :default-sort="{ prop: 'taskYear', order: 'descending' }"
    >
      <el-table-column
        prop="enterpriseID"
        label="企业组织机构代码"
        align="center"
        sortable
      />
      <el-table-column
        prop="enterpriseName"
        label="企业名"
        align="center"
        sortable
      />
      <el-table-column
        prop="enterpriseClass"
        label="企业所处行业"
        align="center"
        :filters="[
          { text: '发电企业', value: '1' },
          { text: '电网企业', value: '2' },
          { text: '钢铁生产企业', value: '3' },
          { text: '化工生产企业', value: '4' },
          { text: '电解铝生产企业', value: '5' },
          { text: '镁冶炼企业', value: '6' },
          { text: '平板玻璃生产企业', value: '7' },
          { text: '水泥生产企业', value: '8' },
          { text: '陶瓷生产企业', value: '9' },
          { text: '民航企业', value: '10' },
        ]"
        :filter-method="filterCompany"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          {{ scope.row.enterpriseClass | companyFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="auditStatus"
        label="审核状态"
        align="center"
        :filters="[
          { text: '审核通过', value: 'PASS' },
          { text: '审核中', value: 'AUDIT' },
          { text: '审核拒绝', value: 'REFUSE' },
          { text: '尚未提交', value: 'WAIT' },
        ]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <a-tag :color="scope.row.auditStatus | tagFilter">
            {{ scope.row.auditStatus | statusFilter }}
          </a-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="submitTime"
        label="填报时间"
        align="center"
        sortable
      >
        <template slot-scope="scope">
          {{
            dayjs(parseInt(scope.row.submitTime) * 1000).format(
              "YYYY[年]-MM[月]-DD[日]"
            )
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="taskYear"
        label="上报年份"
        align="center"
        sortable
      />
      <el-table-column label="操作" width="200" align="left">
        <template slot-scope="scope">
          <router-link
            :to="
              '/calculate/detail/' +
              scope.row.taskYear +
              '/' +
              scope.row.enterpriseID
            "
            style="margin-right: 10px"
          >
            <el-link type="primary" :underline="false">详情</el-link>
          </router-link>

          <a-tooltip>
            <template #title>点击即可发送邮件</template>
            <el-link
              v-if="
                scope.row.auditStatus != 'PASS' &&
                scope.row.auditStatus != 'AUDIT' &&
                (scope.row.enterpriseID != linkID ||
                  scope.row.taskYear.toString() != linkYear ||
                  !linkLoad)
              "
              @click="sendEmail(scope.row.enterpriseID, scope.row.taskYear)"
              type="primary"
              :underline="false"
              >邮件提醒</el-link
            >
          </a-tooltip>

          <el-link
            v-if="
              linkLoad &&
              scope.row.enterpriseID == linkID &&
              scope.row.taskYear.toString() == linkYear
            "
            type="primary"
            :underline="false"
            disabled
            >发送中...</el-link
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 发送邮件组件 -->
    <sonEmail ref="son" />

    <!-- 分页 -->
    <div style="display: flex; justify-content: right">
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
import sonEmail from "./email.vue";

export default {
  components: { sonEmail },

  filters: {
    statusFilter(status) {
      const statusMap = {
        PASS: "审核通过",
        AUDIT: "审核中",
        REFUSE: "审核拒绝",
        WAIT: "尚未提交",
      };
      return statusMap[status];
    },
    tagFilter(status) {
      const tagMap = {
        PASS: "green",
        AUDIT: "purple",
        REFUSE: "red",
        WAIT: "cyan",
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
      tableData: {},
      reportList: {},
      reportListLength: undefined,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: "150px",
      pageBegin: 0,
      pageEnd: 0,
      pageSize: 10,
      pageNum: 0,
      searchForm: { enterpriseID: "", enterpriseName: "" },
      linkLoad: false,
      linkID: "",
      linkYear: "",
    };
  },

  created() {
    this.fetchData();
    this.pageEnd = this.pageSize;
  },

  methods: {
    sendEmail(enterpriseID, taskYear) {
      this.$refs.son.getInfo(enterpriseID, taskYear);
      this.linkID = enterpriseID;
      this.linkYear = taskYear.toString();
      this.linkLoad = true;
    },
    loadStatus(status) {
      this.linkLoad = status;
    },
    resetRow() {
      this.linkID = "";
      this.linkYear = "";
    },

    handleSearch() {
      let form = this.searchForm;
      let tableList = this.reportList;
      // 筛选后的数据
      const filterList = tableList.filter((item) => {
        return Object.values(form).every((key, index) => {
          return item[Object.keys(form)[index]].includes(key);
        });
      });
      this.tableData = filterList;
    },
    handleReset() {
      this.tableData = this.reportList;
      this.searchForm.enterpriseID = "";
      this.searchForm.enterpriseName = "";
    },

    taskPublish() {
      let token = "123";
      this.taskYear = new Date().getFullYear();
      let taskYearInt = parseInt(this.taskYear);
      calculateAPI
        .taskPublish(
          token,
          taskYearInt,
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
        this.tableData = this.reportList;
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
      return row.auditStatus === value.toString();
    },
    filterCompany(value, row) {
      return row.enterpriseClass === parseInt(value);
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
