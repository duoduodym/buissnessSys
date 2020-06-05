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
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" :rows="4" placeholder="请输入描述" v-model="ruleForm.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="权限" prop="permissions">
            <el-checkbox-group v-model="ruleForm.permissions">
              <el-checkbox :label="item" v-for="item in permissions" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { createRole, updateRole } from "@/request/apis/cmpMng";
import { deepClone } from "@/libs/util/utils";
export default {
  props: {
    permissions: Array,
    roleObj: Object
  },

<<<<<<< HEAD
  data() {
    return {
      ruleForm: {
        permissions: []
      },
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }
        ],
        permissions: [
          {
            required: true,
            message: "请选择权限",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    roleObj: {
      handler(val) {
        this.$nextTick(() => {
          this.clearForm();
          this.ruleForm = deepClone(val);
          if (!this.ruleForm.permissions) {
            this.$set(this.ruleForm, "permissions", []);
          }
        });
      },
      immediate: true
    }
  },
  methods: {
    onConfirm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.ruleForm.roleId) {
            createRole(this.ruleForm)
              .then(res => {
                console.log(res);
                if (res.code == "0") {
                  this.$emit("roleSuccess", "add");
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
            updateRole(this.ruleForm.roleId, this.ruleForm)
              .then(res => {
                console.log(res);
                if (res.code == "0") {
                  this.$emit("roleSuccess", "edit");
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
=======
	data() {
		return {
			ruleForm: {
				permissions: []
			},
			rules: {
				roleName: [
					{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur'
					}
				],
				permissions: [
					{
						required: true,
						message: '请选择权限',
						trigger: 'blur'
					}
				]
			},
			checkList: []
		}
	},
	watch: {
		roleObj: {
			handler(val) {
				this.$nextTick(() => {
					this.clearForm()
					this.ruleForm = deepClone(val)
					if (!this.ruleForm.permissions) {
						this.$set(this.ruleForm, 'permissions', [])
					}
				})
			},
			immediate: true
		}
	},
	methods: {
		onConfirm() {
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
					if (!this.ruleForm.roleId) {
						createRole(this.ruleForm)
							.then(res => {
								console.log(res)
								if (res.code == '0') {
									this.$emit('roleSuccess','add')
								} else {
									this.$message.error({
										message: res.msg
									})
								}
							})
							.catch(err => {
								console.log(err)
							})
					}else{
						updateRole(this.ruleForm.roleId,this.ruleForm).then(res => {
								console.log(res)
								if (res.code == '0') {
									this.$emit('roleSuccess','edit')
								} else {
									this.$message.error({
										message: res.msg
									})
								}
							})
							.catch(err => {
								console.log(err)
							})
					}
				}
			})
		},
		clearForm() {
			this.$refs.ruleForm.clearValidate()
		}
	}
}
>>>>>>> origin/master
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
