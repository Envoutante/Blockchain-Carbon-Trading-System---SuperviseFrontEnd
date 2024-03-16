<template>
  <a-modal
    v-model="visible"
    :title="'🔍' + '区块链交易事务日志溯源'"
    :width="900"
    :dialog-style="{ top: '20px' }"
    closeable
    :footer="null"
    class="orderTrackTXID"
  >
    <div style="min-height: 300px">
      <a-result title="区块交易事务溯源中..." v-if="loadingData">
        <template #icon><a-icon type="loading" /> </template
      ></a-result>

      <div v-else style="padding: 10px 20px">
        <a-descriptions>
          <a-descriptions-item label="交易事务哈希" :span="3"
            ><span
              style="
                font-family: 'Consolas', Menlo, Courier, monospace;
                color: #134089;
              "
              >{{ txDetail.txhash }}</span
            >
          </a-descriptions-item>
          <a-descriptions-item label="有效载荷哈希" :span="3">
            <span
              style="
                font-family: 'Consolas', Menlo, Courier, monospace;
                color: #134089;
              "
            >
              {{ txDetail.payload_proposal_hash }}</span
            >
          </a-descriptions-item>
          <a-descriptions-item label="链码名">
            {{ txDetail.chaincodename }}
          </a-descriptions-item>
          <a-descriptions-item label="通道名"
            >{{ txDetail.channelname }}
          </a-descriptions-item>
          <a-descriptions-item label="交易事务时间"
            >{{ createdtPrase(txDetail.createdt) }}
          </a-descriptions-item>
          <a-descriptions-item label="MSP创建者代号">
            <a-tag color="purple">
              {{ txDetail.creator_msp_id }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="背书组织代号" :span="2">
            <span
              v-for="(item, index) in endorser_msp_id_tags(
                txDetail.endorser_msp_id
              )"
              :key="index"
            >
              <a-tag color="purple">
                {{ item }}
              </a-tag>
            </span>
          </a-descriptions-item>

          <a-descriptions-item label="交易事务类型" :span="2">
            背书交易
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span
                  >此交易事务已获得特定组织节点的背书，以确保其符合规定的有效性和安全性标准。
                </span>
              </template>
              <span
                style="
                  padding-bottom: 2px;
                  border-bottom: 1px dashed #495057;
                  cursor: pointer;
                "
                >ENDORSER_TRANSACTION</span
              >
            </a-tooltip>
          </a-descriptions-item>
          <a-descriptions-item label="验证状态">
            <a-tag
              color="#20c997"
              style="border-radius: 999px"
              v-if="lang.includes('zh')"
            >
              已验证 ( VALID )
            </a-tag>
            <a-tag color="#20c997" style="border-radius: 999px" v-else>
              Valid
            </a-tag>
          </a-descriptions-item>
        </a-descriptions>

        <div>
          <div style="font-weight: 600; color: black">
            <div
              style="
                width: 50px;
                height: 10px;
                background: #099268;
                display: inline-block;
              "
            ></div>
            读取操作流
          </div>
          <json-viewer
            :value="txDetail.read_set"
            :expand-depth="5"
            boxed
            sort
            :show-array-index="true"
            copyable
            theme="my-awesome-json-theme"
            :line-height="20"
          >
            <template slot="copy"> <a-icon type="copy"></a-icon>复制 </template>
          </json-viewer>
        </div>

        <div style="margin-top: 10px">
          <div style="font-weight: 600; color: black">
            <div
              style="
                width: 50px;
                height: 10px;
                background: #fa8c16;
                display: inline-block;
              "
            ></div>
            写入操作流
          </div>
          <json-viewer
            :value="txDetail.write_set"
            :expand-depth="5"
            boxed
            sort
            :show-array-index="true"
            copyable
            theme="my-awesome-json-theme"
            :line-height="20"
          >
            <template slot="copy"> <a-icon type="copy"></a-icon>复制 </template>
          </json-viewer>
        </div>
      </div>

      <div
        style="width: 100%; font-size: 14px; text-align: center; color: grey"
        v-if="!loadingData"
      >
        —— 碳 盟 链 道 ——
      </div>
    </div>
  </a-modal>
