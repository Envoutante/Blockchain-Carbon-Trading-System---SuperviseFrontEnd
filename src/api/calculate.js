import request from "@/utils/request";

export default {
  getReportList() {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/caculate/reportList",
      method: "get",
    });
  },

  taskPublish(token, taskYear, taskBeginTime, taskEndTime, taskDescription) {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/calculate/taskPublish",
      method: "post",
      params: {
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
      url: "https://mock.apifox.com/m1/2214773-0-default/public/enterpriseReport",
      method: "post",
      params: {
        taskYear: taskYear,
        enterpriseID: enterpriseID,
      },
    });
  },

  submitAuditResult(taskYear, enterpriseID) {
    return request({
      url: "https://mock.apifox.com/m1/2214773-0-default/public/enterpriseReport",
      method: "post",
      params: {
        taskYear: taskYear,
        enterpriseID: enterpriseID,
      },
    });
  },
};
