<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="收信企业">
        <el-input
          v-model="searchForm.to_enterpriseName"
          size="small"
          placeholder="请输入收信企业"
        />
      </el-form-item>

      <el-form-item label="收信邮箱">
        <el-input
          v-model="searchForm.to_email"
          size="small"
          placeholder="请输入收信邮箱"
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
      :data="tableData"
      v-loading="listLoading"
      element-loading-text="加载中"
      stripe
      fit
      highlight-current-row
    >
      <el-table-column prop="id" label="邮件编号" align="center" sortable
        ><template slot-scope="scope"
          ><a-tooltip>
            <template #title>{{ scope.row.id }}</template>
            <el-link type="primary" :underline="false">{{
              scope.row.id | ellipsis
            }}</el-link>
          </a-tooltip></template
        ></el-table-column
      >
      <el-table-column
        prop="result"
        label="发信状态"
        align="center"
        :filters="[
          { text: '发信成功', value: '1' },
          { text: '发信失败', value: '0' },
        ]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
        ><template slot-scope="scope"
          ><a-tag :color="scope.row.result | tagFilter">{{
            scope.row.result | sendFilter
          }}</a-tag></template
        ></el-table-column
      >
      <el-table-column
        prop="to_enterpriseName"
        label="收信企业"
        align="center"
        sortable
        ><template slot-scope="scope">
          {{ JSON.parse(scope.row.template_params).to_enterpriseName }}
        </template></el-table-column
      >
      <el-table-column prop="to_email" label="收信邮箱" align="center" sortable
        ><template slot-scope="scope">
          <el-link type="primary" :underline="false">{{
            JSON.parse(scope.row.template_params).to_email
          }}</el-link>
        </template></el-table-column
      >
      <el-table-column
        prop="service_id"
        label="发信服务器ID"
        align="center"
        sortable
      />
      <el-table-column
        prop="template_id"
        label="发信模板ID"
        align="center"
        sortable
      />
      <el-table-column
        prop="created_at"
        label="创建时间"
        align="center"
        sortable
        ><template slot-scope="scope"
          ><a-tag color="blue">
            {{ dayjs(scope.row.created_at).format("YYYY/MM/DD HH:mm:ss") }}
          </a-tag></template
        ></el-table-column
      >
    </el-table>

    <!-- 分页 -->
    <div style="display: flex; justify-content: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 25, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        style="padding: 30px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import { ClockCircleOutlined } from "@ant-design/icons-vue";

export default {
  // components: {
  //   ClockCircleOutlined,
  // },

  filters: {
    sendFilter(status) {
      const statusMap = {
        1: "发信成功",
        0: "发信失败",
      };
      return statusMap[status];
    },

    tagFilter(status) {
      const tagMap = {
        1: "cyan",
        0: "red",
      };
      return tagMap[status];
    },

    ellipsis(value) {
      if (!value) return "";
      if (value.length >= 10) {
        return "..." + value.slice(6, 15) + "...";
      }
      return value;
    },
  },

  data() {
    return {
      listLoading: true,
      EmailDetailparam: {},
      EmailDetailList: [],
      tableData: [],
      searchForm: { to_enterpriseName: "", to_email: "" },
      pageNum: 1,
      pageSize: 10,
    };
  },

  created() {
    this.getEmailDetail();
  },

  methods: {
    getEmailDetail() {
      this.axios({
        url: "https://mock.apifox.com/m1/2214773-0-default/getEmailDetailParam", // 写死
        method: "get",
        contentType: "application/json",
      }).then((res) => {
        this.EmailDetailparam = res.data.data;
        this.getEmailList();
      });
    },

    getEmailList() {
      this.axios({
        url:
          "https://api.emailjs.com/api/v1.1/history?user_id=" +
          this.EmailDetailparam.user_id +
          "&accessToken=" +
          this.EmailDetailparam.accessToken +
          "&page=" +
          this.pageNum +
          "&count=" +
          this.pageSize,
        method: "get", //注意是GET请求
        contentType: "application/json",
      }).then((res) => {
        this.EmailDetailList = res.data.rows;
        this.tableData = this.EmailDetailList;
        this.listLoading = false;
        console.log(this.EmailDetailList);
      });
    },

    handleSearch() {
      let form = this.searchForm;
      let tableList = this.EmailDetailList;

      const filterList = tableList.filter((item) => {
        // 只使用item中的部分内容进行过滤
        const template_params = JSON.parse(item.template_params);
        const to_enterpriseName = template_params.to_enterpriseName;
        const to_email = template_params.to_email;
        let sub_item = { to_enterpriseName, to_email };

        return Object.values(form).every((key, index) => {
          return sub_item[Object.keys(form)[index]].includes(key);
        });
      });

      this.tableData = filterList;
    },
    handleReset() {
      this.tableData = this.EmailDetailList;
      this.searchForm.to_enterpriseName = "";
      this.searchForm.to_email = "";
    },

    filterStatus(value, row) {
      return row.result === parseInt(value);
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageNum = 1;
      this.getEmailDetail();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getEmailDetail();
    },
  },
};
</script>
