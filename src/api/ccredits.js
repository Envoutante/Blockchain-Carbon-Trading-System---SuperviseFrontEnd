import request from "@/utils/request";

export default {
  getEmissionList() {
    return request({
      url: "/setting/emissionList",
      method: "get",
    });
  },

  // 测试失败，类型不匹配
  // 现在是权限不够了
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
};
