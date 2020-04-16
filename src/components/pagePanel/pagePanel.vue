<template>
	<div class="pagePanel">
		<div class="searchPanel" v-if="showSearch">
			<el-form ref="form" label-width="100px" size="mini" :model="searchForm">
				<slot name="search-item"></slot>
				<div class="btn-group">
					<el-button type="primary" size="small">查询</el-button>
					<el-button type="info" size="small">重置</el-button>
				</div>
			</el-form>
		</div>
		<el-divider v-if="showSearch"></el-divider>
		<div style="margin-top:20px">
			<slot name="operation-bar"></slot>
		</div>
		<div class="v-table">
			<el-table :data="tableData" style="width: 100%" :max-height="400">
				<slot name="column"></slot>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage1"
				:page-size="this.pageParams.limit"
				layout="total, prev, pager, next"
				:total="total"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import { get, post } from '@/request/http'
export default {
	props: {
		fromType: String,
		url: String,
		searchForm: Object,
		showSearch: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			total: 0,
			tableData: [],
			pageParams: {
				limit: 10,
				offset: 0
			},
			currentPage1:1
		}
	},
	methods: {
		handleCurrentChange(val){
			this.pageParams.offset = (val-1) * this.pageParams.limit
			this.reloadData()
		},
		getData() {
			get(this.url, this.pageParams).then(res => {
				console.log(res)
				if (res.code == '0') {
					this.tableData = res.data[this.fromType]
					this.total = res.data.count
				} else {
					this.$message.error({
						message: res.msg
					})
				}
			})
		},
		reloadData() {
			this.getData()
		}
	},
	created() {
		this.getData()
	}
}
</script>

<style scoped lang="less">
.searchPanel {
	/deep/.el-select {
		width: 100%;
	}
	.btn-group {
		margin-top: 30px;
		display: flex;
		justify-content: center;
	}
}
.v-table {
	margin-top: 20px;
	border: 1px solid #e5e5e5;
}
</style>
