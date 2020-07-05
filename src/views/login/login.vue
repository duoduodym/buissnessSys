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
    <el-dialog title="选择企业" :visible.sync="showDialog" width="500px">
      <selCompany :companyList="companyList" @selCompany="selCompany" />
    </el-dialog>
  </div>
</template>

<script>
import selCompany from "./selCompany";
import { getCompanyList, login } from "../../request/apis/login";
import { refreshCompany } from "../../libs/util/utils";
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
    selCompany(item) {
      refreshCompany(item.tenantId);
      this.loginParams.tenantId = item.tenantId;
      this.doLogin();
    },
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
      // this.doLogin();
      // return;
      getCompanyList({
        contactPhone: this.loginParams.contactPhone
      })
        .then(res => {
          console.log(res);
          if (res.data.tenants && res.data.tenants.length) {
            let tenants = res.data.tenants;
            if (tenants.length == 1) {
              refreshCompany(tenants[0].tenantId);
              this.loginParams.tenantId = tenants[0].tenantId;
              this.doLogin();
            } else {
              this.companyList = tenants;
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
          this.$router.currentRoute.query &&
            this.$router.currentRoute.query.redirect &&
            (nextPath = this.$router.currentRoute.query.redirect);
          if (!nextPath) {
            nextPath = "/home";
          }
          console.log(nextPath);
          this.$router.push({
            path: nextPath
          });
        })
        .catch(error => {
          console.log(error);
          this.$message.error({
            message: "登录失败，请确认账号密码是否正确"
          });
        });
    }
  },
  mounted() {
    this.isRememberPsd = !!localStorage.isRememberPsd;
    console.log(localStorage);
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
