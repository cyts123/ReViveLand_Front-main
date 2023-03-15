<template>
  <div class="register-container">
    <!-- 根标签 -->
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="register-form"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="form.username"></el-input>
      </el-form-item>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model.number="form.nickname"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        nickname: "",
        password: "",
        checkPass: ""
      },
      rules: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("提交成功!");
        } else {
          console.log("提交失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.register-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("../../assets/loginBackground_1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.register-form {
  width: 350px;
  margin: 150px auto;
  background-color: rgba(249, 247, 228, 0.508);
  padding: 30px;
  border-radius: 20px;
}
.title-zc {
  text-align: center;
}
</style>
