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
					<el-form-item label="平台名称" prop="name">
						<el-input v-model="ruleForm.newPsd" placeholder="企业名称"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="企业logo1111">
						<div class="upload-btn cur-p">
							<input type="file" class="upload-input"  @change="referenceUpload"/>
						</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="联系人手机" prop="name">
						<el-input v-model="ruleForm.newPsd" placeholder="请输入联系人手机"></el-input>
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
			rules: {}
		}
	},
	methods:{
		referenceUpload(e){
			console.log(123123123)
			const files = e.target.files
			console.log(files)
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
.upload-btn{
	width: 80px;
	height:80px;
	background: url('../../assets/images/add.png');
	background-size:100% 100%;
	position: relative;
	.upload-input{
		position: absolute;
		top:0;
		left:0;
		width: 100%;
		height:100%;
		opacity: 0;
	}
}
</style>
