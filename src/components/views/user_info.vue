<template>
  <div class="userInfoBox">
    <div class="topBox">
      <div class="infoOutterBox">
        <div class="userAvatar">
          <el-avatar :size="80">{{
            getUserName ? userName : "未知用户"
          }}</el-avatar>
        </div>
        <div class="gameInfo">
          <p>&emsp;&emsp;&emsp;树：{{ getUserName ? treeNum : "null" }}</p>
          <p>&emsp;&emsp;动物：{{ getUserName ? animalNum : "null" }}</p>
          <p>&emsp;树积分：{{ getUserName ? treeScore : "null" }}</p>
          <p>动物积分：{{ getUserName ? animalScore : "null" }}</p>
        </div>
      </div>
    </div>
    <div class="bottomBox">
      <div class="chartsBox">
        <div id="walkingDistChart" class="charts"></div>
        <div id="exerciseTimeChart" class="charts"></div>
        <div id="sleepingTimeChart" class="charts"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "This is user_info.vue",
      getUserName: false,
      userName: "admin",
      treeNum: "",
      animalNum: "",
      treeScore: "",
      animalScore: "",
      walkingDistChartOptions: {
        title: {
          text: "walking Distance"
        },
        tooltip: {},
        legend: {
          data: ["distances"],
          right: "5%",
          top: "5%"
        },
        xAxis: {
          data: ["02-08", "02-09", "02-10", "02-11", "02-12", "02-13", "02-14"]
        },
        yAxis: {},
        series: [
          {
            name: "distances",
            type: "bar",
            data: [2.08, 2.09, 3.22, 7.88, 7.87, 10.28],
            label: {
              show: true,
              position: "top",
              textStyle: {
                fontSize: 10
              }
            }
          }
        ]
      },
      exerciseTimeChartOptions: {
        title: {
          text: "Exercise Time"
        },
        tooltip: {},
        legend: {
          data: ["walking", "running", "breath exercise"],
          orient: "vertical",
          right: "2%",
          top: "1%"
        },
        xAxis: {
          data: ["02-08", "02-09", "02-10", "02-11", "02-12", "02-13", "02-14"]
        },
        yAxis: {},
        series: [
          {
            name: "walking",
            type: "line",
            data: [49, 24, 33, 50, 47, 48],
            label: {
              show: true,
              position: "bottom",
              textStyle: {
                fontSize: 10
              }
            }
          },
          {
            name: "running",
            type: "line",
            data: [5, 4, 0, 10, 7, 8],
            label: {
              show: true,
              position: "bottom",
              textStyle: {
                fontSize: 10
              }
            }
          },
          {
            name: "breath exercise",
            type: "line",
            data: [3, 0, 6, 0, 3, 6],
            label: {
              show: true,
              position: "top",
              textStyle: {
                fontSize: 10
              }
            }
          }
        ]
      },
      sleepingTimeChartOptions: {
        title: {
          text: "Sleeping Time"
        },
        tooltip: {
          valueFormatter: value => {
            var hour = Math.floor(value / 60);
            var minute = value % 60;
            return hour + "h " + minute + "min";
          }
        },
        legend: {
          data: ["time"],
          right: "5%",
          top: "5%"
        },
        xAxis: {
          data: ["02-08", "02-09", "02-10", "02-11", "02-12", "02-13", "02-14"]
        },
        yAxis: {},
        series: [
          {
            name: "time",
            type: "bar",
            data: [360, 420, 480, 420, 360, 300],
            label: {
              show: true,
              position: "top",
              textStyle: {
                fontSize: 10
              }
            }
          }
        ]
      }
    };
  },
  methods: {},
  mounted() {
    //1. 发送携带uuid的请求，返回用户名和数据
    //2. 如果成功返回，则初始化图表init并设置对应的Options

    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.9)"
    });
    setTimeout(() => {
      loading.close();
    }, 2000);

    if (this.$store.state.uuid != "") {
      let that = this;

      this.$http
        .post(this.$store.state.serverAddr + "/userInfo", {
          uuid: that.$store.state.uuid
        })
        .then(response => {
          if (response.data.result === "success") {
            that.userName = response.data.userName;
            that.treeNum = response.data.treeNum;
            that.animalNum = response.data.animalNum;
            that.treeScore = response.data.treeScore;
            that.animalScore = response.data.animalScore;
            that.getUserName = true;

            //设返回体中
            //记录时间的参数为 dateData
            that.walkingDistChartOptions.xAxis.data = response.data.dateData;
            that.exerciseTimeChartOptions.xAxis.data = response.data.dateData;
            that.sleepingTimeChartOptions.xAxis.data = response.data.dateData;
            //记录步行距离的数据为 distData
            that.walkingDistChartOptions.series[0].data =
              response.data.distData;
            //记录步行时间 跑步时间 呼吸训练时间 的数据 为 walkingTime runningTime breathExTime
            that.exerciseTimeChartOptions.series[0].data =
              response.data.walkingTime;
            that.exerciseTimeChartOptions.series[1].data =
              response.data.runningTime;
            that.exerciseTimeChartOptions.series[2].data =
              response.data.breathExTime;
            //记录睡眠时间的数据为 sleepingTime
            that.sleepingTimeChartOptions.series[0].data =
              response.data.sleepingTime;

            var distChar = this.$echarts.init(
              document.getElementById("walkingDistChart")
            );
            var exTimeChart = this.$echarts.init(
              document.getElementById("exerciseTimeChart")
            );
            var sleepTimeChart = this.$echarts.init(
              document.getElementById("sleepingTimeChart")
            );

            distChar.setOption(this.walkingDistChartOptions);
            exTimeChart.setOption(this.exerciseTimeChartOptions);
            sleepTimeChart.setOption(this.sleepingTimeChartOptions);
          } else {
            this.$message.error(
              "系统错误，请联系管理员(" + response.data.info + ")"
            );
          }
        })
        .catch(response => {
          this.$message.error("系统错误，请联系管理员(90076)");
        });
    } else {
      this.$message({
        message: "登录已经过期，请重新登录",
        type: "warning"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userInfoBox {
  height: 90%;
  width: 100%;
}

.topBox {
  height: 15%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.infoOutterBox {
  display: flex;
  flex-direction: row;
}
.userAvatar {
  display: flex;
  align-items: center;
}
.gameInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.bottomBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chartsBox {
  width: 60vw;
}
.charts {
  height: 40vh;
  width: 60vw;
  margin: 5vh 0;
}
</style>
