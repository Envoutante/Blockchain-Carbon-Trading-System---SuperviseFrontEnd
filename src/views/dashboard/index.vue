<template>
  <div class="dashboard-container">
    <dv-border-box-13 style="padding: 20px">
      <el-row :gutter="0">
        <el-col :span="8">
          <dv-decoration-8 style="width: 300px; height: 50px; float: left"
        /></el-col>
        <el-col :span="8">
          <dv-decoration-5 style="width: 300px; height: 40px; margin: auto"
        /></el-col>
        <el-col :span="8">
          <dv-decoration-8
            :reverse="true"
            style="width: 300px; height: 50px; float: right"
        /></el-col>
      </el-row>

      <!-- 其他页面内容 -->
      <el-row>
        <box1 />
      </el-row>
      <el-row>
        <box2 />
      </el-row>
      <el-row>
        <box3 />
      </el-row>
      <!-- 其他页面内容 -->
    </dv-border-box-13>
  </div>
</template>

<script>
// 引入其他模块文件
import box1 from "./box1.vue";
import box2 from "./box2.vue";
import box3 from "./box3.vue";

export default {
  components: {
    box1,
    box2,
    box3,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    background-color: #282c34;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
