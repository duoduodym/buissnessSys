<template>
  <div class="selCompany">
    <div v-for="(item,index) in companyList" :key="index">
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
  }
};
</script>
<style lang='less' scoped>
</style>