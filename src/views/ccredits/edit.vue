<template>
  <div class="app-container">
    <router-link :to="'/ccredits/list'">
      <el-button type="primary" size="small" style="margin: 0 0 20px 0"
        >返回</el-button
      >
    </router-link>
    <div class="content-container">
      <!-- 循环data中定义的数组 -->
      <div v-for="(item, index) in enterpriseIDList" :key="index">
        <span style="font-size: 18px; color: #1890ff; font-weight: 600"
          >企业 {{ index + 1 }}</span
        >

        <el-form
          label-width="200px"
          class="form-table"
          style="margin-top: 20px"
        >
          <el-row>
            <el-col :span="10">
              <el-form-item label="企业组织机构代码：">
                <el-input v-model="item.enterpriseID"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-form
        label-width="200px"
        class="form-table"
        style="
          margin-top: 20px;
          border-top: 2px solid #fafafa;
          padding-top: 30px;
        "
        ><el-row>
          <el-col :span="10">
            <el-form-item label="统一设置碳配额：">
              <el-input-number v-model="emission" :min="1" :max="10" />
            </el-form-item>
          </el-col> </el-row
      ></el-form>

      <!-- 操作按钮 -->
      <div>
        <el-button @click="submitForm" type="success" size="small"
          >提交</el-button
        >
        <el-button @click="addForm" type="primary" size="small">添加</el-button>
        <el-button
          v-if="enterpriseIDList.length > 1"
          @click="removeIdx(item, index)"
          type="danger"
          size="small"
          >删除</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import ccreditsAPI from "@/api/ccredits";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      // 表单绑定数据
      enterpriseIDList: [
        {
          enterpriseID: "",
        },
      ],
      emission: "",
    };
  },
  methods: {
    // 提交操作
    submitForm() {
      let statusType = true;
      this.enterpriseIDList.forEach((item) => {
        if (item.enterpriseID == "") {
          statusType = false;
        }
      });
      if (this.emission == "") {
        statusType = false;
      }
      if (!statusType) {
        this.$message({
          message: "请完善信息后再提交",
          type: "error",
        });
      }
      if (statusType) {
        let token = Cookies.get("token");
        for (var i = 0; i < this.enterpriseIDList.length; i++) {
          var enterpriseID = this.enterpriseIDList[i];
          ccreditsAPI
            .addEmission(token, enterpriseID, this.emission)
            .then((response) => {
              this.$message({
                message: response.message,
                type: "success",
              });
            });
        }
        // ccreditsAPI
        //   .addEmission(token, this.enterpriseIDList, this.emission)
        //   .then((response) => {
        //     this.$message({
        //       message: response.message,
        //       type: "success",
        //     });
        //   });
      }
      console.log(this.enterpriseIDList);
    },
    // 添加操作
    addForm() {
      // 定义一个标识，通过标识判断是否能添加信息
      let statusType = true;
      this.enterpriseIDList.forEach((item) => {
        if (item.enterpriseID == "") {
          this.$message({
            message: "请完善信息后再添加",
            type: "warning",
          });
          statusType = false;
        }
      });
      if (statusType) {
        this.enterpriseIDList.push({
          enterpriseID: "",
        });
      }
      console.log(this.enterpriseIDList);
    },
    // 删除操作
    removeIdx(item, index) {
      this.enterpriseIDList.splice(index, 1);
      this.$message({
        message: "删除成功",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.addFormBox {
  margin: 20px;
}
.formOuterBox {
  margin-bottom: 20px;
  padding: 30px 40px;
  background: white;
  border-radius: 30px;
}
h3 {
  margin: 0px 0px 20px 0px;
}
.content-container {
  background-color: #ffffff !important;
  padding: 20px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgb(0, 0, 0, 0.2);
}

.el-input.is-disabled /deep/ .el-input__inner {
  color: #000000 !important;
}
</style>
