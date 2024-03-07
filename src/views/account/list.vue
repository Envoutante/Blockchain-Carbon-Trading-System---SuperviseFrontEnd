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

    <!-- 表格 -->
    <el-table
      :data="userList"
      style="width: 100%"
      stripe
      v-loading="listLoading"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="userID" label="账户编号" align="center" />
      <el-table-column prop="userName" label="账户名称" align="center" />
      <el-table-column prop="userType" label="账户类型" align="center" />
      <el-table-column label="操作" width="200" align="center">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="dialogFormVisible = true"
          >编辑</el-button
        >
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
        :total="this.userListLength"
        style="padding: 30px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import auditAPI from "@/api/audit";

export default {
  data() {
    return {
      userList: {},
      userListLength: undefined,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      num: 1,
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
      auditAPI.getUserList().then((response) => {
        this.userList = response.data.userList;
        this.userListLength = this.userList.length;
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
