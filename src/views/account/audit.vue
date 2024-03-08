<template>
  <div class="app-container">
    <div class="content-container">
      <el-form
        style="margin-top: 10px"
        label-width="200px"
        class="form-table"
        v-loading="loading"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="企业名：">
              {{ bindDetail.enterpriseName }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="18">
            <el-form-item label="企业地址：">
              {{ bindDetail.enterprisePosition }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="企业组织机构代码：">
              <el-input :value="bindDetail.enterpriseID" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="企业性质：">
              {{ bindDetail.enterpriseCharacter }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="企业所在行业：">
              {{ bindDetail.enterpriseClass | companyFilter }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="企业法人：">
              {{ bindDetail.enterpriseLegelPerson }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="企业填报负责人：">
              {{ bindDetail.enterpriseResponsiblePerson }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="填报负责人邮箱：">
              {{ bindDetail.enterpriseResponsibleEmail }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="18">
            <el-form-item label="企业简介：">
              {{ bindDetail.enterpriseDescription }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div v-if="bindStatus === 'PASS'" class="content-container">
      <el-form
        style="margin: 10px 0"
        label-width="200px"
        class="form-table"
        v-loading="loading"
      >
        <el-row>
          <el-col :span="18">
            <el-form-item label="审核结果：" :required="true">
              <el-radio v-model="auditStatus" label="PASS">通过</el-radio>
              <el-radio v-model="auditStatus" label="REFUSE">驳回</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="auditStatus === 'REFUSE'">
          <el-col :span="16">
            <el-form-item label="审核意见：" :required="true">
              <el-input
                resize="none"
                type="textarea"
                :rows="5"
                placeholder="请输入驳回此申请的原因"
                v-model="auditOpinion"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <router-link
            :to="'/account/bind/'"
            style="margin-right: 30px; float: left"
          >
            <el-button>返回</el-button>
          </router-link>
          <el-button style="float: left" type="primary" @click="handleSubmit"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import auditAPI from "@/api/audit";
import Cookies from "js-cookie";

export default {
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
      loading: true,
      userID: "",
      bindDetail: {},
      auditStatus: "",
      auditOpinion: "",
      enterpriseIDList: [],
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      let token = Cookies.get("token");
      this.enterpriseID = this.$route.query.enterpriseID;
      this.bindStatus = this.$route.query.bindStatus;
      console.log(this.enterpriseID);
      auditAPI.getBindDetail(token, this.enterpriseID).then((response) => {
        this.bindDetail = response.data;
        this.loading = false;
      });
    },
    noResult() {
      const h = this.$createElement;

      this.$notify({
        title: "警告",
        message: h("i", { style: "color: teal" }, "未选择审核结果"),
      });
    },
    noOpinion() {
      const h = this.$createElement;

      this.$notify({
        title: "警告",
        message: h("i", { style: "color: teal" }, "未填写审核意见"),
      });
    },
    noBoth() {
      const h = this.$createElement;

      this.$notify({
        title: "警告",
        message: h(
          "i",
          { style: "color: teal" },
          "未选择审核结果 & 未填写审核意见"
        ),
      });
    },
    handleSubmit() {
      if (!this.auditStatus && this.auditOpinion) {
        this.noResult();
      } else if (this.auditStatus && !this.auditOpinion) {
        this.noOpinion();
      } else if (!this.auditStatus && !this.auditOpinion) {
        this.noBoth();
      }
      this.enterpriseIDList.push(this.bindDetail.enterpriseID);
      console.log(this.enterpriseIDList);

      if (this.auditStatus && this.auditOpinion) {
        let token = Cookies.get("token");
        auditAPI
          .submitAuditResult(
            token,
            this.enterpriseIDList,
            this.auditStatus,
            this.auditOpinion
          )
          .then((response) => {
            const h = this.$createElement;

            this.$notify({
              title: "通知",
              message: h("i", { style: "color: teal" }, response.message),
            });

            this.$router.push("/account/bind");
          });
      }
    },
  },
};
</script>

<style scoped>
.content-container {
  background-color: #ffffff !important;
  padding: 20px 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgb(0, 0, 0, 0.2);
}

.el-input.is-disabled /deep/ .el-input__inner {
  color: #000000 !important;
}
</style>
