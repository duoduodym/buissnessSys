<template>
  <div class="selCompany">
    <div v-for="(item,index) in companyList" :key="index" class="c-item" @click="selCompany(item)">
      <span>{{item.enterpriseName}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    companyList: Array
  },
  components: {},
  data() {
    return {};
  },
  methods:{
    selCompany(item){
      this.$emit('selCompany',item)
    }
  }
};
</script>
<style lang='less' scoped>
.c-item{
  height:40px;
  line-height: 40px;
  cursor: pointer;
}
</style>