import request from "@/utils/request";

export default {
  getBindDetail(token, enterpriseID) {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/audit/enterpriseBindDetail",
      method: "post",
      params: {
        token: "12334252535345",
        enterpriseID: "12313213",
      },
    });
  },

  getBindList() {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/audit/enterpriseBindList",
      method: "get",
    });
  },

  getUserList() {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/audit/userList",
      method: "get",
    });
  },

  submitAuditResult(token, enterpriseIDList, auditStatus, auditOpinion) {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/audit/verifyEnterprise",
      method: "post",
      params: {
        token: token,
        enterpriseIDList: enterpriseIDList,
        auditStatus: auditStatus,
        auditOpinion: auditOpinion,
      },
    });
  },
};
