<template scope='scope'>
<div >
  <vhead></vhead>
    <!-- <img class="portrait" witdth="100" height="100">-->
    <p class="nick">{{ username }}</p>
  
    <!-- 后台用户管理，将来做成前后端分离 
    v-for在进行过度时，使用 transition-group 标签，使用后内层标签需要有独有的 key 值 -->
    <transition-group name="list-complete" tag="ul">
        <li v-for="(item, index) in user" :key="item._id" class="list-complete-item">
            {{ index+1 }}. {{ item.email }}
            <el-button type="" @click="del_user(index)">删除</el-button>
            <br>
        </li>
    </transition-group>
    <br>
    <el-button type="primary" @click="logout">登出</el-button>
    <vfoot></vfoot>
</div>
</template>

<script>
import * as types from '../store/types'
import api from '../axios'
import vhead from './vheader'
import vfoot from './vfooter'
export default {
  name: 'hello',
  data() {
    return {
      user: '',
      username: ''
    }
 },
 components: {
  vhead,
  vfoot
 },
  mounted() {
    this.get_User()
    this.username = localStorage.getItem('username')
    this.$store.dispatch('changeHeadLine', '用户信息')
  },
  methods: {
    get_User() {
      setTimeout(() => {
        api.getUser().then(({
          data
        }) => {
          if (data.code == 401) {
            console.log('token')
            this.$router.push('/login')
            this.$store.dispatch('UserLogout')
            console.log(localStorage.token)
          } else {
            this.user = data
          }
        })
      }, 100)
      //}, 10 * 60 * 3600 * 24 * 15)
    },
    logout() {
      this.$store.dispatch('UserLogout')
        if (!this.$store.state.token) {
          this.$router.push('/')
          this.$router.go(0)
          this.$message({
            type: 'success',
            message: '登出成功'
          })
        } else {
          this.$message({
            type: 'info',
            message: '登出失败'
          })
        }
    },
    del_user(id) {
      let opt = {
        id: this.user[id]._id
      };
      api.delUser(opt).then(response => {
        console.log(response)
        this.$message({
          type: 'success',
          message: '用户删除成功'
        })
        this.get_User()
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style>
p{
  margin-top: 150px;
}
.nick
{
  display: flex;
  justify-content: center;
  font-size: 40px;
  min-height: 8vh;
}
.list-complete-item 
{
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to{
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-leave-active{
    position: absolute;
}



</style>
