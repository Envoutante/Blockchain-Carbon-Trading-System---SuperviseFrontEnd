import request from "@/utils/request";

export default {
  getEmissionList() {
    return request({
      url: "/setting/emissionList",
      method: "get",
    });
  },

  // 添加碳配额
  addEmission(token, enterpriseIDList, emission) {
    return request({
      url: "/setting/emissionSet",
      method: "post",
      data: {
        token: token,
        enterpriseIDList: enterpriseIDList,
        emission: emission,
      },
    });
  },

  // 修改碳配额
  updateEmission(token, enterpriseID, num) {
    return request({
      url: "/public/coCoinRecharge",
      method: "post",
      data: {
        token: token,
        enterpriseID: enterpriseID,
        num: num,
      },
    });
  },

  // 批量修改碳配额
  batchEditEmission(token, enterpriseIDList, coCoin) {
    return request({
      url: "/setting/coCoinSet",
      method: "post",
      data: {
        token: token,
        enterpriseIDList: enterpriseIDList,
        coCoin: coCoin,
      },
    });
  },
};
