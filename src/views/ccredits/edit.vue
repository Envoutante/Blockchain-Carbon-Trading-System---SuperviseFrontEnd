<template>
  <div style="400px">
    <div class="content-container">
      <!-- 循环data中定义的数组 -->
      <div v-for="(item, index) in enterpriseIDList" :key="index">
        <el-form label-width="200px" id="input">
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
    </div>

    <div class="footer" style="width: 50%; position: fixed; bottom: 30px">
      <a-divider style="margin-bottom: 50px" />

      <!-- 操作按钮 -->
      <el-form label-width="200px" style="margin-bottom: 100px" id="input">
        <el-form-item label="统一设置碳配额：">
          <el-input
            style="width: 200px; float: left"
            v-model="emission"
          ></el-input>
        </el-form-item>
      </el-form>

      <div style="position: fixed; bottom: 30px; right: 30px">
        <a-button @click="closeDrawer" type="danger">关闭</a-button>
        <a-button
          @click="submitForm"
          :loading="submitLoading"
          style="margin-left: 20px"
          type="primary"
          >提交</a-button
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
      emission: "1000",
      submitLoading: false,
    };
  },
  methods: {
    closeDrawer() {
      this.$parent.closeDrawer();
    },

    // 提交操作
    submitForm() {
      this.submitLoading = true;

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
        let enterpriseIDList = new Array();
        for (var i = 0; i < this.enterpriseIDList.length; i++) {
          enterpriseIDList.push(this.enterpriseIDList[i].enterpriseID);
        }
        ccreditsAPI
          .addEmission(token, enterpriseIDList, parseInt(this.emission))
          .then((response) => {
            this.$message({
              message: "添加碳配额成功！",
              type: "success",
            });
            this.submitLoading = false;
            this.closeDrawer();
            this.$parent.fetchData();
          });
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
  border-radius: 5px;
  margin-top: 20px;
}

.el-form-item /deep/ .el-form-item__label {
  font-weight: 500 !important;
  color: #72767b !important;
}
</style>