</template>

<script>
import { bElogin, bETransactionDetail, bEcurChannel } from "@/api/blockExplore";
import JsonViewer from "vue-json-viewer";
// import store from "@/store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default {
  data() {
    return {
      visible: false,
      orderID: "",
      bE: {
        bEtoken: "",
        bEcurrentChannel: "",
      },
      txDetail: null,
      loadingData: true,
    };
  },
  components: {
    JsonViewer,
  },

  computed: {
    lang() {
      return "zh-CN";
    },
  },

  methods: {
    createdtPrase(createdt) {
      dayjs.extend(utc);
      return dayjs.utc(createdt).local().format("YYYY-MM-DD HH:mm");
    },

    open(orderID) {
      console.log("打印：" + orderID);
      this.loadingData = true;
      this.visible = true;
      this.orderID = orderID;
      this.login();

      // setTimeout(() => {
      //   this.test()
      // }, 1000)
    },

    login() {
      bElogin().then((res) => {
        this.bE.bEtoken = res.token;
        bEcurChannel(this.bE.bEtoken).then((res) => {
          this.bE.bEcurrentChannel = res.currentChannel;
          this.fetchData();
        });
      });
    },

    fetchData() {
      bETransactionDetail(
        this.bE.bEcurrentChannel,
        this.orderID,
        this.bE.bEtoken
      ).then((res) => {
        this.txDetail = res.row;
        setTimeout(() => {
          this.loadingData = false;
        }, 700);
      });
    },

    endorser_msp_id_tags(endorser_msp_id) {
      let regex = /"([^"]*)"/g; // 正则表达式匹配引号内的内容

      let result2 = [];
      let match;
      while ((match = regex.exec(endorser_msp_id))) {
        result2.push(match[1]); // 将匹配到的内容添加到数组中
      }

      return result2;
    },
  },
};
</script>

<style scoped>
.ant-modal /deep/ .ant-modal-content {
  background-image: url("https://www.yunphant.com/static/media/home_banner.22da5480.jpg");
  background-color: #d0ebff;
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: 100% 100%;
}
.ant-modal /deep/ .ant-modal-header {
  background: #d0ebff no-repeat 50% / cover !important;
  /* 将图片左移动 */
  background-position: 10% 10% !important;
}
.ant-modal /deep/ .ant-modal-title {
  color: #134089;
  font-size: 20px;
}

.ant-modal /deep/ .ant-input {
  background: white !important;
  border: none;
  box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.95);
  border-radius: 10px;
}
.ant-modal /deep/ .ant-descriptions-item-label {
  font-weight: 600 !important;
}
</style>

<style lang="less">
// values are default one from jv-light template
.my-awesome-json-theme {
  // background: #fff;
  background: #292d3e;
  white-space: nowrap;
  color: white;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;
  box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.15);
  transition: all 0.2s ease-in-out;

  .jv-ellipsis {
    color: #eee;
    background-color: #434343;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button {
    color: #49b3ff;
  }
  .jv-key {
    color: white;
  }
  .jv-item {
    &.jv-array {
      color: #22b8cf;
    }
    &.jv-boolean {
      color: #fc1e70;
    }
    &.jv-function {
      color: #067bca;
    }
    &.jv-number {
      color: #fc1e70;
    }
    &.jv-number-float {
      color: #fc1e70;
    }
    &.jv-number-integer {
      color: #fc1e70;
    }
    &.jv-object {
      color: #fd7e14;
    }
    &.jv-undefined {
      color: #e08331;
    }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.15);
        // &:before {
        //   background: #292d3e;
        // }
      }
    }
  }
}

.jv-container .jv-more {
  display: none;
}

.jv-container .jv-code.boxed {
  overflow-y: scroll;
  max-height: 150px;
  box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.15);
}
</style>
