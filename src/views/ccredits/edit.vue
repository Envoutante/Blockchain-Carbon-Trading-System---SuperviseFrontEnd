<template>
  <div class="app-container">
    <div class="content-container">
      <el-form label-width="200px" style="margin-top: 20px" id="input"
        ><el-row>
          <el-col :span="10">
            <el-form-item label="统一设置碳配额：">
              <el-input
                style="width: 200px; float: left"
                v-model="emission"
              ></el-input>
            </el-form-item>
          </el-col> </el-row
      ></el-form>

      <a-divider />

      <!-- 循环data中定义的数组 -->
      <div v-for="(item, index) in enterpriseIDList" :key="index">
        <el-form label-width="200px" id="input" style="margin-top: 20px">
          <el-form-item :label="'企业 ' + (index + 1) + ' 组织机构代码：'">
            <el-input
              style="width: 200px; float: left"
              v-model="item.enterpriseID"
            ></el-input>
            <div style="float: left">
              <el-link
                @click="addForm"
                type="primary"
                size="small"
                icon="el-icon-circle-plus-outline"
                style="margin-left: 20px"
                :underline="false"
                >添加</el-link
              >
              <el-link
                v-if="enterpriseIDList.length > 1"
                @click="removeIdx(item, index)"
                type="danger"
                size="small"
                icon="el-icon-remove-outline"
                style="margin-left: 20px"
                :underline="false"
                >删除</el-link
              >
            </div>
          </el-form-item>
        </el-form>
      </div>

      <a-divider style="margin-top: 50px" />

      <!-- 操作按钮 -->
      <div style="display: flex; justify-content: center; margin-top: 30px">
        <router-link :to="'/ccredits/list'">
          <el-button size="small">返回</el-button></router-link
        >

        <el-button
          @click="submitForm"
          style="margin-left: 20px"
          type="primary"
          size="small"
          >提交</el-button
        >
        <!-- <el-button @click="addForm" type="primary" size="small">添加</el-button>
        <el-button
          v-if="enterpriseIDList.length > 1"
          @click="removeIdx(item, index)"
          type="danger"
          size="small"
          >删除</el-button
        > -->
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
      emission: "1000",
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
}

.el-input.is-disabled /deep/ .el-input__inner {
  color: #000000 !important;
}

*/deep/.el-input-group__append {
  border-left: 0;
  width: 90px;
  height: 40px;
  padding: 0;
  font-size: 0;
}

#input /deep/.el-input__inner {
  border-radius: 0px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 2px;
  height: 25px;
  padding: 0px 10px;
  border-bottom-color: rgba(24, 144, 255, 1);
  background-color: transparent !important;
}
</style>
