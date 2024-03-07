<template>
  <div class="app-container">
    <el-alert
      v-if="taskBeginTime != null"
      title="温馨提示"
      type="success"
      :description="'您当前选择的开始日期是：' + taskBeginTime"
      :closable="false"
    />
    <el-alert
      v-else
      title="温馨提示"
      type="error"
      description="您尚未选择开始日期"
      :closable="false"
    />
    <el-calendar v-model="value" @select="handleSelect"
      ><div slot="dateCell" slot-scope="{ data }" @click="handleSelect(data)">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(1).join("-") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
        <div
          v-if="data.isSelected ? 'is-selected' : ''"
          style="text-align: center; margin-top: 30px"
        >
          <a @click="taskFormVisible = true">点击确认</a>
        </div>
      </div></el-calendar
    >

    <!-- 发布填报任务对话框 -->
    <el-dialog title="发布填报任务" :visible.sync="taskFormVisible" center>
      <el-form style="align: center">
        <el-form-item
          label="设置填报时间"
          :label-width="formLabelWidth"
          required
        >
          <el-row type="flex">
            <el-col :span="8">
              <el-date-picker
                type="datetime"
                v-model="taskBeginTime"
                style="width: 100%"
                :picker-options="startDateOptions"
                format="yyyy-MM-dd"
                disabled
              ></el-date-picker>
            </el-col>
            <el-col :span="2" align="center">-</el-col>
            <el-col :span="8">
              <el-date-picker
                type="datetime"
                placeholder="选择结束日期"
                v-model="taskEndTime"
                style="width: 100%"
                :picker-options="endDateOptions"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          label="填写任务详情"
          :label-width="formLabelWidth"
          required
        >
          <el-row type="flex">
            <el-col :span="18">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="taskDescription"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="taskFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="taskPublish">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import calculateAPI from "@/api/calculate";

export default {
  data() {
    return {
      value: new Date(),
      formLabelWidth: "150px",
      taskFormVisible: false,
      taskYear: "",
      taskBeginTime: "",
      taskEndTime: "",
      taskDescription: "",
      startDateOptions: {
        disabledDate: (time) => {
          return (
            time.getTime() < Date.now() ||
            time.getTime() >= new Date(this.taskEndTime).getTime() ||
            time.getTime() >
              new Date().setFullYear(new Date().getFullYear() + 1, 0, 0)
          );
        },
      },
      endDateOptions: {
        disabledDate: (time) => {
          return (
            time.getTime() < Date.now() ||
            time.getTime() <= new Date(this.taskBeginTime).getTime() ||
            time.getTime() >
              new Date().setFullYear(new Date().getFullYear() + 1, 0, 0)
          );
        },
      },
    };
  },

  methods: {
    handleSelect(data) {
      this.taskBeginTime = data.day;
      console.log(this.taskBeginTime);
    },

    taskPublish() {
      let token = "123";
      this.taskYear = new Date().getFullYear();
      let beginTime = dayjs(this.taskBeginTime).valueOf();
      let endTime = dayjs(this.taskEndTime).valueOf();
      calculateAPI
        .taskPublish(
          token,
          this.taskYear,
          beginTime / 1000,
          endTime / 1000,
          this.taskDescription
        )
        .then((response) => {
          this.$message({
            message: response.message,
            type: "success",
          });
          this.taskFormVisible = false;
          console.log(beginTime / 1000);
        });
    },
  },
};
</script>

<style>
.is-selected {
  color: #1989fa;
}
</style>
