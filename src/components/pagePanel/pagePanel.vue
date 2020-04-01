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
				<el-table :data="tableData" style="width: 100%">
					<slot name="column"></slot>
				</el-table>
				<el-pagination background layout="prev, pager, next" :total="1000" style="margin-top:20px"></el-pagination>
			</div>
	</div>
</template>

<script>
export default {
	props: {
        url:String,
		searchForm:Object,
		showSearch:{
			type:Boolean,
			default:true
		}
    },
	data() {
		return {
            tableData:[]
        }
	}
}
</script>

<style scoped lang="less">
.searchPanel {
	/deep/.el-select {
		width: 100%;
	}
	.btn-group{
		margin-top: 30px;
		display: flex;
		justify-content: center;
	}
}
.v-table {
	margin-top: 20px;
	border:1px solid #e5e5e5;
}
</style>
