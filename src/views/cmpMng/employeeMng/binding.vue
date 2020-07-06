<template>
	<div class="detail">
		<el-row class="panel-title">
			<el-col :span="24">
				<span>基本信息</span>
			</el-col>
		</el-row>
		<el-form :model="employeeObj" ref="employeeObj" label-width="100px">
			<el-row style="margin-top:20px">
				<el-col :span="12">
					<el-form-item label="姓名">
						<el-input v-model="employeeObj.employeeName" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="手机号">
						<el-input v-model="employeeObj.phone" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="角色">
						<el-checkbox-group v-model="employeeObj.employeeRoles" disabled>
							<el-checkbox :label="role.roleId" v-for="role in  roles" :key="role.roleId">{{role.roleName}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="panel-title binding-title">
				<el-col :span="24">
					<span>绑定账号</span>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<div class="binding-box">
						<span class="weChat-icon"></span>
						<el-input v-model="openId" class="ml-10 bind-input"></el-input>
						<el-button @click="onBinding(employeeObj.employeeId)" class="ml-10">绑定</el-button>
						<el-button @click="onUnBinding(employeeObj.employeeId)" class="ml-10">解绑</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>
		<div id="login_container"></div>
	</div>
</template>

<script>
import { bindingEmployees, unBindingEmployees } from '@/request/apis/cmpMng'
import { checkTenantId } from '@/libs/util/utils'
import store from '@/store'
export default {
	props: {
		roles: Array,
		employeeObj: Object
	},
	data() {
		return {
			//oRrdQtxsfnE9nCBhrKGEtwBGskYM
			openId: '',
			obj: {}
		}
	},
	methods: {
		onUnBinding(id) {
      console.log(12312312312)
			unBindingEmployees(id, {
				employeeId: id
			}).then(res => {
				if (res.code == '0') {
          this.$message.success({
						message: '解绑成功'
					})
				} else {
					this.$message.error({
						message: res.msg
					})
				}
			})
		},
		onBinding(id) {
			bindingEmployees(id, {
				wechatNumber: this.openId,
				employeeId: id
			}).then(res => {})
		},
		getObj() {
			let state = `${this.tid}|${this.employeeObj.employeeId}`
			this.obj = {}
			this.obj = new WxLogin({
				self_redirect: true,
				id: 'login_container',
				appid: 'wxfe4004088aebbda1&redirect_uri',
				scope: 'snsapi_login',
				redirect_uri:
					'https://fzg.fzzxwl.com:31886/we-chat/oauth2-authorization/callback',
				state,
				style: 'black',
				href: ''
			})
		}
	},
	computed: {
		tid() {
			return this.$store.state.tenantId
		}
	},
	mounted() {
		checkTenantId()
		console.log(this.tid)
		this.getObj()
	}
}
</script>

<style scoped lang="less">
.binding-title {
	display: flex;
	align-items: center;
}
.panel-title {
	height: 40px;
	background: #f5f5f5;
	color: #333;
	padding: 0 20px;
	font-size: 16px;
	line-height: 40px;
}
.binding-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 10px;
	span {
		margin-left: 4px;
	}
	.bind-input {
		flex: 1;
	}
	.weChat-icon {
		display: block;
		width: 40px;
		height: 40px;
		background: url('../../../assets/images/weChat.png');
		background-size: 40px;
	}
}
</style>
