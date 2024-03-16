<template>
  <div style="padding: 20px; background-color: #ffffff">
    <div style="font-size: 20px; margin-bottom: 10px">🔍关联交易查询</div>

    <div style="height: 750px" class="scrollable-div">
      <el-descriptions
        v-for="(order, index) in this.orderList"
        :key="index"
        v-loading="listLoading"
        class="margin-top"
        :column="2"
        border
        style="margin-top: 10px"
      >
        <el-descriptions-item :span="2">
          <template slot="label">
            <i class="el-icon-document"></i>
            交易编号 </template
          ><el-link
            @click="openDialog(order.orderID)"
            type="primary"
            :underline="false"
            style="margin-left: 10px"
          >
            {{ order.orderID }}</el-link
          >
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            乙方
          </template>
          {{ order.purchaseName }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            甲方
          </template>
          {{ order.publishName }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-shopping-cart-1"></i>
            交易类型
          </template>
          {{
            order.tradeType === "SOLD"
              ? "收购碳排量"
              : order.tradeType === "SALE"
              ? "出售碳排量"
              : ""
          }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-coin"></i>
            交易量
          </template>
          {{ order.dealNum }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            时间戳
          </template>
          {{
            dayjs(parseInt(order.orderTime) * 1000).format(
              "YYYY[年]-MM[月]-DD[日] HH:mm:ss"
            )
          }}
        </el-descriptions-item>
      </el-descriptions>

      <div
        style="
          height: 700px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <el-empty v-if="!orderID.length" description="暂无相关交易" />
      </div>
    </div>

    <!-- 对话框：交易事务日志 -->
    <sonDialog ref="son" />

    <div style="display: flex; justify-content: center; margin-top: 20px">
      <el-button type="primary" size="small" @click="back"
        >返回上一级</el-button
      >
    </div>
  </div>
</template>

<script>
import tradeAPI from "@/api/trade";
import sonDialog from "@/views/platform/dialog.vue";

export default {
  components: { sonDialog },

  data() {
    return {
      listLoading: true,
      orderID: [],
      orderList: [],
    };
  },

  created() {
    this.getOrderID();
    this.getOrderList();
  },

  methods: {
    getOrderID() {
      // this.orderID = this.$route.params.orderID;
      this.orderID = this.$route.query.orderID;
      console.log("打印" + this.orderID);
    },

    getOrderList() {
      this.listLoading = true;
      for (let i = 0; i < this.orderID.length; i++) {
        let order = this.orderID[i];
        tradeAPI.getOrder(order).then((response) => {
          this.orderList.push(response.data.orderListEnterprise[0]);
        });
      }
      this.listLoading = false;
    },

    openDialog(orderID) {
      this.$refs.son.open(orderID);
    },

    back() {
      this.$router.push("/trade/list");
    },
  },
};
</script>

<style>
.scrollable-div {
  overflow: auto;
}

.scrollable-div::-webkit-scrollbar {
  display: none;
}
</style>
