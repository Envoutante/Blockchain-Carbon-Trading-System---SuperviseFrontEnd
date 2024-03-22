<template>
  <div class="dashboard-container" style="background-color: #f7f9fe">
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
        <el-form label-width="0">
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
                  <template slot="formatter">
                    {{ headData.latestBlock }}
                  </template>
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
                  <template slot="formatter">
                    {{ headData.txCount }}
                  </template>
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
                  <template slot="formatter">
                    {{ headData.peerCount }}
                  </template>
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
                  <template slot="formatter">
                    {{ headData.chaincodeCount }}
                  </template>
                </el-statistic>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 数据列表 -->
    <div style="margin-top: 20px">
      <el-row type="flex" justify="center">
        <el-col :span="11">
          <el-card>
            <el-table :data="peerStatus" stripe border style="width: 100%">
              <el-table-column
                prop="requests"
                label="对等节点名"
                align="center"
              />
              <el-table-column
                prop="status"
                label="状态"
                width="200px"
                align="center"
                ><template slot-scope="scope">
                  <a-tag v-if="scope.row.status === 'UP'" color="green"
                    >在线</a-tag
                  >
                  <a-tag v-else color="red">离线</a-tag>
                </template></el-table-column
              ></el-table
            >
          </el-card>

          <router-link :to="'/platform/blocks'">
            <el-card
              style="margin: 20px 0; height: 520px"
              class="scrollable-div"
              ><el-timeline
                v-for="(item, index) in transactionList.slice(0, 4)"
                :key="index"
              >
                <el-timeline-item
                  :timestamp="
                    dayjs(item.createdt).format(
                      'YYYY[年]-MM[月]-DD[日] HH:mm:ss'
                    )
                  "
                  placement="top"
                >
                  <div
                    style="
                      height: 50px;
                      background-color: #1890ff;
                      display: flex;
                      align-items: center;
                      padding-left: 20px;
                    "
                  >
                    <span
                      style="
                        color: #ffffff;
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 50px;
                      "
                      >交易{{ index + 1 }}</span
                    >
                  </div>
                  <el-card>
                    <p>链码名称：{{ item.chaincodename }}</p>
                    <p>通道名称：{{ item.channelname }}</p>
                    <p>创建者名称：{{ item.creator_msp_id }}</p>
                    <p>
                      哈希值：
                      <a-tooltip>
                        <template #title>{{ item.txhash }}</template>
                        <el-link type="primary" :underline="false">{{
                          item.txhash | ellipsis
                        }}</el-link>
                      </a-tooltip>
                    </p>
                    <p>类型：{{ item.type }}</p>
                  </el-card>
                </el-timeline-item></el-timeline
              >
            </el-card>
          </router-link>
        </el-col>

        <el-col :span="12" style="margin-left: 20px">
          <el-card>
            <div
              id="main"
              style="width: 100%; height: 400px; background: #fff"
            ></div>
          </el-card>

          <router-link :to="'/email'">
            <el-card style="margin: 20px 0; height: 325px">
              <div
                style="font-size: 16px; font-weight: 600; margin-bottom: 10px"
              >
                邮件系统服务
              </div>
              <dv-scroll-board
                :config="emailConfig"
                style="width: 100%; height: 250px"
              />
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import * as echarts from "echarts";
import dashboardAPI from "@/api/dashboard";

