<template>
  <!-- table -->
  <div>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      bordered
      :scroll="{ x: 'max-content', y: 400 }"
    >
      <template slot="index" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template slot="footer">
        <div
          style="
            display: flex;
            justify-content: right;
            align-items: center;
            width: 100%;
            text-align: right;
          "
        >
          <div style="font-weight: bold; padding-right: 30px">
            本模块汇总碳排量:
          </div>
          <a-statistic
            title=""
            :precision="4"
            :value="classdata.classDataSum"
            :valueStyle="{ color: '#1098ad' }"
          >
            <template #suffix>
              <span style="font-size: 12px; color: #adb5bd; padding-left: 20px"
                >tCO₂</span
              >
            </template>
          </a-statistic>
        </div>
      </template>
      <template slot="emissionName" slot-scope="text, record">
        {{ record.className }}
      </template>
      <template slot="sum" slot-scope="text, record">
        <span style="font-weight: bold">{{ record.classDataSum }}</span>
      </template>

      <template v-for="col in colkey" :slot="col" slot-scope="text, record">
        <div :key="col">
          <template v-if="record[col.split('_')[0]].length == 0">
            <div>/</div>
          </template>
          <template v-if="record[col.split('_')[0]].length != 0">
            <div>
              <span>{{
                record[col.split("_")[0]][parseInt(col.split("_")[1]) - 1]
                  .dataUnit == "%"
                  ? record[col.split("_")[0]][parseInt(col.split("_")[1]) - 1]
                      .dataNum * 100
                  : record[col.split("_")[0]][parseInt(col.split("_")[1]) - 1]
                      .dataNum
              }}</span>
              <span
                style="font-size: 8px"
                v-if="
                  tableSetOptionsChecked.includes('ShowUnit') ||
                  record[col.split('_')[0]][parseInt(col.split('_')[1]) - 1]
                    .dataUnit == '%'
                "
              >
                {{
                  record[col.split("_")[0]][parseInt(col.split("_")[1]) - 1]
                    .dataUnit
                }}</span
              >
              <br />
              <div
                style="font-size: 8.5px; color: #adb5bd"
                v-if="
                  tableSetOptionsChecked.includes('ShowDataSource') &&
                  lang.includes('zh')
                "
              >
                ({{
                  infoSubmitTableDataSourceClass_CN[
                    record[col.split("_")[0]][parseInt(col.split("_")[1]) - 1]
                      .dataSource
                  ]
                }})
              </div>
              <div
                style="font-size: 8.5px; color: #adb5bd"
                v-else-if="
                  tableSetOptionsChecked.includes('ShowDataSource') &&
                  lang.includes('en')
                "
              >
                ({{
                  infoSubmitTableDataSourceClass_EN[
                    record[col.split("_")[0]][parseInt(col.split("_")[1]) - 1]
                      .dataSource
                  ]
                }})
              </div>
              <div
                style="font-size: 8.5px"
                v-show="!tableSetOptionsChecked.includes('ShowDataSource')"
              >
                &nbsp;
              </div>
            </div>
          </template>
        </div>
        <!-- <a-input
          :key="col"
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          :placeholder="columns[i].title"
          @change="(e) => handleChange(e.target.value, record.key, col)"
        /> -->
      </template>

      <template slot="action" slot-scope="text, record">
        <div style="text-align: center">
          <a @click="detailRow(record)">查看详情</a>
        </div>
      </template>
    </a-table>
    <a-button
      style="width: 100%; margin-top: 16px; margin-bottom: 8px"
      type="dashed"
      icon="plus"
      @click="newRow()"
      v-if="
        (classdata.canAdd == null ? true : classdata.canAdd) &&
        submitType != 'detail'
      "
      >新增项目</a-button
    >
    <emissionSubmitFormModal
      ref="emissionSubmitFormModal"
      @dataUpdateFinish="dataUpdateFinish"
    ></emissionSubmitFormModal>
  </div>
</template>

<script>
import { ConstructColumns } from "@/views/calculate/emissionSubmitCompnent/parserTable.js";
import emissionSubmitFormModal from "@/views/calculate/emissionSubmitCompnent/emissionSubmitFormModal.vue";

import { Table, Button, Tooltip, Popconfirm, Popover } from "ant-design-vue";

import {
  infoSubmitTableDataSourceClass_CN,
  infoSubmitTableDataSourceClass_EN,
} from "@/views/calculate/emissionSubmitCompnent/infoSubmitTableDataSourceClass.js";

