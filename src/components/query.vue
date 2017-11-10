<template>
	<div class="wrapper">
		<vhead></vhead>
		<div class="container">
			<qnav></qnav>
			<div class="right-bd">
				<div class="main">
					<jobList :tab="tab"></jobList>
					<searchJobs :tab="tab"></searchJobs>
				</div>
			</div>
		</div>
		<!--
		<nav>
			<ul>
				<li><router-link to='/query/jobList' id="link">职位总览</router-link></li>
				<li><router-link to='/query/jobSearch' id="link">职位查找</router-link></li>
				<li><router-link to='/query/jobAdmin' id="link">职位管理</router-link></li>
			</ul>
		</nav>
		-->
		<vfoot></vfoot>
	</div>
</template>
<script type="text/javascript">
import vhead from './vheader'
import vfoot from './vfooter'
import qnav from './querynav'
import jobList from './jobList'
import jobSearch from './jobSearch'
import api from '../axios'
export default{
	name: 'query',
	data() {
		return {
			// currentPath: '/query/jobList',
			// currentPathNameParent: '职位查询',
			// currentPathName: '职位列表',
		}
	},
	components: {
		vhead,
		vfoot,
		qnav,
		jobList,
		jobSearch
	},
	mounted() {
		this.$store.dispatch('changeHeadLine', '职位查询')
		// this.$router.push('/query/jobList')
	},
	computed: {
		tab () {
			return this.$store.state.tab
		}
	}
}
</script>
<style scoped>
	.wrapper{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.container{
		display: flex;
		flex-direction: row;
		justify-content: center;
		height:	100%;
		width: 100%;
	}
	.right-bd{
		flex-basis: 100px;
		flex-grow: 2;
	}
	.main{
		height: 100%;
	}
</style>
