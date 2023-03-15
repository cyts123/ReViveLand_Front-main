<template>
  <div>
    <div>{{ msg }}</div>
    <div id="main" class="charts"></div>
    <el-button>我是按钮</el-button>
    <p><router-link to="/second">第二个页面</router-link></p>
  </div>
</template>

<script>
export default {
  name: "First",
  data() {
    return {
      msg: "This is the first vue component."
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      // 初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};
</script>

<style>
.charts {
  width: 100vw;
  height: 50vh;
}
</style>
