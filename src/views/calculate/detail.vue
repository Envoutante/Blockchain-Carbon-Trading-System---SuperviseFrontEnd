<template>
  <div class="app-container" style="background-color: #ffffff">
    <!-- table -->
    <div>
      <div>
        <div
          style="
            width: 100%;
            border-radius: 10px;
            background: linear-gradient(275deg, #42e695, #3bb2b8);
            min-height: 120px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
          "
        >
          <img
            src="@/assets/CarbonSum.png"
            alt=""
            style="width: 100px; margin-left: 50px; margin: auto 50px"
          />
          <div style="color: white; width: 300px">
            <div>
              <!-- <span style="font-size: 42px; color: white; font-weight: bold">{{ dataSource.sumEmission }}</span> -->
              <a-statistic
                title=""
                :precision="4"
                :value="dataSource.sumEmission"
                :valueStyle="{
                  fontSize: '50px',
                  color: 'white',
                  fontWeight: '900',
                }"
              />
              <!-- <span style="margin-left: 20px">tCO₂</span> -->
            </div>
            <div>本年度碳排放量<span> (tCO₂)</span></div>
          </div>

          <!-- <div
            style="color: white; margin-left: 50px; width: 350px"
            v-if="submitType == 'create'"
          >
            <div>
              企业预计剩余碳排放量<span> (tCO₂)</span><br /><span
                style="font-size: 10px"
                >（填报的年度碳排放已预扣但未真实扣减，仅供参考，审核通过后实际扣除）</span
              >
            </div>
          </div> -->
        </div>
        <div class="tabelSetOptions" style="width: 100%; text-align: right">
          表格设置：
          <a-checkbox-group
            v-if="MainClassName.length > 0"
            :options="tableSetOptions"
            v-model="tableSetOptionsChecked"
            :default-value="['ShowUnit', 'ShowDataSource']"
            @change="ontableSetOptionsChange"
            style="margin-bottom: 20px"
          >
            <span slot="label" slot-scope="{ value }">{{ value }}</span>
          </a-checkbox-group>
          <a-button-group>
            <a-tooltip>
              <template slot="title">
                临时性导出数据以便您下次填报时可直接使用
              </template>
              <a-button icon="cloud-download" @click="exportData">
                导出数据
              </a-button>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                将临时导出的数据重新导入，您也可以导入您自定义的模板
              </template>
              <a-button
                icon="cloud-upload"
                @click="importData"
                v-if="submitType != 'detail'"
              >
                导入数据
              </a-button>
            </a-tooltip>
            <input
              type="file"
              @change="loadTextFromFile"
              id="txtUpload"
              style="display: none"
            />
          </a-button-group>
        </div>

        <!-- 显示表格的地方 -->
        <a-tabs v-if="haveFlag" tab-position="top" default-active-key="0">
          <a-tab-pane
            v-for="(name, idx) in MainClassName.length"
            :key="`tab_${idx}`"
            :tab="MainClassName[idx]"
            :forceRender="true"
          >
            <emission-submit-table
              :ref="`emissionSubmitTableRef` + idx"
              :submitType="submitType"
              :tableIdx="idx"
              :classdata="dataSource.detail[idx]"
              :tableSetOptionsChecked="tableSetOptionsChecked"
              @dataUpdate="dataUpdate"
            ></emission-submit-table>
          </a-tab-pane>
        </a-tabs>

        <!-- <el-empty v-else description="该企业尚未上传碳核算报告"></el-empty> -->
        <el-skeleton v-else :rows="10" animated />
        <router-link v-if="!haveFlag" :to="'/calculate/list'"
          ><el-button type="primary" style="margin-top: 20px"
            >返回上一页</el-button
          ></router-link
        >
      </div>

      <a-divider v-if="haveFlag" />

      <download v-if="haveFlag" :dataSource="dataSource" ref="download" />

      <a-divider v-if="haveFlag" />

      <template v-if="haveFlag">
        <div class="content-container">
          <el-form label-width="200px" class="form-table" v-loading="loading">
            <el-row>
              <el-col :span="18">
                <el-form-item label="审核结果：" :required="true">
                  <el-radio v-model="auditStatus" label="PASS">通过</el-radio>
                  <el-radio v-model="auditStatus" label="REFUSE">驳回</el-radio>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="18">
                <el-form-item label="审核意见：" :required="true">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入审核意见"
                    v-model="auditOpinion"
                    resize="none"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-row type="flex" justify="center" style="text-align: center">
            <el-col :span="6">
              <router-link :to="'/calculate/list'" style="margin-right: 10px">
                <el-button>返回</el-button>
              </router-link>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { GetMainClassName } from "@/views/calculate/emissionSubmitCompnent/parserTable.js";
