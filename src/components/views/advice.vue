<template>
  <div class="adviceOuterBox">
    <div class="header">
      <h1 v-if="getUserName && exerciseStatus === '' && sleepStatus === ''">
        {{
          userName
        }}，当前并没有分析出您最近的状态，请多多上传您的健康数据到ReViveLand吧！
      </h1>
      <h1
        v-else-if="
          getUserName && exerciseStatus === 'ENOUGH' && sleepStatus === 'ENOUGH'
        "
      >
        {{ userName }}，最近的生活状态很不错哦~有空来ReViveLand玩！
      </h1>
      <h1
        v-else-if="
          getUserName && exerciseStatus === 'ENOUGH' && sleepStatus === 'LACK'
        "
      >
        {{ userName }}，最近的睡眠并不是很好呢。是太累了吗？下面有一些建议：
      </h1>
      <h1
        v-else-if="
          getUserName && exerciseStatus === 'LACK' && sleepStatus === 'ENOUGH'
        "
      >
        {{ userName }}，最近缺乏锻炼哦，身体是革命的本钱！下面提供了一些建议：
      </h1>
      <h1
        v-else-if="
          getUserName && exerciseStatus === 'LACK' && sleepStatus === 'LACK'
        "
      >
        {{ userName }}，最近遇到什么烦心事了吗？ReViveLand为您提供了以下建议:
      </h1>
      <h1 v-else>
        哎呀，出错了，果然管理员的代码水平还是不够呀，请联系管理员处理。
      </h1>
    </div>

    <div class="tipsOutterBox">
      <div class="tipsInnerBox">
        <div
          class="cardsOutterBox"
          v-for="(advice, index) in advices"
          :key="index"
        >
          <el-card class="cards" v-html="advice.info" shadow="hover"> </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "This is advice.vue",
      exerciseStatus: "",
      sleepStatus: "",
      userName: "",
      getUserName: false,
      advices: [
        {
          info: "每一个不曾起舞的日子，都是对生命的辜负。\n——尼采"
        },
        {
          info: "生活最佳状态是冷冷清清地风风火火。\n——木心"
        },
        {
          info:
            "在我年轻的时候，曾以为金钱是世界上最重要的东西。现在我老了，才知道的确如此。\n——王尔德"
        },
        {
          info:
            "保持身体健康的唯一办法，就是吃点你不想吃的，喝点你不想喝的，以及做点你不愿做的事情。\n——马克·吐温"
        },
        {
          info: "像深海中的鱼族，若不自燃，便只有漆黑一片。"
        },
        {
          info: "我拥向宇宙吹来的风 与夏夜相逢 是八月盛景 是清寂长生"
        },
        {
          info:
            "并不可否认，生活磨掉了我们一部分的勇气和温柔，但我也相信，因为我们还很年轻，所以失去的还会长出来，而新的部分将闪闪发亮。"
        },
        {
          info:
            "正能量不是没心没肺，不是强颜欢笑，不是弄脏别人来显得干净。而是泪流满面怀抱的善良，是孤身一人前进的信仰，是破碎以后重建的勇气。"
        },
        {
          info: "没有那么多天赋异禀，优秀的人总是努力翻山越岭."
        },
        {
          info:
            "熬得住就出众，熬不住就出局，只有咬牙死犟，才能乘风破浪。我才不要弯道超车，我要甩的他们连尾灯都看不见。"
        },
        {
          info:
            "要相信，所有的不美好都是为了迎接美好，所有的困难都会为努力让道。 \n—简蔓《巧克力色微凉青春》"
        },
        {
          info: "大路走尽还有数不尽的小路，只要不停地走就有数不尽的风光。"
        }
      ]
    };
  },
  methods: {
    shuffleSelf(array, size) {
      var index = -1,
        length = array.length,
        lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
        // var rand = baseRandom(index, lastIndex),
        var rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
        var value = array[rand];

        array[rand] = array[index];

        array[index] = value;
      }
      array.length = size;
      return array;
    }
  },
  mounted() {
    //在页面被渲染的时候，发送携带uuid的请求，"/advice"
    //如果成功响应，修改getUserName的值
    //返回字符串类型变量userName
    //返回用户的运动状态和睡眠状态
    //返回对象数组advices

    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.9)"
    });
    setTimeout(() => {
      loading.close();
    }, 2000);

    let that = this;

    this.$http
      .post(this.$store.state.serverAddr + "/advice", {
        uuid: this.$store.state.uuid
      })
      .then(function(response) {
        // console.log(response);
        if (response.data.result === "success") {
          that.userName = response.data.userName;
          that.exerciseStatus = response.data.exerciseStatus;
          that.sleepStatus = response.data.sleepStatus;
          that.advices = response.data.advices;
          that.getUserName = true;
        } else if (response.data.result === "fail") {
          that.$message({
            message: "登陆已失效，请重新登录",
            type: "warning"
          });
        } else {
          that.$message.error("系统错误，请联系管理员(330002)");
        }
      })
      .catch(function(error) {
        // console.log(error);
        that.$message.error("系统错误，请联系管理员(340002)");
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adviceOuterBox {
  height: 90vh;
}
.header {
  height: 10%;
  line-height: 9vh;
  display: flex;
  align-content: center;
  justify-content: center;
}

.tipsOutterBox {
  width: 100%;
}
.tipsInnerBox {
  margin-left: 15%;
  margin-right: 15%;
  padding: 0 3%;
  width: 60%;
}
.cardsOutterBox {
  margin: 3vh 0;
}
.cards {
  padding: 1vh 2%;
  border-radius: 10px;
}
</style>
