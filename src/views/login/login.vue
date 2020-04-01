<template>
	<div class="login-wrap">
		<div class="left-bg"></div>
		<div class="login-box">
			<h1>财务管理平台</h1>
			<div class="content-wrap">
				<div class="content-item">
                    <em class="icon user fl"></em>
                    <input type="text" v-model.trim="loginParams.userName" class="fc-f" placeholder="请输入账号">
                </div>
                <div class="content-item">
                    <em class="icon psd fl"></em>
                    <input type="password" v-model.trim="loginParams.password" class="fc-f" placeholder="请输入密码">
                </div>
                <div class="content-item nb r-wrap">
                    <el-checkbox v-model="isRememberPsd">
                        <span class="r-text ml-10">记住密码</span>
                    </el-checkbox>
                </div>
                <div class="login-btn cur-p">登录</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {},
	data() {
		return {
            isRememberPsd:false,
            loginParams:{}
        }
	}
}
</script>

<style scoped lang="less">
    @import url('login.less');
</style>
