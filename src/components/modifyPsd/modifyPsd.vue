<template>
  <!-- 退出和修改密码弹窗 -->
  <div class="modifyPsd">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="ruleForm.oldPassword" placeholder="请输入旧密码" style="width:300px" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPsd">
        <el-input v-model="ruleForm.newPsd" placeholder="请输入新密码" style="width:300px" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPsd">
        <el-input v-model="ruleForm.confirmPsd" placeholder="请输入确认密码" style="width:300px" type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { resetPassword } from "../../request/apis/cmpMng";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.confirmPsd !== "") {
          this.$refs.ruleForm.validateField("confirmPsd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPsd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPassword: "",
        newPsd: "",
        confirmPsd: ""
      },
      rules: {
        oldPassword: {
          required: true,
          message: "请输入旧密码",
          trigger: "blur"
        },
        newPsd: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmPsd: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onClear() {
      this.$refs["ruleForm"].resetFields();
    },
    onConfirm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          resetPassword({
            oldPassword: this.ruleForm.oldPassword,
            password: this.ruleForm.newPsd
          })
            .then(res => {
              console.log(res);
              if (res.data && res.data.code == 0) {
                this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message.error({
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.$message.error({
                message: "请求失败"
              });
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.m-item {
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
  .m-label {
    display: block;
    width: 100px;
  }
}
</style>
