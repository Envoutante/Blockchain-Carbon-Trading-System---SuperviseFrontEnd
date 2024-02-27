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
      <el-table-column label="买方企业名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="卖方企业名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="交易类型" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.transactionType }}
        </template>
      </el-table-column>
      <el-table-column label="减排量（万吨）" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="日期"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.displayTime }}</span>
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
      <el-table-column label="操作" width="200" align="center">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="warning"
          >删除</el-button
        >
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog title="交易详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="项目所在地" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目类别" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option value="1" label="树林"></el-option>
            <el-option value="1" label="风能"></el-option>
            <el-option value="1" label="太阳能"></el-option>
            <el-option value="1" label="水电"></el-option>
            <el-option value="1" label="生物质发电"></el-option>
            <el-option value="1" label="沼气发电"></el-option>
            <el-option value="1" label="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出售数量" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出售单价" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目说明" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
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
import { getList } from "@/api/transaction";

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
      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
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
