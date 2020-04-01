<template>
	<div class="container">
        <pagePanel :searchForm="searchForm" :showSearch="false">
            <template slot="operation-bar">
                 <el-button  type="primary" size="small" @click="onAdd">新增分类</el-button>
            </template>
            <template slot="column">
					<el-table-column prop="name" label="分类名称"></el-table-column>
					<el-table-column prop="createTime" label="创建时间"></el-table-column>
					<el-table-column fixed="left" label="操作" >
						<template slot-scope="scope">
							<el-button  type="text" size="small">编辑</el-button>
                            <el-button  type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
				</template>
        </pagePanel>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="900px" top='2vh'>
			<detail ref="detail" />
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="onConfirm">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import pagePanel from '@/components/pagePanel/pagePanel'
import detail from './detail'
export default {
	components: {
        pagePanel,
        detail
	},
	data() {
		return {
            title:'',
            dialogFormVisible:false,
			tableData: [
				{
					name: '买买买科技有限公司',
					size: '100人至300人',
					contact: '方全勇',
					phone: '13666030313',
					createTime: '2020-03-03'
				},
				{
					name: '素天下',
					size: '100人至300人',
					contact: '林中',
					phone: '13666030313',
					createTime: '2020-4-03'
				}
			],
			searchForm: {}
		}
    },
    methods:{
        onConfirm(){},
        onAdd(){
            this.title = '新增员工'
            this.dialogFormVisible = true
        }
    }
}
</script>

<style scoped lang="scss">
</style>