import emissionSubmitTable from "@/views/calculate/emissionSubmitCompnent/emissionSubmitTable.vue";
import { ScrollNumber } from "vue2-scroll-number";
import download from "@/views/calculate/download.vue";
import store from "@/store";
// import { saveAs } from "file-saver";
import dayjs from "dayjs";

// 注册
import { Drawer, Button, Tabs, TabPane, Statistic } from "ant-design-vue";

const Base64 = require("js-base64").Base64;

import calculateAPI from "@/api/calculate.js";
import Cookies from "js-cookie";

export default {
  name: "emissionSubmit",
  components: {
    "a-drawer": Drawer,
    "a-button": Button,
    "a-tabs": Tabs,
    "a-tab-pane": Tabs.TabPane,
    "a-statistic": Statistic,
    emissionSubmitTable,
    ScrollNumber,
    download,
  },

  data() {
    return {
      haveFlag: false,
      enterpriseID: "",
      taskYear: "",
      dataSource: {
        sumEmission: 0,
      }, // 用于存储数据源
      dataTemplate: null, // 用于存储数据模板
      MainClassName: [],

      submitType: "create",

      // 配置项
      tableSetOptions: [
        { label: "展示单位", value: "ShowUnit" },
        { label: "展示来源", value: "ShowDataSource" },
      ],
      tableSetOptionsChecked: ["ShowUnit", "ShowDataSource"],

      // 审核意见
      auditStatus: "",
      auditOpinion: "",
    };
  },

  mounted() {
    this.getSourceData();
  },

  methods: {
    getSourceData() {
      this.taskYear = this.$route.params.year;
      let taskYearInt = parseInt(this.taskYear);
      this.enterpriseID = this.$route.params.id;
      calculateAPI
        .getReport(taskYearInt, this.enterpriseID)
        .then((response) => {
          if (response.code == 404) {
            this.$message({
              message: "该企业尚未填写碳核算报告，请返回！",
              type: "warning",
            });
            this.haveFlag = false;
          } else {
            this.dataSource = response.data.report;
            this.passSourceData(this.dataSource);
            this.haveFlag = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    passSourceData(submitData, type = "modify") {
      this.dataSource = JSON.parse(JSON.stringify(submitData));
      this.submitType = type;
      this.initTable();
    },
    initTable() {
      this.submitType = "detail";
      this.MainClassName = GetMainClassName(this.dataSource);
      this.$forceUpdate();
    },

    reconcludeSum() {
      let res = 0;
      for (let i = 0; i < this.MainClassName.length; i++) {
        // let sum=0
        // for(let j=0;j<this.dataSource.detail[i].children.length;j++){
        //   sum+=parseFloat(this.dataSource.detail[i].children[j].classDataSum)
        // }
        // this.dataSource.detail[i].classDataSum=sum
        res += parseFloat(this.dataSource.detail[i].classDataSum);
      }
      this.dataSource.sumEmission = res.toFixed(6);
      this.$forceUpdate();
    },

    // 数据被修改
    dataUpdate(idx, updatedData) {
      this.dataSource.detail[idx] = updatedData;
      this.reconcludeSum();
    },

    // 表格配置项
    ontableSetOptionsChange() {
      // console.log('checked = ', checkedValues);
      // console.log('value = ', this.tableSetOptionsChecked)
    },
    /**
     * 打开数据源问题弹窗
     */
    // openDataSourceQuestionModal() {
    //   // console.log(this.$refs.dataSourceQuestionModal)
    //   this.$refs.dataSourceQuestionModal.open();
    // },
    /**
     * 父组件获取
     */

    /**
     * 导入导出数据
     */

    exportData() {
      this.$message.loading({ content: "导出数据中...", key: "exportData" });
      setTimeout(() => {
        const exStr = Base64.encode(JSON.stringify(this.dataSource.detail)); //加密
        const file = new File(
          [exStr],
          `${dayjs().format("YYYY-MM-DD_HH-MM-ss")}--${
            this.dataSource.taskYear
          }年度上报数据--临时存储(切勿修改).json`,
          {
            type: "text/plain;charset=utf-8",
          }
        );
        // saveAs(file);
        this.$message.success({
          content: "保存成功,请勿修改元数据",
          key: "exportData",
        });
      }, 500);
    },
    importData() {
      this.$confirm({
        title: this.$t("modal.notice.title"),
        content: "注意！导入数据后将覆盖原有数据，确认继续吗？",
        okType: "danger",
        onOk() {
          document.getElementById("txtUpload").click();
          return new Promise((resolve, reject) => {
            // console.log('aa')

            resolve();
          });
        },
        onCancel() {},
      });
    },
    loadTextFromFile(e) {
      const file = e.target.files[0];
      let name = file.name.split(".").splice(-1).toString();
      if (name !== "json") {
        this.$message.warning({
          content: "文件类型错误,请重新选择文件",
          key: "importData",
        });
        return;
      }
      const reader = new FileReader();
      if (typeof FileReader === "undefined") {
        this.$message.warning({
          content: "您的浏览器不支持FileReader接口",
          key: "importData",
        });
        return;
        // alert('您的浏览器不支持FileReader接口')
      }
      this.$message.loading({ content: "数据解析中...", key: "importData" });
      e.target.value = ""; //文件置空，传重复的文件也会导入
      setTimeout(() => {
        reader.onload = (e) =>
          this.$emit("load", this.dealFile(e.target.result));
        reader.readAsText(file, "utf-8");
      }, 500);
    },
    dealFile(item) {
      const dcStr = Base64.decode(item); //加密
      try {
        const dcObj = JSON.parse(dcStr);
        this.dataSource.detail = dcObj;
        for (let i = 0; i < this.dataSource.detail.length; i++) {
          let ref = eval("this.$refs.emissionSubmitTableRef" + i)[0];
          ref.initTable(true, this.dataSource.detail[i]);
        }

        this.reconcludeSum();
        this.$forceUpdate();
        this.$message.success(
          { content: "数据解析成功", key: "importData" },
          1
        );
      } catch {
        this.$message.warning(
          { content: "数据解析失败,请勿修改元数据", key: "importData" },
          1
        );
      }
      return;
      // console.log(dcObj)
    },
    // 提交审核意见
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
    // 提交审核意见
    handleSubmit() {
      if (!this.auditStatus && this.auditOpinion) {
        this.noResult();
      } else if (this.auditStatus && !this.auditOpinion) {
        this.noOpinion();
      } else if (!this.auditStatus && !this.auditOpinion) {
        this.noBoth();
      }

      if (this.auditStatus && this.auditOpinion) {
        let token = Cookies.get("token");
        calculateAPI
          .submitAuditResult(
            token,
            this.enterpriseID,
            this.auditStatus,
            this.auditOpinion,
            this.taskYear
          )
          .then((response) => {
            this.$message({
              message: response.message,
              type: "success",
            });
            this.$router.push("/calculate/list");
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.ant-table-body {
  &::-webkit-scrollbar {
    //整体样式
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    //滑动滑块条样式
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    // background: #eff1f7;
  }
  &::-webkit-scrollbar-track {
    //轨道的样式
    -webkit-box-shadow: 0;
    border-radius: 0;
    background: #f6f8ff;
  }
}

.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>

<style scoped>
.content-container {
  background-color: #ffffff !important;
  padding: 20px 5px;
  margin-bottom: 10px;
  /* border-radius: 2px; */
  /* box-shadow: 0 1px 5px rgb(0, 0, 0, 0.2); */
}

.el-input.is-disabled /deep/ .el-input__inner {
  color: #000000 !important;
}
</style>
