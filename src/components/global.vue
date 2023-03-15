<template> </template>

<script>
//声明全局变量，为其他模块使用

export default {
  name: "Global",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      serverAddr: "http://127.0.0.1:8080/ReViveLand",
      uuid: ""
    };
  },
  methods: {
    setUUID: s => {
      this.uuid = s;
    }
  }
};
</script>

<style></style>
