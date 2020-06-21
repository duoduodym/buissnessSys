<template>
  <div class="cmpInfo">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-row style="margin-top:20px">
        <el-col :span="12">
          <el-form-item label="企业名称" prop="name">
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
          <el-form-item label="企业地址" prop="name">
            <el-input v-model="ruleForm.enterpriseAddress" placeholder="请输入企业地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业logo">
            <div class="upload-btn cur-p">
              <input type="file" class="upload-input" />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {}
    };
  },
  mounted() {
    let companyInfoStr = localStorage.companyInfo;
    if (companyInfoStr) {
      this.ruleForm = JSON.parse(companyInfoStr).enterpriseInfo;
      console.log(this.ruleForm);
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
</style>
