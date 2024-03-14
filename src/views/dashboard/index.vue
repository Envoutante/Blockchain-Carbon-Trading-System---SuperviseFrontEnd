<template>
  <div class="dashboard-container">
    <!-- 用户欢迎 -->
    <div style="height: 150px; background-color: #134089; padding: 20px">
      <div style="float: left; margin-left: 20px">
        <el-avatar
          :size="80"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </div>
      <div
        style="
          padding: 10px 0;
          float: left;
          margin-left: 30px;
          display: flex;
          align-items: center;
          color: #ffffff;
          font-size: 20px;
        "
      >
        <el-form ref="form" :model="form" label-width="0">
          <el-form-item>
            <span style="font-size: 25px">欢迎回来！{{ userName }}</span>
          </el-form-item>
          <el-form-item>
            <span>碧空如洗，绿意盎然，我们承诺碳中和，绘就地球生态画卷。</span>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 平台统计展览板 -->
    <div>
      <el-card>
        <el-row>
          <el-col :span="6">
            <div
              style="
                display: flex;
                align-items: flex-end;
                justify-content: center;
              "
            >
              <div style="float: left">
                <img
                  src="@/assets/icon_images/icon1.png"
                  style="width: 30px; margin-right: 20px"
                />
              </div>
              <div>
                <el-statistic title="区块数量">
                  <template slot="formatter"> {{ blocks }} </template>
                </el-statistic>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div
              style="
                display: flex;
                align-items: flex-end;
                justify-content: center;
              "
            >
              <div style="float: left">
                <img
                  src="@/assets/icon_images/icon2.png"
                  style="width: 30px; margin-right: 20px"
                />
              </div>
              <div>
                <el-statistic title="交易数量">
                  <template slot="formatter"> {{ transactions }} </template>
                </el-statistic>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div
              style="
                display: flex;
                align-items: flex-end;
                justify-content: center;
              "
            >
              <div style="float: left">
                <img
                  src="@/assets/icon_images/icon3.png"
                  style="width: 30px; margin-right: 20px"
                />
              </div>
              <div>
                <el-statistic title="节点数量">
                  <template slot="formatter"> {{ nodes }} </template>
                </el-statistic>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div
              style="
                display: flex;
                align-items: flex-end;
                justify-content: center;
              "
            >
              <div style="float: left">
                <img
                  src="@/assets/icon_images/icon4.png"
                  style="width: 30px; margin-right: 20px"
                />
              </div>
              <div>
                <el-statistic title="链码数量">
                  <template slot="formatter"> {{ chaincodes }} </template>
                </el-statistic>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <div style="padding: 10px 10px">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-card :body-style="{ padding: '0px' }">
            <img src="@/assets/news.png" style="width: 100%" />
            <div
              style="
                height: 40px;
                display: flex;
                align-items: center;
                padding-left: 10px;
              "
            >
              <el-link
                type="primary"
                :underline="false"
                href="https://zfxxgk.ndrc.gov.cn/web/iteminfo.jsp?id=1776"
                >点击查看详情</el-link
              >
            </div>
          </el-card>
        </el-col>

        <el-col :span="12" style="margin-left: 20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>核算方法与报告指南</span>
            </div>
            <div v-for="(rule, index) in calculateRule" :key="index">
              <el-link
                type="primary"
                :underline="false"
                href=""
                style="color: #909399"
                >{{ index + 1 + ". " + rule.text }}</el-link
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      userName: "",
      blocks: 70,
      transactions: 70,
      nodes: 4,
      chaincodes: 1,
      calculateRule: [
        {
          text: "《中国发电企业温室气体排放核算方法与报告指南（试行）》",
          href: "#link1",
        },
        {
          text: "《中国电网企业温室气体排放核算方法与报告指南（试行）》",
          href: "#link1",
        },
        {
          text: "《中国钢铁生产企业温室气体排放核算方法与报告指南（试行）》",
          href: "#link1",
        },
        {
          text: "《中国化工生产企业温室气体排放核算方法与报告指南（试行）》",
          href: "#link1",
        },
        {
          text: "《中国电解铝生产企业温室气体排放核算方法与报告指南（试行）》",
          href: "#link1",
        },
        {
          text: "《中国镁冶炼企业温室气体排放核算方法与报告指南（试行）》",
          href: "#link1",
        },
        {
          text: "《中国平板玻璃生产企业温室气体排放核算方法与报告指南（试行）》",
          href: "#link1",
        },
        {
          text: "《中国水泥生产企业温室气体排放核算方法与报告指南（试行）》",
          href: "#link1",
        },
        {
          text: "《中国陶瓷生产企业温室气体排放核算方法与报告指南（试行）》",
          href: "#link1",
        },
        {
          text: "《中国民航企业温室气体排放核算方法与报告格式指南（试行）》",
          href: "#link1",
        },
      ],
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.userName = Cookies.get("userName");
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    background-color: #ffffff;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<style scoped>
.el-form-item /deep/ .el-form-item__content {
  line-height: 20px !important;
}
</style>
