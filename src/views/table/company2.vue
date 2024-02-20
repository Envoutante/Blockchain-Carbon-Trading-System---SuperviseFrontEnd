<template>
  <div style="margin: 10px 20px 20px 20px">
    <el-tabs v-model="activeName" @tab-click="fetchData">
      <!-- 第一个选项卡 -->
      <el-tab-pane label="附表 1" name="first">
        <span>报告主体二氧化碳排放量报告 </span>
        <el-table
          :data="table1Data"
          border
          style="width: 100%; margin: 20px 0 0 0"
        >
          <el-table-column prop="project" label="项目">
            <!-- 渲染数学单位 -->
            <template slot-scope="{ row }">
              <span>{{ row.project }} </span>
              <span style="display: inline-block">
                <vue-mathjax :formula="mathjax"></vue-mathjax>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="carbon" label="二氧化碳排放量">
            <template slot-scope="{ row }">
              <span>{{ row.carbon }} </span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 第二个选项卡 -->
      <el-tab-pane label="附表 2" name="second"
        ><span>报告主体活动水平数据</span>
        <!-- 附表2第一个表 -->
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          style="width: 100%; margin: 20px 0 0 0"
        >
          <el-table-column label="六氟化硫回收">
            <el-table-column label="修理设备" align="center">
              <template slot-scope="scope">
                {{ scope.row.idF }}
              </template>
            </el-table-column>
            <el-table-column label="设备容量（千克）" align="center">
              <template slot-scope="scope">
                {{ scope.row.equipCapF }}
              </template>
            </el-table-column>
            <el-table-column label="实际回收量（千克）" align="center">
              <template slot-scope="scope">
                {{ scope.row.actualRecAmtF }}
              </template>
            </el-table-column>
            <el-table-column label="退役设备" align="center">
              <template slot-scope="scope">
                {{ scope.row.idR }}
              </template>
            </el-table-column>
            <el-table-column label="设备容量（千克）" align="center">
              <template slot-scope="scope">
                {{ scope.row.equipCapR }}
              </template>
            </el-table-column>
            <el-table-column label="实际回收量（千克）" align="center">
              <template slot-scope="scope">
                {{ scope.row.actualRecAmtR }}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

        <!-- 附表2第二个表 -->
        <el-table
          :data="table2Data"
          border
          style="width: 100%; margin: 20px 0 0 0"
        >
          <el-table-column label="输配电损失">
            <el-table-column prop="project" label="项目">
              <template slot-scope="{ row }">
                <span>{{ row.project }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="carbon" label="二氧化碳排放量">
              <template slot-scope="{ row }">
                <span>{{ row.carbon }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 第三个选项卡 -->
      <el-tab-pane label="附表 3" name="third"
        ><span>报告主体排放因子</span>
        <el-table
          :data="table3Data"
          border
          style="width: 100%; margin: 20px 0 0 0"
        >
          <el-table-column label="输配电损失" :span="2">
            <el-table-column prop="project" align="center"
              ><template slot-scope="{ row }">
                <span>{{ row.project }}</span>
              </template></el-table-column
            >
            <el-table-column prop="data" label="数据" align="center"
              ><template slot-scope="{ row }">
                <span>{{ row.data }}</span>
              </template></el-table-column
            >
            <el-table-column prop="unit" label="单位" align="center"
              ><template slot-scope="{ row }">
                <span>{{ row.unit }}</span>
              </template></el-table-column
            >
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
import { getList } from "@/api/company2";

export default {
  components: {
    "vue-mathjax": VueMathjax,
    jsCdn: {
      render(_) {
        return _("script", {
          attrs: {
            type: "text/javascript",
            src: this.cdn,
          },
        });
      },
      props: {
        cdn: {
          type: String,
          required: true,
        },
      },
    },
  },

  data() {
    return {
      activeName: "first",
      table1Data: [
        {
          project: "企业二氧化碳排放总量",
          carbon: "50",
        },
        {
          project: "使用六氟化硫设备修理与退役过程产生的排放",
          carbon: "20",
        },
        {
          project: "输配电引起的二氧化碳排放",
          carbon: "30",
        },
      ],
      mathjax: "$$\(tCO_2\)$$",
      list: null,
      listLoading: true,
      table2Data: [
        {
          project: "电厂上网电量（兆瓦时）",
          carbon: "50",
        },
        {
          project: "自外省输入电量（兆瓦时）",
          carbon: "25",
        },
        {
          project: "向外省输出电量（兆瓦时）",
          carbon: "39",
        },
        {
          project: "售电量（兆瓦时）",
          carbon: "40",
        },
        {
          project: "输配电量（兆瓦时）",
          carbon: "30",
        },
      ],
      table3Data: [{ project: "电力", data: 20, unit: "吨二氧化碳/兆瓦时" }],
    };
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