export default {
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length >= 10) {
        return value.slice(0, 15) + "...";
      }
      return value;
    },
  },

  data() {
    return {
      userName: "",
      headData: {
        latestBlock: 0,
        txCount: 0,
        peerCount: 0,
        chaincodeCount: 0,
      },
      peerStatus: [],
      blocksData: {},
      blocksLine: [],
      transactionList: {},

      EmailDetailparam: {},
      EmailDetailList: [],
      emailConfig: {
        header: ["收信企业", "收信邮箱", "发信状态"],
        data: [],
        index: true,
        columnWidth: [50],
        align: ["center"],
        headerBGC: "#1890ff",
      },
    };
  },

  mounted() {
    this.getShowData();
  },

  created() {
    this.fetchData();
    this.platformLogin();
    this.getEmailDetail();
  },

  methods: {
    fetchData() {
      this.userName = Cookies.get("userName");
    },

    platformLogin() {
      let url = "/auth/login";
      let urlType = "POST";
      let postBody = {
        user: "exploreradmin",
        password: "exploreradminpw",
        network: "org1-network",
      };
      dashboardAPI.turnToPost(url, urlType, postBody).then((response) => {
        localStorage.setItem("platformToken", response.token);
        this.getCurChannel();
      });
    },

    getCurChannel() {
      let url = "/api/curChannel";
      let urlType = "GET";
      let token = localStorage.getItem("platformToken");
      dashboardAPI.turnToGet(url, urlType, token).then((response) => {
        localStorage.setItem("currentChannel", response.currentChannel);
        this.getHeadData();
        this.getPeerStatus();
        this.getBlocksByHour();
        this.getTransactionList();
      });
    },

    getHeadData() {
      let currentChannel = localStorage.getItem("currentChannel");
      let url = "/api/status/" + currentChannel;
      let urlType = "GET";
      let token = localStorage.getItem("platformToken");
      dashboardAPI.turnToGet(url, urlType, token).then((response) => {
        this.headData.latestBlock = response.latestBlock;
        this.headData.txCount = response.txCount;
        this.headData.peerCount = response.peerCount;
        this.headData.chaincodeCount = response.chaincodeCount;
      });
    },

    getPeerStatus() {
      let currentChannel = localStorage.getItem("currentChannel");
      let url = "/api/peersStatus/" + currentChannel;
      let urlType = "GET";
      let token = localStorage.getItem("platformToken");
      dashboardAPI.turnToGet(url, urlType, token).then((response) => {
        this.peerStatus = response.peers;
      });
    },

    getBlocksByHour() {
      let currentChannel = localStorage.getItem("currentChannel");
      let url = "/api/blocksByHour/" + currentChannel + "/1";
      let urlType = "GET";
      let token = localStorage.getItem("platformToken");
      dashboardAPI.turnToGet(url, urlType, token).then((response) => {
        this.blocksData = response.rows;
        for (let i = 0; i < this.blocksData.length; i++) {
          const date = new Date(this.blocksData[i].datetime);
          let arr = new Array();
          // arr.push(date.getHours());
          arr.push(i); // 数据按顺序排列而非按时间排列
          arr.push(parseInt(this.blocksData[i].count));
          this.blocksLine.push(arr);
        }
        // 画图
        // this.$nextTick(() => {
        //   this.drawLine("main");
        // });
        setTimeout(() => {
          this.drawLine("main");
        }, 500);
      });
    },

    getTransactionList() {
      let currentChannel = localStorage.getItem("currentChannel");
      let url =
        "/api/txList/" +
        currentChannel +
        "/0/0?from=Mon%20Aug%2028%202023%2015:04:43%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&to=Fri%20Sep%2005%202025%2015:04:43%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&page=1&size=10";
      let urlType = "GET";
      let token = localStorage.getItem("platformToken");
      dashboardAPI.turnToGet(url, urlType, token).then((response) => {
        this.transactionList = response.rows.txnsData;
      });
    },

    // 获取邮件信息
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
          1 +
          "&count=" +
          10,
        method: "get", //注意是GET请求
        contentType: "application/json",
      }).then((res) => {
        this.EmailDetailList = res.data.rows;

        // 画轮播表格
        this.getShowData();
        // 更新轮播表格
        this.emailConfig = { ...this.emailConfig };
      });
    },

    getShowData() {
      let showData = new Array();
      this.EmailDetailList.forEach((item) => {
        // let id = item.id;
        // let created_at = dayjs(item.created_at).format("YYYY/MM/DD HH:mm:ss");

        let status = item.result == 1 ? "发信成功" : "发信失败";
        let template_params = JSON.parse(item.template_params);
        let newItem = [
          template_params.to_enterpriseName,
          template_params.to_email,
          status,
        ];
        showData.push(newItem);
      });
      this.emailConfig.data = showData;
    },

    drawLine(id) {
      var currentTime = new Date();
      // 计算横坐标显示的时间范围，这里设置为近9个小时
      var hoursToShow = 24;

      // 生成横坐标的时间点
      var xAxisData = [];
      for (var i = 1; i <= hoursToShow; ++i) {
        // 格式化时间，例如：17:00
        var formattedTime;
        if (currentTime.getHours() < 10) {
          formattedTime = currentTime.getHours() - (hoursToShow - i);
          if (formattedTime < 0) {
            formattedTime += 24;
            "0" + formattedTime;
          }
        } else {
          formattedTime = currentTime.getHours() - (hoursToShow - i);
          if (formattedTime < 0) {
            formattedTime += 24;
          }
        }

        formattedTime += ":00";
        xAxisData.push(formattedTime);
      }

      this.charts = echarts.init(document.getElementById(id));

      this.charts.setOption({
        title: {
          left: "3%",
          top: "5%",
          text: "最近一天区块数量", // 标题文本，支持使用 \n 换行。
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          align: "right", // 文字在前图标在后
          left: "3%",
          top: "15%",
          data: ["区块个数"], // 要和后面对应上
        },
        grid: {
          top: "30%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },

        toolbox: {
          feature: {
            saveAsImage: {}, // 保存为图片
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true, // 保证刻度线和标签对齐
          },
          splitLine: {
            show: true, // 显示网格线
          },
          data: xAxisData, // x坐标的名称
          axisLabel: {
            formatter: function (value, index) {
              return index % 2 == 0 ? value : "";
            },
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: true,
        },

        series: [
          {
            name: "区块个数",
            type: "line", // 折线图line;柱形图bar;饼图pie
            stack: "总量",
            data: this.blocksLine,
            areaStyle: {
              // 显示区域颜色---渐变效果
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(255,200,213)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffffff", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            itemStyle: {
              color: "rgb(255,96,64)", // 改变折线点的颜色
              lineStyle: {
                color: "rgb(255,96,64)", // 改变折线颜色
              },
            },
          },
        ],
      });
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

.el-timeline /deep/ .el-timeline-item:last-child .el-timeline-item__tail {
  display: block !important;
}

.el-timeline /deep/ .el-timeline-item__tail {
  border-left: 2px solid #1890ff !important;
}

.el-timeline-item /deep/ .el-timeline-item__node {
  background-color: #1890ff !important;
}

.el-table /deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.el-table /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
  display: none;
}

.el-table /deep/ .el-table__body-wrapper table {
  width: 100%;
}
</style>

<style>
.scrollable-div {
  overflow: auto;
}

.scrollable-div::-webkit-scrollbar {
  display: none;
}

.el-table__header,
.el-table__body,
.el-table__footer {
  width: 100% !important;
}

.el-table__header colgroup col[name="gutter"] {
  width: 0px !important;
}
</style>
