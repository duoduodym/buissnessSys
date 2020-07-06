<template>
  <div class="container">
    <pagePanel
      :url="apis.cmpMng.employeeMng.find"
      fromType="employees"
      ref="pagePanel"
      @reset="reset"
      :joinForm="searchForm"
    >
      <template slot="search-item">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关键字搜索">
              <el-input v-model.trim="searchForm.employeeNameMatch" placeholder="姓名/手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template slot="operation-bar">
        <el-button type="primary" size="small" @click="onAdd">新增员工</el-button>
      </template>
      <template slot="column">
        <el-table-column prop="employeeName" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="employeeRoles" label="角色" :formatter="formatRoles"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row)" class="table-btn-blue">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="onBinding(scope.row)"
              class="table-btn-blue"
            >绑定</el-button>
            <el-button
              type="text"
              size="small"
              class="table-btn-red"
              @click="onSwitchState(scope.row)"
            >{{scope.row.employeeStatus | stateStr}}</el-button>
            <el-button type="text" size="small" class="table-btn-red" @click="onDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </pagePanel>
    <!-- 添加编辑员工 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="900px" top="2vh">
      <detail
        ref="detail"
        @employeeSuccess="employeeSuccess"
        :employeeObj="employeeObj"
        :roles="roles"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="绑定员工" :visible.sync="showBinding" width="900px" top="2vh" @opened="opened">
      <binding ref="binding" :roles="roles" :employeeObj="employeeObj" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showBinding = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagePanel from "@/components/pagePanel/pagePanel";
import detail from "./detail";
import binding from "./binding";
import apis from "@/request/apis/apis";
import {
  getRoles,
  delEmployees,
  switchEmployeesStatus
} from "@/request/apis/cmpMng";
export default {
  components: {
    pagePanel,
    detail,
    binding
  },
  data() {
    return {
      employeeObj: {},
      apis,
      showBinding: false,
      title: "",
      dialogFormVisible: false,
      searchForm: {},
      roles: []
    };
  },
  filters: {
    stateStr(state) {
      if (state == 1) {
        return "停用";
      } else {
        return "启用";
      }
    }
  },
  methods: {
    opened(){
      this.$nextTick(()=> this.$refs.binding.getObj())
    },
    //添加员工成功
    employeeSuccess(type) {
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
      this.title = "新增员工";
      this.employeeObj = {};
      this.dialogFormVisible = true;
    },
    onEdit(row) {
      this.title = "编辑员工";
      this.employeeObj = row;
      this.dialogFormVisible = true;
    },
    onBinding(row) {
      this.employeeObj = row;
      this.showBinding = true;
    },
    onSwitchState(row) {
      var msg = "是否启用员工";
      var employeeStatus = 1;
      if (row.employeeStatus == 1) {
        msg = "是否停用员工";
        employeeStatus = 2;
      }
      this.$messageBox
        .confirm(msg, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          switchEmployeesStatus(row.employeeId, {
            employeeStatus
          }).then(res => {
            if (res.code == "0") {
              this.$message.success("操作成功");
              row.employeeStatus = employeeStatus
            } else {
              this.$message.error({
                message: res.msg
              });
            }
          });
        });
    },
    onDel(row) {
      this.$messageBox
        .confirm("是否要删除所选数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          delEmployees(row.employeeId).then(res => {
            if (res.code == "0") {
              this.$message.success("删除成功");
              setTimeout(()=>{
                 this.$refs.pagePanel.onSearch();
              },2000)
            } else {
              this.$message.error({
                message: res.msg
              });
            }
          });
        });
    },
    reset() {
      this.searchForm = {};
    },
    formatRoles(item){
      const roles =item.employeeRoles.map(i=>i.roleName).join(',')
      console.log(roles)
      return roles
    }
  },
  created() {
    getRoles().then(res => {
      this.roles = res.data.roles;
      console.log(this.roles);
    });
  }
};
</script>

<style scoped lang="scss">
</style>