export default {
  name: "emissionSubmitTable",
  components: {
    emissionSubmitFormModal,
    "a-table": Table,
    "a-button": Button,
    "a-tooltip": Tooltip,
    "a-popconfirm": Popconfirm,
    "a-popover": Popover,
    // ... 其他 Ant Design Vue 组件
  },
  props: {
    classdata: {
      type: Object,
      default: () => {},
    },
    tableSetOptionsChecked: {
      type: Array,
      default: () => ["ShowUnit", "ShowDataSource"],
    },
    tableIdx: {
      type: Number,
      default: 0,
    },
    submitType: {
      type: String,
      default: "create",
    },
  },
  data() {
    return {
      // table
      columns: [], // 用于存储列的配置
      colkey: [], // 用于存储列的key
      // dataSource: null, // 用于存储数据源
      // dataTemplate: null, // 用于存储数据模板
      tableData: [
        {
          emissionName: "ranmei",
          activityFactor_1: 100.1,
          activityFactor_2: 100.1,
          EmissionFactor_1: 100.1,
          EmissionFactor_2: 100.2,
          sum: 100,
        },
      ],

      infoSubmitTableDataSourceClass_CN: infoSubmitTableDataSourceClass_CN,
      infoSubmitTableDataSourceClass_EN: infoSubmitTableDataSourceClass_EN,
    };
  },
  computed: {
    lang() {
      return "zh-CN";
    },
  },
  mounted() {
    this.initTable();
  },
  methods: {
    initTable(useSource = false, source = {}) {
      if (!useSource) {
        this.tableData = this.classdata.children;
      } else {
        this.tableData = source.children;
        this.classdata = source;
      }
      this.columns = ConstructColumns(this.tableData).Columns;
      this.colkey = ConstructColumns(this.tableData).ColKey;
      // console.log(this.colkey, this.columns)
      this.$forceUpdate();
      setInterval(() => {
        // console.log('update')
        this.$forceUpdate();
      }, 1000);
    },
    reconstructClassData(tableData = this.tableData) {
      this.classdata.children = tableData;
      this.$emit("dataUpdate", this.tableIdx, this.classdata);
    },

    // 操作
    removeRow(record) {
      // 从表格中删除数据
      const newtableData = this.tableData.filter(
        (item) => item.classSort !== record.classSort
      );
      // 对tableData重新进行classSort的排序，从1开始
      newtableData.forEach((item, index) => {
        item.classSort = index + 1;
      });
      // console.log(newtableData)
      this.tableData = newtableData;
      this.$message.success("删除成功");
      this.reConcludeClassTotal();
      this.reconstructClassData();
    },
    // editRow(record) {
    //   // console.log(record)
    //   this.$refs.emissionSubmitFormModal.open("edit", record);
    // },
    detailRow(record) {
      this.$refs.emissionSubmitFormModal.open("detail", record);
    },
    newRow() {
      let New_Template = JSON.parse(
        JSON.stringify(this.tableData[this.tableData.length - 1])
      );

      // 计算New_template中的activityFactor和EmissionFactor中isConst==false的长度
      let activityFactor_NOCONST_LENGTH = 0;
      let EmissionFactor_NOCONST_LENGTH = 0;
      for (let i = 0; i < New_Template.activityFactor.length; i++) {
        if (!New_Template.activityFactor[i].isConst) {
          activityFactor_NOCONST_LENGTH++;
        }
      }
      for (let i = 0; i < New_Template.EmissionFactor.length; i++) {
        if (!New_Template.EmissionFactor[i].isConst) {
          EmissionFactor_NOCONST_LENGTH++;
        }
      }

      // 新的模板className需要自己填，其他实际上是保持不变的，可填写字段全部置为0.00即可
      New_Template.className = "";
      New_Template.classSort = this.tableData.length + 1;
      New_Template.classDataSum = 0;
      New_Template.activityFactorNum = 0;
      // console.log(New_Template.activityFactor.length)
      if (activityFactor_NOCONST_LENGTH == 1) {
        for (let i = 0; i < New_Template.activityFactor.length; i++) {
          if (!New_Template.activityFactor[i].isConst) {
            New_Template.activityFactor[i].dataNum = 0.0;
            New_Template.activityFactor[i].dataName = "";
            New_Template.activityFactor[i].dataUnit = "";
            if (New_Template.activityFactor[i].defaultVal.length == 0) {
              New_Template.activityFactor[i].dataSource = "MEASURE";
              New_Template.activityFactor[i].defaultValChooseIdx = -1;
            } else {
              New_Template.activityFactor[i].dataSource = "DEFAULT";
              New_Template.activityFactor[i].defaultValChooseIdx = 0;
            }
          }
        }
      } else {
        for (let i = 0; i < New_Template.activityFactor.length; i++) {
          if (!New_Template.activityFactor[i].isConst) {
            New_Template.activityFactor[i].dataNum = 0.0;
            if (New_Template.activityFactor[i].defaultVal.length == 0) {
              New_Template.activityFactor[i].dataSource = "MEASURE";
              New_Template.activityFactor[i].defaultValChooseIdx = -1;
            } else {
              New_Template.activityFactor[i].dataSource = "DEFAULT";
              New_Template.activityFactor[i].defaultValChooseIdx = 0;
            }
          }
        }
      }

      New_Template.EmissionFactorNum = 0;
      if (EmissionFactor_NOCONST_LENGTH == 1) {
        for (let i = 0; i < New_Template.EmissionFactor.length; i++) {
          if (!New_Template.EmissionFactor[i].isConst) {
            New_Template.EmissionFactor[i].dataNum = 0.0;
            New_Template.EmissionFactor[i].dataName = "";
            New_Template.EmissionFactor[i].dataUnit = "";
            if (New_Template.EmissionFactor[i].defaultVal.length == 0) {
              New_Template.EmissionFactor[i].dataSource = "MEASURE";
              New_Template.EmissionFactor[i].defaultValChooseIdx = -1;
            } else {
              New_Template.EmissionFactor[i].dataSource = "DEFAULT";
              New_Template.EmissionFactor[i].defaultValChooseIdx = 0;
            }
          }
        }
      } else {
        for (let i = 0; i < New_Template.EmissionFactor.length; i++) {
          if (!New_Template.EmissionFactor[i].isConst) {
            New_Template.EmissionFactor[i].dataNum = 0.0;
            if (New_Template.EmissionFactor[i].defaultVal.length == 0) {
              New_Template.EmissionFactor[i].dataSource = "MEASURE";
              New_Template.EmissionFactor[i].defaultValChooseIdx = -1;
            } else {
              New_Template.EmissionFactor[i].dataSource = "DEFAULT";
              New_Template.EmissionFactor[i].defaultValChooseIdx = 0;
            }
          }
        }
      }

      // this.$refs.emissionSubmitFormModal.open(
      //   "add",
      //   New_Template,
      //   activityFactor_NOCONST_LENGTH == 1,
      //   EmissionFactor_NOCONST_LENGTH == 1
      // );
    },

    /**
     *
     * @param {*} data
     * 信息计算
     */
    // 子组件传回信息(信息计算)
    dataUpdateFinish(TYEP, data) {
      if (TYEP == "edit") {
        console.log("111", data);
        this.tableData[data.classSort - 1] = data;
        this.$forceUpdate();
      } else {
        this.tableData.push(data);
        this.$forceUpdate();
      }
      this.reConcludeClassTotal();
    },
    reConcludeClassTotal() {
      let sum = 0;
      this.tableData.forEach((item) => {
        sum += parseFloat(item.classDataSum);
      });
      this.classdata.classDataSum = parseFloat(sum.toFixed(6));
      this.$emit("dataUpdate", this.tableIdx, this.classdata);
      this.$forceUpdate();
    },

    // // OLD
    // newMember() {
    //   const length = this.data.length
    //   this.data.push({
    //     key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
    //     name: '',
    //     workId: '',
    //     department: '',
    //     editable: true,
    //     isNew: true,
    //   })
    // },

    // saveRow(record) {
    //   this.memberLoading = true
    //   const { key, name, workId, department } = record
    //   if (!name || !workId || !department) {
    //     this.memberLoading = false
    //     this.$message.error('请填写完整成员信息。')
    //     return
    //   }
    //   // 模拟网络请求、卡顿 800ms
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve({ loop: false })
    //     }, 800)
    //   }).then(() => {
    //     const target = this.data.find((item) => item.key === key)
    //     target.editable = false
    //     target.isNew = false
    //     this.memberLoading = false
    //   })
    // },
    // toggle(key) {
    //   const target = this.data.find((item) => item.key === key)
    //   target._originalData = { ...target }
    //   target.editable = !target.editable
    // },
    // getRowByKey(key, newData) {
    //   const data = this.data
    //   return (newData || data).find((item) => item.key === key)
    // },
    // cancel(key) {
    //   const target = this.data.find((item) => item.key === key)
    //   Object.keys(target).forEach((key) => {
    //     target[key] = target._originalData[key]
    //   })
    //   target._originalData = undefined
    // },
    // handleChange(value, key, column) {
    //   const newData = [...this.data]
    //   const target = newData.find((item) => key === item.key)
    //   if (target) {
    //     target[column] = value
    //     this.data = newData
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
/deep/.ant-table-body {
  &::-webkit-scrollbar {
    //整体样式
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    //滑动滑块条样式
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    // background: #eff1f7;
  }
  &::-webkit-scrollbar-track {
    //轨道的样式
    -webkit-box-shadow: 0;
    border-radius: 0;
    background: #f6f8ff;
  }
}

/deep/ .ant-table-footer {
  background: white;
}

.ant-table-row-cell-break-word {
  text-align: center;
}
</style>
