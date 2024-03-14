import request from "@/utils/request";

export default {
  // 后台没填数据，测不了
  getBindDetail(token, enterpriseID) {
    return request({
      url: "/audit/enterpriseBindDetail",
      method: "post",
      data: {
        token: token,
        enterpriseID: enterpriseID,
      },
    });
  },

  getBindList() {
    return request({
      url: "/audit/enterpriseBindList",
      method: "get",
    });
  },

  getUserList() {
    return request({
      url: "/audit/userList",
      method: "get",
    });
  },

  // 未测试，账户权限不够
  submitAuditResult(token, enterpriseIDList, auditStatus, auditOpinion) {
    return request({
      url: "/audit/verifyEnterprise",
      method: "post",
      data: {
        token: token,
        enterpriseIDList: enterpriseIDList,
        auditStatus: auditStatus,
        auditOpinion: auditOpinion,
      },
    });
  },

  updateUserType(token, userID, userType) {
    return request({
      url: "/audit/changeUserType",
      method: "post",
      data: {
        token: token,
        userID: userID,
        userType: userType,
      },
    });
  },
};
