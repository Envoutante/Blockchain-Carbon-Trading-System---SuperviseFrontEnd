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
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="编号" width="60">
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
      <el-table-column label="碳币总量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
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
        label="操作时间"
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
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
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
