<template>
  <div>
    <!-- 其他页面内容 -->
    <div v-if="companyType === '1'">
      <Company1 />
    </div>
    <div v-else-if="companyType === '2'">
      <Company2 />
    </div>
    <div v-else-if="companyType === '3'">
      <Company3 />
    </div>
    <!-- 其他页面内容 -->
  </div>
</template>

<script>
// 引入其他模块文件
import Company1 from "./company1.vue";
import Company2 from "./company2.vue";
import Company3 from "./company3.vue";

export default {
  components: {
    Company1,
    Company2,
    Company3,
  },
  data() {
    return {
      companyType: "",
      companyData: {},
    };
  },
  created() {
    // 在页面创建时获取路由参数
    this.companyType = this.$route.params.companyType;
  },
};
</script>
