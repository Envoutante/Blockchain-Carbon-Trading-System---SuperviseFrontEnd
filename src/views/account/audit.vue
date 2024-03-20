<template>
  <div style="background-color: #ffffff; padding: 20px">
    <div class="content-container">
      <el-steps :active="activeStep" align-center>
        <el-step
          title="提交绑定申请"
          description="账户提交待绑定企业信息"
        ></el-step>
        <el-step
          title="审核"
          description="监管端账户审核企业端账户提交的绑定信息"
        ></el-step>
        <el-step
          title="公布审核结果"
          description="企业端账户查看审核结果"
        ></el-step>
      </el-steps>

      <a-divider />

      <div style="display: flex; justify-content: center">
        <el-form
          style="margin-top: 10px"
          label-width="150px"
          class="form-table"
          v-loading="loading"
        >
          <el-form-item label="企业名：">
            {{ bindDetail.enterpriseName }}
          </el-form-item>

          <el-form-item label="企业地址：">
            {{ bindDetail.enterprisePosition }}
          </el-form-item>

          <el-form-item label="企业组织机构代码：">
            <a-tag color="pink">{{ bindDetail.enterpriseID }}</a-tag>
          </el-form-item>

          <el-form-item label="企业性质：">
            {{ bindDetail.enterpriseCharacter }}
          </el-form-item>

          <el-form-item label="企业所在行业：">
            {{ bindDetail.enterpriseClass | companyFilter }}
          </el-form-item>

          <el-form-item label="企业法人：">
            {{ bindDetail.enterpriseLegelPerson }}
          </el-form-item>

          <el-form-item label="企业填报负责人：">
            {{ bindDetail.enterpriseResponsiblePerson }}
          </el-form-item>

          <el-form-item label="填报负责人邮箱：">
            {{ bindDetail.enterpriseResponsibleEmail }}
          </el-form-item>

          <el-form-item label="企业简介：">
            <el-input
              style="width: 400px"
              type="textarea"
              :rows="2"
              :value="bindDetail.enterpriseDescription"
              resize="none"
              autosize
              disabled
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <a-divider v-if="bindStatus !== 'PASS'" />

      <div v-if="bindStatus !== 'PASS'">
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-form
              style="margin: 10px 0"
              label-width="200px"
              class="form-table"
              v-loading="loading"
            >
              <el-form-item label="审核结果：" :required="true">
                <el-radio v-model="auditStatus" label="PASS">通过</el-radio>
                <el-radio v-model="auditStatus" label="REFUSE">驳回</el-radio>
              </el-form-item>

              <el-form-item
                v-if="auditStatus === 'REFUSE'"
                label="审核意见："
                :required="true"
              >
                <el-input
                  resize="none"
                  type="textarea"
                  :rows="5"
                  placeholder="请填写驳回此申请的理由"
                  v-model="auditOpinion"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>

      <div
        v-if="bindStatus !== 'PASS'"
        style="display: flex; justify-content: center; margin-top: 20px"
      >
        <router-link :to="'/account/bind/'" style="margin-right: 30px">
          <el-button>返回</el-button>
        </router-link>
        <el-button type="primary" @click="handleSubmit">审核</el-button>
      </div>

      <div
        v-else
        style="display: flex; justify-content: center; margin-top: 20px"
      >
        <router-link :to="'/account/bind/'" style="margin-right: 30px">
          <el-button>返回上一级</el-button>
        </router-link>
      </div>
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
      activeStep: 0,
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
        if (this.bindStatus === "WAIT") {
          this.activeStep = 1;
        } else if (
          this.bindStatus === "AUDIT" ||
          this.bindStatus === "REFUSE"
        ) {
          this.activeStep = 2;
        } else if (this.bindStatus === "PASS") {
          this.activeStep = 3;
        }
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
  /* box-shadow: 0 1px 5px rgb(0, 0, 0, 0.2); */
}

.el-input.is-disabled /deep/ .el-input__inner {
  color: #606266 !important;
}

.el-textarea.is-disabled /deep/ .el-textarea__inner {
  color: #606266 !important;
}
</style>
