<template></template>

<script>
import axios from "axios";
import auditAPI from "@/api/audit";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      enterpriseID: "",
      taskYear: "",
      Emaildata: {},
    };
  },

  methods: {
    // 从父组件获取基本信息
    getInfo(enterpriseID, taskYear) {
      this.enterpriseID = enterpriseID;
      this.taskYear = taskYear;
      this.getEmailData();
    },

    getEmailData() {
      this.$parent.loadStatus(true);
      this.axios({
        url: "https://mock.apifox.com/m1/2214773-0-default/getEmailData", // 写死，可以直接复制粘贴此网址查看请求结果
        method: "get",
        contentType: "application/json",
      }).then((res) => {
        this.Emaildata = res.data.data;
        this.updateInfo();
      });
    },

    updateInfo() {
      if (this.Emaildata.user_id == "") {
        this.$message({
          message: "抱歉，暂时无法发送邮件，请稍后再试！",
          type: "warning",
        });
        this.$parent.loadStatus(false);
      } else {
        // 替换为收件人信息
        let token = Cookies.get("token");
        auditAPI.getBindDetail(token, this.enterpriseID).then((response) => {
          this.Emaildata.template_params.to_enterpriseName =
            response.data.enterpriseName;
          this.Emaildata.template_params.to_taskYear = this.taskYear.toString();
          // this.Emaildata.template_params.to_email =
          //   response.data.enterpriseResponsibleEmail;
          this.Emaildata.template_params.to_email = "1294352318@qq.com";
          console.log(this.Emaildata);

          // 发送邮件
          this.sendEmail();
        });
      }
      // this.$parent.loadStatus(false);
      // this.$parent.resetRow();
    },

    sendEmail() {
      this.axios({
        url: "https://api.emailjs.com/api/v1.0/email/send",
        method: "post",
        data: this.Emaildata, // Emaildata的内容将在后续告诉。
        contentType: "application/json",
      })
        .then((res) => {
          // 弹出发送成功的提示
          // res内无内容
          this.$message({
            message: "邮件发送成功！",
            type: "success",
          });
          this.$parent.loadStatus(false);
          this.$parent.resetRow();
        })
        .catch(() => {
          // 弹出发送失败的提示
          this.$message({
            message: "邮件发送失败，请重试！",
            type: "error",
          });
          this.$parent.loadStatus(false);
          this.$parent.resetRow();
        });
    },
  },
};
</script>
