<template>
  <div id="homepage" class="home_wrapper">
    <vhead></vhead>
    <vfoot></vfoot>
  </div>
</template>
<script type="text/javascript">
import vhead from './vheader'
import vfoot from './vfooter'
export default{
  name: 'homepage',
  data () {
    return {
    }
  },
  components: {
    vhead,
    vfoot
  },
  mounted() {
    this.$store.dispatch('changeHeadLine', '信息主页')
  },
  computed: {
    Login () {
      let token = localStorage.getItem('token')
      if (token) {
        return true
      } else return false
    }
  },
  methods: {
  }
}
</script>
<style lang="css" scoped>

</style>
