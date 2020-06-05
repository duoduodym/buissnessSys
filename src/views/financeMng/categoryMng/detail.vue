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
          <el-form-item label="分类" prop="costCategoryName">
            <el-input v-model.trim="ruleForm.costCategoryName" placeholder="请输入分类"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { createCatetory,updateCatetory} from "@/request/apis/catetory";
import { deepClone } from '@/libs/util/utils'
export default {
  props: {
    categoryObj: Object
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        costCategoryName: [
          {
            required: true,
            message: "请输入分类",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    categoryObj: {
      handler(val) {
		  this.$nextTick(()=>{
			  this.clearForm()
			  this.ruleForm = deepClone(val)   
		  })
		
	  },
	  immediate:true
	 
    }
  },
  methods: {
    onConfirm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.ruleForm.costCategoryId) {
            createCatetory(this.ruleForm)
              .then(res => {
                if (res.code == "0") {
                  this.$emit("categorySuccess", "add");
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
            updateCatetory(this.ruleForm.costCategoryId, this.ruleForm)
              .then(res => {
                if (res.code == "0") {
                  this.$emit("categorySuccess", "edit");
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
