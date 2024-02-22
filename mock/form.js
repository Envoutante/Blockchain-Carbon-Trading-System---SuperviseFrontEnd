const Mock = require("mockjs");

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
      companyType: () => Mock.Random.pick(companyTypes),
      carbonQuota: "@integer(100, 900)",
    },
  ],
});

module.exports = [
  {
    url: "/vue-admin-template/form",
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
