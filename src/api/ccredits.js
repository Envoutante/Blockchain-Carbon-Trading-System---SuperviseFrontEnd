import request from "@/utils/request";

export default {
  getEmissionList() {
    return request({
      url: "/setting/emissionList",
      method: "get",
    });
  },

  // 添加碳配额
  addEmission(token, enterpriseID, emission) {
    return request({
      url: "/setting/emissionSet",
      method: "post",
      data: {
        token: token,
        enterpriseID: enterpriseID,
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
};
