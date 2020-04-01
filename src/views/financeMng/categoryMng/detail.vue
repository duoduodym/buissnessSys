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
					<el-form-item label="角色名称" prop="name">
						<el-input v-model="ruleForm.newPsd" placeholder="企业名称"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="描述" prop="name">
						<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="权限" prop="name">
						<el-checkbox-group v-model="checkList">
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
export default {
	props: {},
	data() {
		return {
			ruleForm: {},
			rules: {},
			checkList: []
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
