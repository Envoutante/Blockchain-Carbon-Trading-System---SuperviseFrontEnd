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

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <router-link :to="'/ccredits/edit'">
          <el-button
            size="small"
            type="success"
            icon="el-icon-circle-plus-outline"
            style="margin: 0 10px 0 0"
            >批量添加</el-button
          >
        </router-link>
        <el-input-number
          v-model="newEmission"
          size="small"
          :min="1"
          :max="10"
          style="margin-right: 10px"
        />
        <el-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          @click="batchEdit"
          >批量编辑</el-button
        >

        <el-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          @click="insertData()"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      :data="emissionList.slice(pageBegin, pageEnd)"
      style="width: 100%"
      stripe
      v-loading="listLoading"
      :row-key="
        (row) => {
          return row.id;
        }
      "
      :reserve-selection="true"
      @selection-change="handleSelect"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        prop="enterpriseID"
        label="企业组织机构代码"
        align="center"
      />
      <el-table-column prop="enterpriseName" label="企业名" align="center" />
      <el-table-column
        prop="enterpriseClass"
        label="企业所处行业"
        align="center"
      />
      <el-table-column
        prop="remainEmission"
        label="剩余碳排放量"
        align="center"
      />
      <el-table-column prop="coCoin" label="碳币余额" align="center" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editCcredits(scope.row)"
            >编辑</el-button
          >
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

    <!-- 单一编辑框 -->
    <el-dialog title="编辑碳配额" :visible.sync="dialogFormVisible">
      <el-form :model="emissionItem">
        <el-form-item label="组织代码" :label-width="formLabelWidth">
          <el-input
            id="myText"
            :value="emissionItem.enterpriseID"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input
            id="myText"
            :value="emissionItem.enterpriseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="行业类型" :label-width="formLabelWidth">
          <el-input
            id="myText"
            :value="emissionItem.enterpriseClass"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="剩余碳排放量" :label-width="formLabelWidth">
          <el-input
            id="myText"
            :value="emissionItem.remainEmission"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="碳币余额" :label-width="formLabelWidth">
          <el-input-number v-model="newCoCoin" :min="1" :max="10" />
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
        :total="this.emissionListLength"
        style="padding: 30px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ccreditsAPI from "@/api/ccredits";

export default {
  data() {
    return {
      emissionList: {},
      emissionListLength: undefined,
      emissionItem: {
        enterpriseID: "",
        enterpriseName: "",
        enterpriseClass: "",
        remainEmission: "",
        coCoin: "",
      },
      enterpriseIDList: [],
      newCoCoin: 0,
      newEmission: 0,
      listLoading: true,
      dialogFormVisible: false,
      batchEditVisible: false,
      formLabelWidth: "120px",
      num: 1,
      pageBegin: 0,
      pageEnd: 0,
      pageSize: 10,
      pageNum: 0,
      multipleSelection: [],
    };
  },

  created() {
    this.fetchData();
    this.pageEnd = this.pageSize;
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 4 === 0) {
        return "blue-row";
      } else if (rowIndex % 2 === 0) {
        return "blue-row";
      }
      return "";
    },
    fetchData() {
      this.listLoading = true;
      ccreditsAPI.getEmissionList().then((response) => {
        this.emissionList = response.data.emissionList;
        this.emissionListLength = this.emissionList.length;
        this.listLoading = false;
      });
    },
    editCcredits(emissionItem) {
      this.dialogFormVisible = true;
      this.emissionItem = emissionItem;
      this.newCoCoin = emissionItem.coCoin;
      console.log(id);
    },
    // 处理多选
    handleSelect(val) {
      this.multipleSelection = val;
      this.enterpriseIDList = [];
      // 将选中行的id进行循环遍历存入自定义的ids数组中
      this.multipleSelection.forEach((row) => {
        this.enterpriseIDList.push(row.enterpriseID);
      });
      console.log(this.enterpriseIDList);
    },
    batchEdit() {
      console.log(this.enterpriseIDList);
      let statusType = true;
      if (this.enterpriseIDList.length == 0) {
        statusType = false;
        this.$message({
          type: "error",
          message: "请选择需要编辑的企业",
        });
      }
      if (statusType) {
        this.$confirm("此操作批量编辑碳配额，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            ccreditsAPI
              .addEmission("1", this.enterpriseIDList, this.newEmission)
              .then((response) => {
                this.$message({
                  type: "success",
                  message: "批量编辑成功",
                });
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消批量编辑",
            });
          });
      }
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

<style lang="scss">
.el-table .blue-row {
  td {
    background-color: #e9f2fb !important;
  }
}
</style>
