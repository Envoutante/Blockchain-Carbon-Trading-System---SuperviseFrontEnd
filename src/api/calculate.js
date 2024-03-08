import request from "@/utils/request";

export default {
  getReportList() {
    return request({
      url: "/caculate/reportList",
      method: "get",
    });
  },

  // 测试失败，类型不匹配
  // 权限不够
  taskPublish(token, taskYear, taskBeginTime, taskEndTime, taskDescription) {
    return request({
      url: "/calculate/taskPublish",
      method: "post",
      data: {
        token: token,
        taskYear: taskYear,
        taskBeginTime: taskBeginTime,
        taskEndTime: taskEndTime,
        taskDescription: taskDescription,
      },
    });
  },

  getReport(taskYear, enterpriseID) {
    return request({
      url: "/public/enterpriseReport",
      method: "post",
      data: {
        taskYear: taskYear,
        enterpriseID: enterpriseID,
      },
    });
  },

  // 新增
  submitAuditResult(token, enterpriseID, auditStatus, auditOpinion, taskYear) {
    return request({
      url: "/calculate/verifyReport",
      method: "post",
      data: {
        token: token,
        enterpriseID: enterpriseID,
        auditStatus: auditStatus,
        auditOpinion: auditOpinion,
        taskYear: taskYear,
      },
    });
  },
};
