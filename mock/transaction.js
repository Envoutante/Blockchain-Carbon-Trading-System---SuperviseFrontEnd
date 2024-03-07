const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      "id|+1": 1,
      title: Mock.Random.ctitle(5, 10) + "公司",
      objectType: () => Mock.Random.pick("CCER"), // 使用 Mock.js 随机选择类型
      transactionType: () => Mock.Random.pick("出售碳指标", "收购碳指标"), // 使用 Mock.js 随机选择类型
      "count|0-100": 0,
      status: Mock.Random.pick(["等待接洽", "交易中", "交易成功", "交易失败"]),
      displayTime: "@datetime",
      pageviews: "@integer(300, 5000)",
    },
  ],
});

module.exports = [
  {
    url: "/vue-admin-template/transaction",
    type: "get",
    response: (config) => {
      const items = data.items;
      return {
        code: 200,
        data: {
          total: items.length,
          items: items,
        },
      };
    },
  },
];
