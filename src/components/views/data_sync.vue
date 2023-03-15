<template>
  <div class="dataSyncBox">
    <div class="dataSyncInnerBox">
      <div class="dataUploadTips">
        <p>
          不知道如何上传文件？👉<a
            href="../../../static/assistant.html"
            target="_blank"
            >点我查看上传方法</a
          >👈
        </p>
      </div>
      <el-card class="dataUploadBox">
        <el-upload
          class="uploadBox"
          ref="upload"
          :action="reqUrl"
          multiple
          drag
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :auto-upload="false"
          :data="userInfo"
        >
          <div class="inUploadDragger">
            <i class="el-icon-upload"></i>
          </div>
          <div class="inUploadDragger">
            将文件拖到此处，或
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
          </div>
          <div slot="tip" class="uploadButtonBox">
            <div>
              只能上传csv文件，且不超过500kb
            </div>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
          </div>
        </el-upload>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "This is data_sync.vue",
      reqUrl: this.$store.state.serverAddr + "/dataSync",
      fileList: [],
      userInfo: { uuid: this.$store.state.uuid },
      fileCount: 0
    };
  },
  methods: {
    submitUpload() {
      //用户上传文件时，保证文件数量为4，而且命名符合规范
      if (this.$refs.upload.uploadFiles.length != 4) {
        this.$notify({
          title: "不符合上传规范",
          message: "请上传规定的四个文件进行分析",
          type: "warning"
        });
      } else {
        var Activities_walk = false;
        var Activities_run = false;
        var Activities_breath = false;
        var sleep = false;

        var files = this.$refs.upload.uploadFiles;
        console.log(files);
        for (var i = 0; i < files.length; i++) {
          console.log(
            "正在判断第" +
              (i + 1) +
              "个文件，文件名称：" +
              files[i].name +
              "，文件大小" +
              files[i].size
          );

          if (files[i].name == "Activities-walk.csv" && files[i].size != 0) {
            Activities_walk = true;
            this.fileCount++;
          } else if (
            files[i].name == "Activities-run.csv" &&
            files[i].size != 0
          ) {
            Activities_run = true;
            this.fileCount++;
          } else if (
            files[i].name == "Activities-breath.csv" &&
            files[i].size != 0
          ) {
            Activities_breath = true;
            this.fileCount++;
          } else if (files[i].name == "睡眠.csv" && files[i].size != 0) {
            sleep = true;
            this.fileCount++;
          } else {
            console.log("执行到else");
          }
        }

        if (Activities_walk && Activities_run && Activities_breath && sleep) {
          //*************************************************************************//
          //提示用户正在分析
          console.log("上传分析中，请稍后...");
          this.$refs.upload.submit();
        } else {
          this.$notify({
            title: "不符合上传规范",
            message: "文件名称错误或文件大小为0",
            type: "warning"
          });
        }
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      this.$message("已上传至服务器，正在分析中，请稍等一会儿~");

      if (response.result === "fail") {
        this.$message({
          message: response.info,
          type: "warning"
        });
      } else if (
        response.result === "success" &&
        response.info === "finish analysis"
      ) {
        this.$message({
          message:
            "分析完成！新增树" +
            response.treeNum +
            "颗，新增动物" +
            response.animalNum +
            "个",
          type: "success"
        });
      } else if (response.result === "success") {
        this.$message({
          message: "分析完成！",
          type: "success"
        });
      } else if (response == "") {
        /*do nothing*/
      } else {
        //返回的不是JSON类型
        this.$message.error("系统异常，请联系管理员(200003)");
      }
      console.log("当前filecount为" + this.fileCount);
      if (--this.fileCount == 0) {
        this.$refs.upload.clearFiles();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dataSyncBox {
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dataSyncInnerBox {
  height: 90%;
  width: 60%;
}

.dataUploadTips {
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dataUploadBox {
  height: 80%;
  width: 100%;
}
.uploadBox {
  width: 100%;
  height: 100%;
}

.dataUploadBox /deep/ .el-card__body {
  width: 90%;
  height: 90%;
  padding: 3% 5%;
}

.uploadBox /deep/ .el-upload {
  width: 100%;
  height: 70%;
}
.uploadBox /deep/ .el-upload .el-upload-dragger {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inUploadDragger {
  margin: 5%;
}
.uploadButtonBox {
  margin: 0.5% 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
