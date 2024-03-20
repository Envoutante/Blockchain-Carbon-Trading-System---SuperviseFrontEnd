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

    <!-- 批量编辑的对话框 -->
    <el-dialog
      title="批量编辑碳配额"
      :visible.sync="batchEditVisible"
      width="30%"
    >
      <span style="display: flex; justify-content: center">
        <el-input-number
          v-model="newEmission"
          size="medium"
          :min="0"
          :max="2000"
          style="margin: auto"
      /></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="batchEdit">提 交</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="tableData.slice(pageBegin, pageEnd)"
      style="width: 100%"
      stripe
      v-loading="listLoading"
      :row-key="(val) => val.enterpriseID"
      @selection-change="(val) => (selectedRow = val)"
      :default-sort="{ prop: 'enterpriseID', order: 'descending' }"
    >
      <el-table-column
        :reserve-selection="true"
        type="selection"
        width="50"
      ></el-table-column>
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
        ><template slot-scope="scope">
          <a-tag color="purple">
            {{ scope.row.enterpriseClass | companyFilter }}
          </a-tag>
        </template></el-table-column
      >
      <el-table-column
        prop="remainEmission"
        label="剩余碳排放量"
        align="center"
        sortable
      />
      <el-table-column prop="coCoin" label="碳币余额" align="center" sortable />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            size="mini"
            :underline="false"
            @click="editCcredits(scope.row)"
            >编辑</el-link
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 单一编辑框 -->
    <el-dialog title="编辑碳配额" :visible.sync="dialogFormVisible">
      <el-form :model="emissionItem">
        <el-form-item label="企业组织机构代码" :label-width="formLabelWidth">
          <el-input
            id="myText"
            :value="emissionItem.enterpriseID"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="企业名" :label-width="formLabelWidth">
          <el-input
            id="myText"
            :value="emissionItem.enterpriseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="企业所处行业" :label-width="formLabelWidth">
          <el-input
            id="myText"
            :value="emissionItem.enterpriseClass | companyFilter"
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
        <el-form-item label="碳币总量" :label-width="formLabelWidth">
          <el-input-number v-model="newCoCoin" :min="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" :disabled="updateLoad"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="updateCcredits"
          :loading="updateLoad"
          >{{ buttonText }}</el-button
        >
      </div>
    </el-dialog>

    <!-- 批量增加的抽屉 -->
    <el-drawer
      title="✒️批量添加碳配额"
      :visible.sync="editDrawer"
      direction="rtl"
      size="50%"
    >
      <edit-page />
    </el-drawer>

    <!-- 分页 -->
    <el-row type="flex" justify="space-between">
      <el-col :span="12" style="display: flex; align-items: center">
        <div>
          <el-button
            plain
            size="small"
            type="success"
            icon="el-icon-circle-plus-outline"
            style="margin: 0 10px 0 0"
            @click="editDrawer = true"
            >批量添加</el-button
          >

          <el-button
            plain
            size="small"
            type="primary"
            icon="el-icon-edit-outline"
            @click="batchEditVisible = true"
            >批量编辑</el-button
          >
        </div>
      </el-col>

      <el-col :span="12">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.emissionListLength"
          style="padding: 30px 0; float: right"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- <div style="padding: 0 20px; margin-top: 50px; color: #909399">
      <h3>⚠️碳币余额 = 碳币总量 - 剩余碳排放量</h3>
      <p>
        剩余碳排放量是指在特定时间范围内，某个国家或企业尚未排放的碳排放量。
        是指个人或企业通过减少碳排放获得的碳币数量，可以用于购买碳抵消项目或产品。
        碳币总量（碳配额）是指在特定时间范围内，某个国家或企业分配给各方的碳币总数。
        剩余碳排放量和碳币余额之间的关系是，剩余碳排放量决定了碳币的供需关系，而碳币余额则反映了个人或企业的碳排放减少表现。
        碳币总量则是制定碳交易市场的基础，决定了碳排放权的分配。
      </p>
    </div> -->
  </div>
