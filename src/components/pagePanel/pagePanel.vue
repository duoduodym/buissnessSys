<template>
  <div class="pagePanel">
    <div class="searchPanel" v-if="showSearch">
      <el-form ref="form" label-width="100px" size="mini" :model="searchForm">
        <slot name="search-item"></slot>
        <div class="btn-group">
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          <el-button type="info" size="small" @click="reset">重置</el-button>
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
        :page-size="this.searchForm.limit"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { get, post } from "@/request/http";

export default {
  props: {
    fromType: String,
    url: String,

    showSearch: {
      type: Boolean,
      default: true
    },
    joinForm: Object
  },
  watch: {
    joinForm: {
      handler(val) {
        this.searchForm.offset = 0;
        this.searchForm = Object.assign({}, val, this.searchForm);
      },
      deep: true
    }
  },
  data() {
    return {
      searchForm: {
        limit: 10,
        offset: 0
      },
      total: 0,
      tableData: [],
      currentPage1: 1
    };
  },
  methods: {
    reset() {
      this.searchForm = {
        limit: 10,
        offset: 0
      };
      this.$emit("reset");
    },
    onSearch() {
      this.getData();
    },
    handleCurrentChange(val) {
      this.searchForm.offset = (val - 1) * this.searchForm.limit;
      this.onSearch();
    },
    getData() {
      get(this.url, this.searchForm).then(res => {
        if (res.code == "0") {
          this.tableData = res.data[this.fromType];
          this.total = res.data.count;
        } else {
          this.$message.error({
            message: res.msg
          });
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
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
