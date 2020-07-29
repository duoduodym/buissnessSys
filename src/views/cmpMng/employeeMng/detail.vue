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
          <el-form-item label="姓名" prop="employeeName">
            <el-input v-model="ruleForm.employeeName" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="角色" prop="employeeRoles">
            <el-checkbox-group v-model="ruleForm.employeeRoles" @change="changeRoles">
              <el-checkbox
                :label="role.roleId"
                v-for="role in  roles"
                :key="role.roleId"
              >{{role.roleName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { createEmployees, updateEmployees } from "@/request/apis/cmpMng";
import { deepClone } from "@/libs/util/utils";
export default {
  props: {
    roles: Array,
    employeeObj: Object
  },
  data() {
    return {
      ruleForm: {
        employeeRoles: []
      },
      rules: {
        employeeName: [
          {
            required: true,
            message: "请输入名字",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }
        ],
        employeeRoles: [
          {
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    employeeObj: {
      handler(val) {
        this.$nextTick(() => {
          this.clearForm();
          this.ruleForm = deepClone(val);
          if (!this.ruleForm.employeeRoles) {
            this.$set(this.ruleForm, "employeeRoles", []);
          }else{
            this.ruleForm.employeeRoles = val.employeeRoles.map(i=>i.roleId)
          }
        });
      },
      immediate: true
    }
  },
  methods: {
    changeRoles(val) {
      console.log(val);
    },
    onConfirm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.ruleForm.employeeId) {
            createEmployees(this.ruleForm)
              .then(res => {
                if (res.code == "0") {
                  this.$emit("employeeSuccess", "add");
                } else {
                  this.$message.error({
                    message: res.msg
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            updateEmployees(this.ruleForm.employeeId, this.ruleForm)
              .then(res => {
                console.log(res);
                if (res.code == "0") {
                  this.$emit("employeeSuccess", "edit");
                } else {
                  this.$message.error({
                    message: res.msg
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      });
    },
    clearForm() {
      this.$refs.ruleForm.clearValidate();
    }
  }
};
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
</style>
