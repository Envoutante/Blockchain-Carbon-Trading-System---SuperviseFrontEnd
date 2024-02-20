const Mock = require("mockjs");

// 定义可能的类型数组
const companyTypes = [
  "电网企业",
  "化工生产企业",
  "电解铝生产企业",
  "镁冶炼企业",
  "平板玻璃生产企业",
  "水泥生产企业",
  "陶瓷生产企业",
  "民航企业",
  "钢铁生产企业",
  "发电企业",
];

const data = Mock.mock({
  "items|30": [
    {
      "id|+1": 1,
      title: Mock.Random.ctitle(5, 10) + "公司",
      companyType: () => Mock.Random.pick(companyTypes), // 使用 Mock.js 随机选择类型
      "count|0-100": 0,
      status: Mock.Random.pick(["尚未审核", "通过审核", "未通过审核"]),
      displayTime: "@datetime",
      pageviews: "@integer(300, 5000)",
    },
  ],
});

module.exports = [
  {
    url: "/vue-admin-template/table/list",
    type: "get",
    response: (config) => {
      const items = data.items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items,
        },
      };
    },
  },
];