</template>

<script>
import ccreditsAPI from "@/api/ccredits";
import Cookies from "js-cookie";
import editPage from "./edit.vue";

export default {
  components: { editPage },

  filters: {
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
    return {
      buttonText: "确认",
      updateLoad: false,
      editDrawer: false,
      selectedRow: [],
      tableData: {},
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
      oldCoCoin: 0,
      newCoCoin: 0,
      newEmission: 0,
      listLoading: true,
      dialogFormVisible: false,
      batchEditVisible: false,
      formLabelWidth: "200px",
      num: 1,
      pageBegin: 0,
      pageEnd: 0,
      pageSize: 10,
      pageNum: 0,
      multipleSelection: [],
      searchForm: { enterpriseID: "", enterpriseName: "" },
    };
  },

  created() {
    this.fetchData();
    this.pageEnd = this.pageSize;
  },

  methods: {
    closeEditDrawer() {
      this.editDrawer = false;
    },

    handleSearch() {
      let form = this.searchForm;
      let tableList = this.emissionList;
      // 筛选后的数据
      const filterList = tableList.filter((item) => {
        return Object.values(form).every((key, index) => {
          return item[Object.keys(form)[index]].includes(key);
        });
      });
      this.tableData = filterList;
    },

    handleReset() {
      this.tableData = this.emissionList;
      this.searchForm.enterpriseID = "";
      this.searchForm.enterpriseName = "";
    },

    fetchData() {
      this.listLoading = true;
      ccreditsAPI.getEmissionList().then((response) => {
        this.emissionList = response.data.emissionList;
        this.emissionListLength = this.emissionList.length;
        this.tableData = this.emissionList;
        this.listLoading = false;
      });
    },

    // 点击编辑按钮
    editCcredits(emissionItem) {
      this.dialogFormVisible = true;
      this.emissionItem = emissionItem;
      this.oldCoCoin = emissionItem.remainEmission + emissionItem.coCoin;
      this.newCoCoin = this.oldCoCoin;
      console.log("打印：" + this.emissionItem.enterpriseID);
    },

    // 点击提交按钮
    updateCcredits() {
      this.$confirm(
        "确认是否继续执行此操作，该操作将对选定企业的碳排放配额产生影响。是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.updateLoad = true;
          this.buttonText = "提交中";
          let token = Cookies.get("token");
          ccreditsAPI
            .updateEmission(
              token,
              this.emissionItem.enterpriseID,
              parseInt(this.newCoCoin) - parseInt(this.oldCoCoin)
            )
            .then(() => {
              this.updateLoad = false;
              this.$message({
                message: "碳配额编辑成功！",
                type: "success",
              });
              this.buttonText = "确认";
              this.dialogFormVisible = false;
              this.fetchData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消编辑操作",
          });
        });
    },

    batchEdit() {
      console.log(this.selectedRow);
      let statusType = true;
      if (this.selectedRow.length == 0) {
        statusType = false;
        this.$message({
          type: "error",
          message: "请勾选需要编辑的企业！",
        });
      }

      if (statusType) {
        this.$confirm("此操作批量编辑碳配额，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.selectedRow.forEach((row) => {
              this.enterpriseIDList.push(row.enterpriseID);
            });

            let token = Cookies.get("token");
            ccreditsAPI
              .addEmission(token, this.enterpriseIDList, this.newEmission)
              .then((response) => {
                this.$message({
                  type: "success",
                  message: "批量编辑成功",
                });
                this.fetchData();
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

    formatter(row, column) {
      return row.address;
    },
    filterCompany(value, row) {
      return row.enterpriseClass === value;
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

.el-drawer__header {
  font-size: 20px !important;
  color: #303133 !important;
}
</style>

<style lang="scss">
.el-table .blue-row {
  td {
    background-color: #e9f2fb !important;
  }
}
</style>

<style scoped>
.el-input.is-disabled /deep/ .el-input__inner {
  color: #606266 !important;
}
</style>
