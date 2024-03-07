<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="企业名称">
        <el-input size="small" placeholder="企业名称" />
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

    <!-- 批量审核 -->
    <el-button size="small" type="primary">批量审核</el-button>

    <!-- 表格 -->
    <el-table
      :data="bindList.slice(pageBegin, pageEnd)"
      style="width: 100%; margin-top: 20px"
      stripe
      v-loading="listLoading"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="userID" label="账户编号" align="center" />
      <el-table-column prop="userName" label="账户名称" align="center" />
      <el-table-column label="绑定状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.bindStatus | tagFilter">
            {{ scope.row.bindStatus | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <router-link :to="'/account/audit/' + '2'" style="margin-right: 10px">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >审核</el-button
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

    <!-- 编辑框 -->
    <el-dialog title="编辑碳配额" :visible.sync="dialogFormVisible">
      <el-form :model="list">
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input id="myText" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="企业类型" :label-width="formLabelWidth">
          <el-input id="myText" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="碳配额" :label-width="formLabelWidth">
          <el-input-number
            v-model="num"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.bindListLength"
        style="padding: 30px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import auditAPI from "@/api/audit";

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
  },

  data() {
    return {
      bindList: {},
      bindListLength: undefined,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      num: 1,
      numSize: 3,
    };
  },

  created() {
    this.fetchData();
    this.pageEnd = this.pageSize;
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 4 === 0) {
        return "success-row";
      } else if (rowIndex % 2 === 0) {
        return "warning-row";
      }
      return "";
    },
    fetchData() {
      this.listLoading = true;
      auditAPI.getBindList().then((response) => {
        this.bindList = response.data.bindList;
        this.bindListLength = this.bindList.length;
        this.listLoading = false;
      });
    },
    setItemText(percentage) {
      return percentage * 10;
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
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-progress,
.el-progress-bar {
  width: 400px;
}

.el-progress-bar__inner {
  background-color: #4ca861;
  text-align: center;
}

.el-progress-bar__outer {
  background-color: #ebeef5;
  width: 400px;
}

#myText {
  width: 300px;
}
</style>
