<template>
  <div class="cmpInfo">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-row style="margin-top:20px">
        <el-col :span="12">
          <el-form-item label="企业名称" prop="enterpriseName">
            <el-input v-model="ruleForm.enterpriseName" placeholder="请输入企业名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业规模">
            <el-select v-model="ruleForm.enterpriseScale" placeholder="企业规模">
              <el-option label="请选择" value></el-option>
              <el-option label="100人以下" value="100人以下"></el-option>
              <el-option label="100人至300人" value="100人至300人"></el-option>
              <el-option label="300人至500人" value="300人至500人"></el-option>
              <el-option label="500人以上" value="500人以上"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业地址" prop="enterpriseAddress">
            <el-input v-model="ruleForm.enterpriseAddress" placeholder="请输入企业地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业logo">
            <div class="upload-btn cur-p">
              <input type="file" class="upload-input" @change="referenceUpload" accept="image/png,image/jpeg,image/gif,image/jpg" />
              <img :src="ruleForm.enterpriseLogoUrl" class="img-logo" />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" class="confim-btn" @click="onSave">保存</el-button>
  </div>
</template>

<script>
import { pushImage } from "../../../request/apis/file";
import { updataCompanyInfo } from "../../../request/apis/cmpMng";
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        enterpriseName: {
          required: true,
          message: "请输入企业名称",
          trigger: "blur"
        },
        enterpriseAddress: {
          required: true,
          message: "请输入企业地址",
          trigger: "blur"
        }
      }
    };
  },
  mounted() {
    let companyInfoStr = localStorage.companyInfo;
    if (companyInfoStr) {
      this.ruleForm = JSON.parse(companyInfoStr).enterpriseInfo;
      console.log(this.ruleForm);
    }
  },
  methods: {
    referenceUpload(e) {
      console.log(123123123);
      const files = e.target.files;
      console.log(files[0]);
      pushImage(files[0])
        .then(res => {
          this.$set(
            this.ruleForm,
            "enterpriseLogoUrl",
            "http://" + res.Location
          );
          // this.ruleForm.enterpriseLogoUrl = "http://"+res.Location
          console.log(this.ruleForm);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSave() {
      if (
        this.ruleForm.enterpriseName &&
        this.ruleForm.enterpriseScale &&
        this.ruleForm.enterpriseAddress
      ) {
        console.log(JSON.stringify(this.ruleForm));
        updataCompanyInfo(this.ruleForm)
          .then(res => {
            let companyInfoStr = localStorage.companyInfo;
            if (companyInfoStr) {
              const info = JSON.parse(companyInfoStr);
              info.enterpriseInfo = this.ruleForm;
              localStorage.companyInfo = JSON.stringify(info);
              this.$message.success({
                message: "保存成功"
              });
            }
          })
          .catch(err => {
            this.$message.error({
              message: "请求失败"
            });
          });
      }
    }
  }
};
</script>

<style scoped lang="less">
/deep/.el-select {
  width: 100%;
}
.upload-btn {
  width: 80px;
  height: 80px;
  background: url("../../../assets/images/add.png");
  background-size: 100% 100%;
  position: relative;
  .upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.confim-btn {
  margin-left: 30px;
  margin-top: 30px;
  width: 100px;
}
.img-logo {
  height: 80px;
  width: 80px;
}
</style>
