<template>
	<div class="container">
        <pagePanel 
		:url="apis.cmpMng.employeeMng.find"
		:searchForm="searchForm">
            <template slot="search-item">
				<el-row>
					<el-col :span="8">
						<el-form-item label="关键字搜索">
							<el-input v-model="searchForm.newPsd" placeholder="姓名/手机号"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</template>
            <template slot="operation-bar">
                 <el-button  type="primary" size="small" @click="onAdd">新增员工</el-button>
            </template>
            <template slot="column">
					<el-table-column prop="employeeName" label="姓名"></el-table-column>
					<el-table-column prop="phone" label="手机号"></el-table-column>
					<el-table-column prop="employeeRoles" label="角色"></el-table-column>
					<el-table-column prop="createTime" label="创建时间"></el-table-column>
					<el-table-column fixed="left" label="操作" >
						<template slot-scope="scope">
							<el-button  type="text" size="small">编辑</el-button>
							<el-button  type="text" size="small">停用</el-button>
                            <el-button  type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
				</template>
        </pagePanel>
		<!-- 添加编辑员工 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="900px" top='2vh'>
			<detail ref="detail" @saveSuccess="saveSuccess"/>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="onConfirm">确定</el-button>
			</div>
		</el-dialog>
		 <el-dialog :title="title" :visible.sync="showBinding" width="900px" top='2vh'>
			<binding ref="binding" />
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="showBinding = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import pagePanel from '@/components/pagePanel/pagePanel'
import detail from './detail'
import binding from './binding'
import apis from '@/request/apis/apis'
export default {
	components: {
        pagePanel,
		detail,
		binding
	},
	data() {
		return {
			apis,
			showBinding:false,
            title:'',
            dialogFormVisible:false,
			searchForm: {}
		}
    },
    methods:{
		//添加员工成功
		saveSuccess(){
			this.dialogFormVisible = false
		},
        onConfirm(){
			this.$refs.detail.onSave()
		},
        onAdd(){
            this.title = '新增员工'
            this.dialogFormVisible = true
        }
    }
}
</script>

<style scoped lang="scss">
</style>
