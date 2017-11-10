<template>
	<div class="container">
		<div>
			<el-menu default-active="1" theme="white">
				<el-submenu index="1">
					<template slot="title">导航</template>
					<el-menu-item index="1-1" @click="tabTrigger('jobList')">职位总览</el-menu-item>
					<el-menu-item index="1-1" @click="tabTrigger('jobSearch')">职位查询</el-menu-item>
				</el-submenu>
			</el-menu>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	name: '#querynav',
	methods: {
		tabTrigger (tab) {
			this.$store.dispatch('tabTrigger', tab);
		}
	}
}
</script>
<style scoped lang="less">

.container {
	display: flex;
  width: 140px;
  height: 100%;
  background-color: rgb(119, 153, 145);
  
  .badge {
    background-color: rgb(119, 153, 145);
  }
}
	.routerbtn{
		display: flex;
		flex-direction: row;
		min-width: 100px;
		min-height: 30px;
		justify-content: center;
		background-color: rgb(119, 153, 145);
		color: #fff;
	}
</style>