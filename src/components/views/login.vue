<template>
  <div class="outer_box">
    <!-- <video
      src="../../assets/ReViveLand.mp4"
      class="backgroundVedio"
      autoplay
      loop
      muted
    ></video> -->
    <div class="filterImg"></div>
    <div class="login_box">
      <h1><img src="../../assets/Island.png" alt="" /></h1>
      <p>
        <el-input
          v-model="userName"
          class="loginInput"
          type="text"
          placeholder="用户名"
        />
      </p>
      <p>
        <el-input
          v-model="password"
          class="loginInput"
          type="password"
          placeholder="登录密码"
        />
      </p>
      <button class="loginButton logIn_btn" @click="Login">登录</button>
      <!-- <div><span @click="register">立即注册</span><span>忘记密码</span></div> -->
      <!-- <div style="width: 30%;font-size: 10px;margin-left: 30px">
        <el-link style="font-size: 10px" @click="Register" type="primary"
          >注册</el-link
        >
      </div> -->
      <div style="width: 30%;font-size: 10px;margin-left: 30px">
        <router-link to="/Register">
          <span>注册</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      userName: "",
      password: "",
      responseInfo: null
    };
  },
  methods: {
    Login() {
      //**************************************************************//
      //用户点击登录按钮
      // 1. 检查输入
      //  1.1 输入不完整，给出提示，结束
      //  1.2 输入完整，传输数据给后端进行判断
      // 2. 根据后端返回数据进行响应操作
      //  2.1 返回 success ,弹出 Login success信息，并跳转到下一个页面
      //  2.2 返回 fail, 弹出 Login fail 信息

      if (this.userName === "" || this.password === "") {
        this.$notify({
          title: "输入用户名和密码",
          message: "用户名或密码为空，请输入",
          type: "warning"
        });
      } else {
        //交给后端判断
        //1. 创建Http对象
        if (window.XMLHttpRequest) {
          // code for IE7+, Firefox, Chrome, Opera, Safari
          var Http = new XMLHttpRequest();
        } else {
          // code for IE6, IE5
          var Http = new ActiveXObject("Microsoft.XMLHTTP");
        }

        //2. 指定请求的url地址和请求方式

        //2.1 Get 方式
        // const url =
        //   globalData.serverAddr +"/login?name=" +
        //   this.userName +
        //   "&password=" +
        //   this.password;
        // Http.open("GET", url);

        //2.2 Post方式
        const url = this.$store.state.serverAddr + "/login";

        Http.open("POST", url);

        //2.1 如果是post请求，需要加上请求头
        // text/html ： HTML格式
        // text/plain ：纯文本格式
        // text/xml ：  XML格式
        // application/xhtml+xml ：XHTML格式
        // application/xml     ： XML数据格式
        // application/json    ： JSON数据格式
        // application/pdf       ：pdf格式
        // application/msword  ： Word文档格式
        // application/octet-stream ： 二进制流数据（如常见的文件下载）

        Http.setRequestHeader(
          "Content-type",
          "application/json; charset=utf-8"
        );

        var data = JSON.stringify({
          name: this.userName,
          password: this.password
        });

        //3. 发送请求
        //3.1 get请求的参数在url中
        //3.2 post请求的参数通过sent方法发送，该方法接收一个字符串对象

        Http.send(data);

        // Http.send();

        let that = this;
        //4.接收响应，获取相应参数
        Http.onreadystatechange = e => {
          if (
            Http.readyState == 4 &&
            Http.status >= 200 &&
            Http.status <= 206
          ) {
            console.log("响应成功！");
            console.log(Http.responseText);
            this.responseInfo = JSON.parse(Http.responseText);

            //============根据后端返回信息进行处理=================//
            if (this.responseInfo.result === "success") {
              //记录uuid
              this.$store.commit("RecordUUID", this.responseInfo.uuid);
              console.log("记录uuid成功，uuid:" + this.$store.state.uuid);
              //提示框
              this.$notify({
                title: "登陆成功",
                message: this.userName + "，欢迎来到ReViveLand!",
                type: "success"
              });
              //界面跳转
              this.$router.push("/main");
            } else {
              //提示错误信息
              //可能是输入错误
              if (this.responseInfo.result === "no user") {
                this.$notify.error({
                  title: "用户名或密码错误",
                  message: "用户名或密码错误，请重新输入。"
                });
              } else {
                //也可能是插入错误，需要联系管理员
                this.$notify.error({
                  title: "系统异常",
                  message: this.responseInfo.result + "，请联系管理员"
                });
              }
            }
          } else {
            console.log("请求失败，响应状态码为：" + Http.status);
          }
        };
      }
    }
  },

  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0px;
  padding: 0px;
  color: #fff;
}

input {
  border: none;
}
.filterImg {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/loginBackground_1.png");
  background-size: 100% 100%;
}
.outer_box {
  width: 100%;
  position: relative;
  height: calc(100vh);
}

/* 登录窗口 */
.login_box {
  width: 320px;
  height: 400px;
  border: 1px solid #fff;
  background-color: rgba(189, 156, 156, 0.233);
  border-radius: 10px;
  position: absolute;
  left: 75%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* 用户头像 */
.login_box h1 {
  width: 100%;
  height: 112px;
  margin: 34px 0px;
  text-align: center;
}
.login_box h1 img {
  width: 90px;
  height: 90px;
  border-radius: 55px;
  padding: 10px;
  box-shadow: 0px 0px 5px #fff;
  border: 1px solid #fff;
}

/* p标签公共样式 */
.login_box button {
  /* width: 100%; */
  width: 260px;
  height: 35px;
  margin: 20px 30px;
  line-height: 35px;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 27px;
}

/* 邮箱与登录密码 */
.login_box i {
  font-size: 20px;
  padding-left: 5px;
}
.loginInput {
  width: 200px;
  height: 35px;
  padding: 10px 0;
  border: none;
  background: none;
}

/* 登录按钮 */
.logIn_btn {
  color: rgb(255, 166, 181);
  background-color: rgba(207, 91, 91, 0.863);
}
button:hover {
  background-color: rgba(218, 139, 139, 0.863);
}
/* 注册与忘记密码 */
.login_box div {
  width: 260px;
  font-size: 12px;
  margin: 0px 30px;
  display: flex;
  justify-content: space-between;
}

.backgroundVedio {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  object-fit: cover;
}
</style>
