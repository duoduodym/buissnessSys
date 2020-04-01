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
					<el-form-item label="姓名" prop="name">
						<el-input v-model="ruleForm.newPsd" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="手机号" prop="name">
						<el-input v-model="ruleForm.newPsd" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="角色" prop="name">
						<el-checkbox-group v-model="checkList">
							<el-checkbox label="1" disabled>采购员</el-checkbox>
							<el-checkbox label="2" disabled>营收员</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="panel-title">
				<el-col :span="24">
					<span>绑定账号</span>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="binding-box">
						<div class="inner-wrap">
							<em class="weChat-icon"></em>
							<span class="text">微信</span>
						</div>

						<el-button type="success"  class="ml-20">绑定</el-button>
					</div>
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
.binding-box {
	display: flex;
	align-items: center;
	padding: 20px 0 0 50px;
	justify-content: space-between;
	span{
		margin-left: 4px;
	}
	.inner-wrap{
		display: flex;
		align-items: center;
	}
	.weChat-icon {
		display: block;
		width: 40px;
		height: 40px;
		background: url('../../../assets/images/weChat.png');
		background-size: 100% 100%;
	}
}
</style>
