<template>
  <div class="box-container">
    <dv-active-ring-chart
      :config="ring"
      style="float: left; width: 200px; height: 200px"
    />
    <dv-active-ring-chart
      :config="ring"
      style="float: left; width: 200px; height: 200px"
    />
    <dv-active-ring-chart
      :config="ring"
      style="float: left; width: 200px; height: 200px"
    />
    <dv-capsule-chart :config="capsule" style="width: 300px; height: 200px" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ring: {
        data: [
          {
            name: "东北",
            value: 55,
          },
          {
            name: "西北",
            value: 120,
          },
          {
            name: "西南",
            value: 78,
          },
          {
            name: "东南",
            value: 66,
          },
          {
            name: "华北",
            value: 80,
          },
        ],
        lineWidth: 10,
        digitalFlopStyle: {
          fontSize: 20,
        },
      },
      capsule: {
        data: [
          {
            name: "风能",
            value: 167,
          },
          {
            name: "太阳能",
            value: 123,
          },
          {
            name: "水电",
            value: 98,
          },
          {
            name: "生物质发电",
            value: 75,
          },
          {
            name: "沼气发电",
            value: 66,
          },
          {
            name: "其它",
            value: 30,
          },
        ],
        colors: [
          "#e062ae",
          "#fb7293",
          "#e690d1",
          "#32c5e9",
          "#96bfff",
          "#ffdb5c",
        ],
        unit: "单位",
        showValue: true,
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
