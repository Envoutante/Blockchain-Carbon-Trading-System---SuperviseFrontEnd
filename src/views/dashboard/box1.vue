<template>
  <div class="box-container">
    <el-row>
      <el-col :span="6"
        ><dv-water-level-pond
          :config="config"
          style="width: 150px; height: 200px; margin: auto"
      /></el-col>
      <el-col :span="6"
        ><dv-water-level-pond
          :config="config"
          style="width: 150px; height: 200px; margin: auto"
      /></el-col>
      <el-col :span="6"
        ><dv-water-level-pond
          :config="config"
          style="width: 150px; height: 200px; margin: auto"
      /></el-col>
      <el-col :span="6"
        ><dv-water-level-pond
          :config="config"
          style="width: 150px; height: 200px; margin: auto"
      /></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        data: [66],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  &-container {
    margin: 5px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
