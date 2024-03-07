<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="back">返回</el-button>

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
          交易编号
        </template>
        {{ order.orderID }}
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
            ? "购买"
            : order.tradeType === "SALE"
            ? "出售"
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
        {{ dayjs(order.orderTime).format("YYYY[年]-MM[月]-DD[日] HH:mm:ss") }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import tradeAPI from "@/api/trade";
import dayjs from "dayjs";

export default {
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
      this.orderID = this.$route.params.orderID;
      console.log(this.orderID);
    },
    getOrderList() {
      this.listLoading = true;
      for (let i = 0; i < this.orderID.length; i++) {
        let order = this.orderID[i];
        tradeAPI.getOrder(order).then((response) => {
          this.orderList.push(response.data);
        });
      }
      this.listLoading = false;
    },
    back() {
      this.$router.push("/trade/list");
    },
  },
};
</script>
