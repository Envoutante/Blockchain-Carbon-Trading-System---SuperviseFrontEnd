<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="账户名称">
        <el-input
          v-model="searchForm.userName"
          size="small"
          placeholder="请输入账户名称"
        />
      </el-form-item>

      <el-form-item label="账户编号">
        <el-input
          v-model="searchForm.userID"
          size="small"
          placeholder="请输入账户编号"
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
      :data="tableData.slice(pageBegin, pageEnd)"
      style="width: 100%"
      stripe
      v-loading="listLoading"
      :default-sort="{ prop: 'userID', order: 'ascending' }"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="userID" label="账户编号" align="center" sortable />
      <el-table-column
        prop="userName"
        label="账户名称"
        align="center"
        sortable
      />
      <el-table-column
        prop="userType"
        label="账户类型"
        align="center"
        :filters="[
          { text: '企业', value: '企业' },
          { text: '数据审核员', value: '数据审核员' },
          { text: '第三方监管机构', value: '第三方监管机构' },
          { text: '管理员', value: '管理员' },
        ]"
        :filter-method="filterType"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <a-tag :color="scope.row.userType | tagFilter">
            {{ scope.row.userType }}
          </a-tag>
        </template></el-table-column
      >
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="editUserType(scope.row)"
            >编辑</el-link
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <el-dialog title="编辑账户类型" :visible.sync="dialogFormVisible">
      <el-form :model="userItem">
        <el-form-item label="账户编号" :label-width="formLabelWidth">
          <el-input
            id="myText"
            :value="userItem.userID"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="账户名称" :label-width="formLabelWidth">
          <el-input
            id="myText"
            :value="userItem.userName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="账户类型" :label-width="formLabelWidth">
          <el-select
            v-if="userItem.userType !== '企业'"
            v-model="newUserType"
            placeholder="请选择"
          >
            <el-option
              :value="'数据审核员'"
              :disabled="userItem.userType === '数据审核员'"
            />
            <el-option
              :value="'第三方监管机构'"
              :disabled="userItem.userType === '第三方监管机构'"
            />
            <el-option
              :value="'管理员'"
              :disabled="userItem.userType === '管理员'"
            />
          </el-select>
          <el-input
            v-else
            id="myText"
            :value="userItem.userType"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserType">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div style="display: flex; justify-content: right">
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
import Cookies from "js-cookie";

export default {
  filters: {
    tagFilter(status) {
      const tagMap = {
        企业: "blue",
        数据审核员: "red",
        第三方监管机构: "red",
        管理员: "red",
      };
      return tagMap[status];
    },
  },

  data() {
    return {
      tableData: {},
      userList: {},
      userListLength: undefined,
      userItem: {
        userID: "",
        userName: "",
        userType: "",
      },
      newUserType: "",
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: "200px",
      num: 1,
      pageBegin: 0,
      pageEnd: 0,
      pageSize: 10,
      pageNum: 0,
      searchForm: { userID: "", userName: "" },
    };
  },

  created() {
    this.fetchData();
    this.pageEnd = this.pageSize;
  },

  methods: {
    handleSearch() {
      let form = this.searchForm;
      let tableList = this.userList;
      // 筛选后的数据
      const filterList = tableList.filter((item) => {
        return Object.values(form).every((key, index) => {
          return item[Object.keys(form)[index]].includes(key);
        });
      });
      this.tableData = filterList;
    },
    handleReset() {
      this.tableData = this.userList;
      this.searchForm.userID = "";
      this.searchForm.userName = "";
    },

    fetchData() {
      this.listLoading = true;
      auditAPI.getUserList().then((response) => {
        this.userList = response.data.userList;
        this.userListLength = this.userList.length;
        this.tableData = this.userList;
        this.listLoading = false;
      });
    },

    editUserType(userItem) {
      this.dialogFormVisible = true;
      this.userItem = userItem;
    },

    updateUserType() {
      let token = Cookies.get("token");
      auditAPI
        .updateUserType(token, this.userItem.userID, this.newUserType)
        .then((response) => {
          this.$message({
            message: "账户类型编辑成功！",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.fetchData();
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
    filterType(value, row) {
      return row.userType === value;
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
