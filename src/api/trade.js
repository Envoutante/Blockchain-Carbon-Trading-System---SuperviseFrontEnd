import request from "@/utils/request";

export default {
  getTradeList(token) {
    return request({
      url: "/public/tradeList",
      method: "post",
      data: {
        token: token,
      },
    });
  },

  // 后端填的null，测不了
  getOrder(orderID) {
    return request({
      url: "/public/order",
      method: "post",
      data: {
        orderID: orderID,
      },
    });
  },
};
