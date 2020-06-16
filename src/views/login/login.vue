<template>
  <div class="login-wrap">
    <div class="left-bg"></div>
    <div class="login-box">
      <h1>辅掌柜商户管理</h1>
      <div class="content-wrap">
        <div class="content-item">
          <em class="icon user fl"></em>
          <input
            type="text"
            v-model.trim="loginParams.contactPhone"
            class="fc-f"
            placeholder="请输入账号"
          />
        </div>
        <div class="content-item">
          <em class="icon psd fl"></em>
          <input
            type="password"
            v-model.trim="loginParams.password"
            class="fc-f"
            placeholder="请输入密码"
          />
        </div>
        <div class="content-item nb r-wrap">
          <el-checkbox v-model="isRememberPsd">
            <span class="r-text ml-10">记住密码</span>
          </el-checkbox>
        </div>
        <div class="login-btn cur-p" @click="onLogin">登录</div>
      </div>
    </div>
    <el-dialog title="选择企业" :visible.sync="showDialog" width="900px">
      <selCompany :companyList="companyList" />
    </el-dialog>
  </div>
</template>

<script>
import selCompany from "./selCompany";
import { getCompanyList, login } from "../../request/apis/login";
export default {
  props: {},
  components: {
    selCompany
  },
  data() {
    return {
      showDialog: false,
      companyList: [],
      isRememberPsd: false,
      loginParams: {}
    };
  },
  methods: {
    onLogin() {
      //   this.showDialog = true
      if (!this.loginParams.contactPhone) {
        this.$message.error({
          message: "请输入手机号码"
        });
        return;
      }
      if (!this.loginParams.password) {
        this.$message.error({
          message: "请输入密码"
        });
        return;
      }
      this.doLogin();
      return;
      getCompanyList({
        phone: this.loginParams.contactPhone
      })
        .then(res => {
          console.log(res);
          if (res.data.tenants && res.data.tenants.length) {
            if (res.data.tenants.length == 1) {
              this.loginParams.tenantId = res.data.tenants[0].tenantId;
              this.doLogin();
            } else {
              this.companyList = res.data.tenants;
              this.showDialog = true;
            }
          } else {
            this.$message.error({
              message: "该用户未绑定公司"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error({
            message: "请求失败"
          });
        });
    },
    doLogin() {
      this.loginParams.tenantId = "4c550d32-4972-4aea-8ac4-cdc550dd2db6";
      login(this.loginParams)
        .then(res => {
          if (this.isRememberPsd) {
            localStorage.isRememberPsd = true;
            localStorage.contactPhone = this.loginParams.contactPhone;
            localStorage.password = this.loginParams.password;
          }
          let companyInfo = res.data.tenant;
          localStorage.companyInfo = JSON.stringify(companyInfo);
          var nextPath;
          (this.$router.query &&
            this.$router.query.path &&
            (nextPath = this.$router.query.path)) | (nextPath = "/login");
          console.log(nextPath);
          this.$router.push({
            path: nextPath
          });
        })
        .catch(error => {
          console.log(error);
          this.$message.error({
            message: "请求失败"
          });
        });
    }
  },
  mounted() {
    this.isRememberPsd = localStorage.isRememberPsd;
    if (this.isRememberPsd) {
      this.loginParams.contactPhone = localStorage.contactPhone;
      this.loginParams.password = localStorage.password;
    }
  }
};
</script>

<style scoped lang="less">
@import url("login.less");
</style>
