<template>
	<div class="container" ref="container">
		<div class="header" ref="header">
			<div class="fl big-title">
				<h1>辅掌柜</h1>
				<h2 class="small-title">商户管理系统</h2>
			</div>
			<div class="fr btn-wrap">
				<span class="fc-f">欢迎您，系统管理员</span>
				<em class="setting cur-p" @click.stop="openModif"></em>
				<div class="modify-wrap bg-f" ref="modifyWrap" v-if="showModify">
					<div class="m-item cur-p" @click="openModifyPsd">
						<em class="icon m-psd"></em>
						<span>修改密码</span>
					</div>
					<div class="m-item cur-p nb">
						<em class="icon m-quit"></em>
						<span>退出登录</span>
					</div>
				</div>
			</div>
		</div>
		<div class="main-wrap" :style="style">
			<div class="aside" style="height:100%">
				<el-menu
					:default-active="defaultActive"
					class="el-menu-vertical-demo"
					:router="true"
					background-color="#1d2023"
					active-text-color="#fff"
					style="width:200px;height:100%;"
				>
					<menuTree :data="menu_data"></menuTree>
				</el-menu>
			</div>
			<div class="main" style="height:100%">
				<positionBar />
				<div class="bg-f inner-wrap">
					<router-view />
				</div>
			</div>
		</div>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px" @open="openMDIalog">
			<modifyPsd ref="modifyPsd" />
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onConfirm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import menuTree from '@/components/menuTree/menuTree'
import modifyPsd from '@/components/modifyPsd/modifyPsd'
import positionBar from '@/components/positionBar/positionBar'
export default {
	components: {
		menuTree,
		modifyPsd,
		positionBar
	},
	data() {
		return {
			openPfIalog: false,
			defaultActive: '',
			showModify: false,
			dialogFormVisible: false,
			style: {
				height: ''
			},
			menu_data: [
				{
					index: '/home',
					name: 'home',
					label: '首页',
					icon: 'icon-ziyuan'
				},
				{
					index: '/financeMng',
					name: 'finance',
					label: '财务管理',
					icon: 'icon-quanyi-bendiyingshou',
					children: [
						{
							index: '/financeMng/categoryMng',
							name: 'categoryMng',
							label: '分类管理',
							icon: 'icon-fenlei'
						}
					]
				},
				{
					index: '/cmpMng',
					name: 'company',
					label: '企业管理',
					icon: 'icon-qiye',
					children: [
						{
							index: '/cmpMng/employeeMng',
							name: 'employeeMng',
							label: '员工管理',
							icon: 'icon-yuangong'
						},
						{
							index: '/cmpMng/roleMng',
							name: 'roleMng',
							label: '角色管理',
							icon: 'icon-jiaoseleixing'
						},
						{
							index: '/cmpMng/cmpInfo',
							name: 'cmpInfo',
							label: '企业信息',
							icon: 'icon-shenqingbaoxiao'
						}
					]
				}
			]
		}
	},
	methods: {
		getCurrentActive() {
			this.defaultActive = this.$route.path
		},
		openMDIalog() {
			this.$nextTick(() => {
				this.$refs.modifyPsd.onClear()
			})
		},
		//确认修改
		onConfirm() {
			this.$refs.modifyPsd.onConfirm()
		},
		//打开修改密码弹窗
		openModifyPsd() {
			this.dialogFormVisible = true
		},
		//打开修改密码弹窗
		openModif() {
			this.showModify = true
		},
		getHight() {
			const H = this.$refs.container.offsetHeight
			const H1 = this.$refs.header.offsetHeight
			this.style.height = H - H1 - 1 + 'px'
		}
	},
	created() {
		console.log(this.getCurrentActive())
	},
	mounted() {
		this.getHight()
		window.addEventListener('resize', this.getHight)
		document.addEventListener('click', e => {
			if (this.$refs.modifyWrap) {
				if (!this.$refs.modifyWrap.contains(e.target)) {
					this.showModify = false
				}
			}
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.getHight)
	}
}
</script>

<style scoped lang="less">
@import url('layout.less');
</style>
