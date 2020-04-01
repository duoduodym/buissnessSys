<template>
    <div class="positionBar bg-f">
        <span>当前位置:</span>
        <span class="ml-10">{{currentPosition}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPosition:'',
        };
    },
    watch:{
        '$route'(val){
            this.currentPosition = val.meta.title
        }
    },
    created(){
        if(this.$route.meta.title){
            this.currentPosition = this.$route.meta.title
        }
    }
};
</script>

<style scoped lang="less">
    .positionBar{
        height:40px;
        padding: 0 20px;
        border-bottom:1px solid #e5e5e5;
        display: flex;
        align-items: center;
        color: #666;
    }
</style>
