<template>
  <div class="app-container">
    <!-- 发布填报任务对话框 -->
    <el-button
      size="small"
      type="primary"
      icon="el-icon-edit"
      @click="publishTaskFormVisible = true"
      style="margin-bottom: 20px"
      >发布填报任务</el-button
    >

    <el-dialog
      title="发布填报任务"
      :visible.sync="publishTaskFormVisible"
      center
    >
      <el-form
        :model="taskPublishForm"
        style="align: center; padding-right: 50px"
      >
        <el-form-item label="设置填报年份" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="taskPublishForm.taskYear"
              value-format="yyyy"
              type="year"
              placeholder="选择年份"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="设置起止时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="taskTimeRange"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              :default-value="this.taskPublishForm.taskYear"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="填写任务详情" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="taskDescription"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="taskPublish">确 定</el-button>
        <el-button @click="publishTaskFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

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
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="编号" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="企业名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="企业类型">
        <template slot-scope="scope">
          {{ scope.row.companyType }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="审核状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="填报时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.displayTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <router-link :to="'/table/detail/' + '2'" style="margin-right: 10px">
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
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="30"
        style="padding: 30px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        尚未审核: "gray",
        通过审核: "success",
        未通过审核: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: "200px",
      publishTaskFormVisible: false,
      taskTimeRange: "",
      taskPublishForm: {
        taskYear: "",
        taskBeginTime: "",
        taskEndTime: "",
        taskDescription: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    taskPublish() {
      this.publishTaskFormVisible = false;
      this.taskPublishForm.taskBeginTime = this.taskTimeRange[0];
      this.taskPublishForm.taskEndTime = this.taskTimeRange[1];
      console.log("打印：" + this.taskPublishForm.taskYear);
    },
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
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
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style>
.el-dialog__body .el-form-item__label {
  padding: 0 25px 0 0;
}
</style>
