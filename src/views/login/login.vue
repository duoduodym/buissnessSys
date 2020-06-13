<template>
  <div class="login-wrap">
    <div class="left-bg"></div>
    <div class="login-box">
      <h1>辅掌柜商户管理</h1>
      <div class="content-wrap">
        <div class="content-item">
          <em class="icon user fl"></em>
          <input type="text" v-model.trim="loginParams.userName" class="fc-f" placeholder="请输入账号" />
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
    <el-dialog :title="选择企业" :visible.sync="showDialog" width="900px">
      <selCompany :companyList="companyList" />
    </el-dialog>
  </div>
</template>

<script>
import selCompany from "./selCompany";
export default {
  props: {},
  components: {
    selCompany
  },
  data() {
    return {
      showDialog: false,
      companyList: [
        {
          name: "革命者有限公司1"
        },
        {
          name: "革命者有限公司2"
        },
        {
          name: "革命者有限公司3"
        }
      ],
      isRememberPsd: false,
      loginParams: {}
    };
  },
  methods:{
      onLogin(){
          this.showDialog = true
      }
  }
};
</script>

<style scoped lang="less">
@import url("login.less");
</style>
