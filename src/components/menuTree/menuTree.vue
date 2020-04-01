<template>
	<div class="menutree">
		<label v-for="menu in data" :key="menu.index">
			<el-submenu :index="menu.index" v-if="menu.children">
				<template slot="title">
					<span class="iconfont" :class="menu.icon"></span>
					<span>{{menu.label}}</span>
				</template>
				<label>
					<menuTree :data="menu.children"></menuTree>
				</label>
			</el-submenu>
			<el-menu-item v-else :index="menu.index">
				<span class="iconfont" :class="menu.icon"></span>
				<span slot="title">{{menu.label}}</span>
			</el-menu-item>
		</label>
	</div>
</template>
<script>
export default {
    name:'menuTree',
	props: ['data']
}
</script>
<style lang="less">
	.iconfont{
		margin-right: 10px;
	}
</style>