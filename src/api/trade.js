import request from "@/utils/request";

export default {
  getTradeList(token) {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/public/tradeList",
      method: "post",
      params: {
        token: token,
      },
    });
  },

  getOrder(orderID) {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/public/order",
      method: "post",
      params: {
        orderID: orderID,
      },
    });
  },
};
