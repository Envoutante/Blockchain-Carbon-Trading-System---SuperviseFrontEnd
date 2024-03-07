import request from "@/utils/request";

export default {
  getEmissionList() {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/setting/emissionList",
      method: "get",
    });
  },

  addEmission(token, enterpriseIDList, emission) {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/setting/emissionSet",
      method: "post",
      params: {
        token: token,
        enterpriseIDList: enterpriseIDList,
        emission: emission,
      },
    });
  },
};
