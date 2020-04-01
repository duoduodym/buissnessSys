<template>
	<div class="detail">
		<el-row class="panel-title">
			<el-col :span="24">
				<span>基本信息</span>
			</el-col>
		</el-row>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			<el-row style="margin-top:20px">
				<el-col :span="12">
					<el-form-item label="姓名" prop="employeeName">
						<el-input v-model="ruleForm.employeeName" placeholder="请输入姓名"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="角色" prop="employeeRoles">
						<el-checkbox-group v-model="ruleForm.employeeRoles">
							<el-checkbox label="1">采购员</el-checkbox>
							<el-checkbox label="2">营收员</el-checkbox>
							<el-checkbox label="3">出纳</el-checkbox>
							<el-checkbox label="4">会计</el-checkbox>
							<el-checkbox label="5">老板</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
import { createEmployees } from '@/request/apis/cmpMng'
export default {
	props: {},
	data() {
		return {
			ruleForm: {
				tenantId:'1',
				employeeRoles:[]
			},
			rules: {
				employeeName: [
					{
						required: true,
						message: '请输入名字',
						trigger: 'blur'
					}
				],
				phone:[
					{
						required: true,
						message: '请输入手机号码',
						trigger: 'change'
					}
				],
				employeeRoles:[
					{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}
				],
			},
			checkList:[]
		}
	},
	methods:{
		onSave(){
			this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    createEmployees(this.ruleForm).then(res => {
						if(res.data.code == '0'){
							this.$message.success({
								message: '添加成功'
							  })
							  this.$emit('saveSuccess')
						}else{
							this.$message.error({
								message:res.msg
							})
						}
                    }).catch(err => {
					})
                }
			})
		}
	}
}
</script>

<style scoped lang="less">
.panel-title {
	height: 40px;
	background: #f5f5f5;
	color: #333;
	padding: 0 20px;
	font-size: 16px;
	line-height: 40px;
}
</style>
