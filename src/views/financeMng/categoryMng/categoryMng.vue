<template>
  <div class="container">
    <pagePanel
      :searchForm="searchForm"
      :showSearch="false"
      :url="apis.financeMng.categoryMng.find"
      ref="pagePanel"
      fromType="costCategories"
    >
      <template slot="operation-bar">
        <el-button type="primary" size="small" @click="onAdd">新增分类</el-button>
      </template>
      <template slot="column">
        <el-table-column prop="costCategoryName" label="分类名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="table-btn-blue" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" class="table-btn-red" @click="delCategory(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </pagePanel>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="900px" top="2vh">
      <detail
        ref="detail"
        :categoryObj="categoryObj"
        :title="title"
        @categorySuccess="categorySuccess"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagePanel from "@/components/pagePanel/pagePanel";
import detail from "./detail";
import apis from "@/request/apis/apis";
import { delCatetory } from '@/request/apis/catetory'
export default {
  components: {
    pagePanel,
    detail
  },
  data() {
    return {
      apis,
      categoryObj: {},
      title: "",
      dialogFormVisible: false,
      tableData: [
        {
          name: "买买买科技有限公司",
          size: "100人至300人",
          contact: "方全勇",
          phone: "13666030313",
          createTime: "2020-03-03"
        },
        {
          name: "素天下",
          size: "100人至300人",
          contact: "林中",
          phone: "13666030313",
          createTime: "2020-4-03"
        }
      ],
      searchForm: {}
    };
  },
  methods: {
	  delCategory(row) {
			this.$messageBox
				.confirm('是否要删除所选数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					delCatetory(row.costCategoryId).then(res => {
						if(res.code == '0'){
              this.$message.success('删除成功')
              setTimeout(()=>{
                this.$refs.pagePanel.onSearch();
              },2000)
						}else{
							this.$message.error({
								message: res.msg
							})
						}
					})
				})
		},
    categorySuccess(type) {
      const str = type == "add" ? "添加成功" : "编辑成功";
      this.$message.success({
        message: str
      });
      setTimeout(()=>{
        this.dialogFormVisible = false;
        this.$refs.pagePanel.onSearch();
      },2000)

    },
    onConfirm() {
      this.$refs.detail.onConfirm();
    },
    onAdd() {
      this.title = "新增分类";
      this.categoryObj = {};
      this.dialogFormVisible = true;
    },
    edit(row) {
      this.title = "编辑分类";
      this.categoryObj = row;
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style scoped lang="less">
</style>
