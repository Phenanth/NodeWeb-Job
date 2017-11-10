<template>
	<div>
		<vhead></vhead>
		<vfoot></vfoot>
	</div>
</template>
<script type="text/javascript">
import vhead from './vheader'
import vfoot from './vfooter'
export default{
	name: 'about',
	components: {
		vhead,
		vfoot
	},
	mounted() {
		this.$store.dispatch('changeHeadLine', '关于本站')
	}
}
</script>
<style type="text/css">
	
</style>
