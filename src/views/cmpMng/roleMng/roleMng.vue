<template>
	<div class="container">
		<pagePanel
			:searchForm="searchForm"
			:showSearch="false"
			:url="apis.cmpMng.roleMng.find"
			fromType="roles"
			ref="pagePanel"
		>
			<template slot="operation-bar">
				<el-button type="primary" size="small" @click="onAdd">新增角色</el-button>
			</template>
			<template slot="column">
				<el-table-column prop="roleName" label="角色名称"></el-table-column>
				<el-table-column prop="description" label="描述"></el-table-column>
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column fixed="left" label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="editRole(scope.row)" class="table-btn-blue">编辑</el-button>
						<el-button type="text" @click="delRole(scope.row)" class="table-btn-red">删除</el-button>
					</template>
				</el-table-column>
			</template>
		</pagePanel>
		<el-dialog :title="title" :visible.sync="dialogFormVisible" width="900px" top="2vh">
			<detail ref="detail" @roleSuccess="roleSuccess" :roleObj="roleObj" :permissions="permissions" />
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="medium">取消</el-button>
				<el-button type="primary" @click="onConfirm" size="medium">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import pagePanel from '@/components/pagePanel/pagePanel'
import detail from './detail'
import { getPermissions, delRole } from '@/request/apis/cmpMng'
import apis from '@/request/apis/apis'
export default {
	components: {
		pagePanel,
		detail
	},
	data() {
		return {
			roleObj: {},
			apis,
			permissions: [],
			title: '',
			dialogFormVisible: false,
			searchForm: {}
		}
	},
	methods: {
		delRole(row) {
			this.$messageBox
				.confirm('是否要删除所选数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					delRole(row.roleId).then(res => {
						if(res.code == '0'){
							this.$message.success('删除成功')
<<<<<<< HEAD
							this.$refs.pagePanel.onSearch()
=======
							this.$refs.pagePanel.reloadData()
>>>>>>> origin/master
						}else{
							this.$message.error({
								message: res.msg
							})
						}
					})
				})
		},
		editRole(row) {
			this.title = '编辑角色'
			this.roleObj = row
			this.dialogFormVisible = true
		},
		roleSuccess(type) {
			const str = type == 'add' ? '添加成功' : '编辑成功'
			this.$message.success({
				message: str
			})
			this.dialogFormVisible = false
			this.$refs.pagePanel.onSearch()
		},
		onConfirm() {
			this.$refs.detail.onConfirm()
		},
		onAdd() {
			this.title = '新增角色'
			this.roleObj = {}
			this.dialogFormVisible = true
		}
	},
	created() {
		getPermissions().then(res => {
			if (res.code == '0') {
				this.permissions = res.data.permissions
				console.log(this.permissions)
			} else {
				this.$message.error({
					message: res.msg
				})
			}
		})
	}
}
</script>

<style scoped lang="scss">
</style>
