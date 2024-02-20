const Mock = require("mockjs");

const data = Mock.mock({
  "items|10": [
    {
      "idF|+1": 1,
      equipCapF: "@integer(300, 500)",
      actualRecAmtF: "@integer(300, 500)",
      "idR|+1": 1,
      equipCapR: "@integer(300, 500)",
      actualRecAmtR: "@integer(300, 500)",
    },
  ],
});

module.exports = [
  {
    url: "/vue-admin-template/company2",
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
