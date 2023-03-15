<template>
  <div class="mainBox">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">数据同步</el-menu-item>
      <el-menu-item index="2">健康建议</el-menu-item>
      <el-menu-item index="3">我的信息</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "This is Main.vue",
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key === "1") {
        if (this.$router.history.current.path != "/main/data_sync")
          this.$router.push("/main/data_sync");
      } else if (key === "2") {
        if (this.$router.history.current.path != "/main/advice")
          this.$router.push("/main/advice");
      } else if (key === "3") {
        if (this.$router.history.current.path != "/main/user_info")
          this.$router.push("/main/user_info");
      } else {
        console.log("WRONG!");
      }
    }
  },
  mounted() {
    //默认打开data_sync界面
    if (this.$router.history.current.path != "/main/data_sync") {
      this.$router.push("/main/data_sync");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainBox {
  width: 100%;
  height: 100vh;
}
.el-menu-demo {
  height: 8vh;
}
</style>
