<template lang="html">
  <div class="login">
    <div class="log-bg">
        <div class="log-logo">登录</div>
    </div>
    <div class="log">
      <el-row>
        <el-col :span="10" :offset="7">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户登录" name="first">
              <el-col >
                <el-form :model="dynamicValidateForm" label-width="100px" ref="dynamicValidateForm">
                      <el-form-item
                        prop="email"
                        label="邮箱"
                        :rules="rules.email"
                      >
                        <el-input v-model="dynamicValidateForm.email"></el-input>
                      </el-form-item>
                      <el-form-item
                      prop="password"
                      label="密码"
                      :rules = "rules.password"
                      >
                        <el-input type="password" v-model="dynamicValidateForm.password"></el-input>
                      </el-form-item>
                      <el-button type="primary" v-on:click="submitForm('dynamicValidateForm')">登录</el-button>
                      <el-button v-on:click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="用户注册" name="second">
              <Register></Register>
            </el-tab-pane>
        </el-tabs>
      </el-col>
      </el-row>
    </div>
    <vfoot></vfoot>
  </div>
</template>

<script>
import Register from '@/components/Register.vue'
import * as types from '../store/types'
import api from '../axios'
import vhead from './vheader'
import vfoot from './vfooter'
export default {
  name: 'register',
  data() {
    return {
      dynamicValidateForm: {
        email: '',
        password: ''
      },
      activeName: this.$store.state.activeName,
      rules: {
        email: [{
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }],
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }
    }
  },
  components: {
    Register,
    vhead,
    vfoot
  },
  mounted() {
    this.$store.dispatch('changeHeadLine', '登录')
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    handleClick(tab, event) {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let opt = this.dynamicValidateForm;
          api.UserLogin(opt).then(({
            data
          }) => {
            if (!data.info) {// res.json.info == false, 账号不存在
              this.$message({
                type: 'info',
                message: '账号不存在'
              })
            }
            if (data.success) {
              this.$message({
                type: 'success',
                message: '登录成功'
              })
              this.$store.dispatch('UserLogin', data.token)
              this.$store.dispatch('UserName', data.email)
              let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              this.$router.push({
                path: '/userinfo'
              })
            } else {
              this.$message({
                type: 'info',
                message: '登录失败'
              })
            }
          })
        } else {
          console.log('Error Submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss">
.el-col {
    // margin-bottom:
}
.login
{
  position: fixed;
  overflow: hidden;
  left: 50%; 
  margin-left: -350px; 
  top:47%; 
  margin-top: -350px; 
  width: 650px; 
  min-height: 730px; 
  z-index: 10; 
  right: 180px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px; 
  -webkit-box-shadow:  0px 3px 16px -5px #070707; 
  box-shadow:  0px 3px 16px -5px #070707
}
footer{
  display: flex;
  display: -webkit-flex;
  height: 15vh;
  align-items: flex-end;
  justify-content: flex-end;
}
footer p{
  width: 100px;
  color: #fff;
  text-align: right;
  padding: 1rem 1.5rem;
  min-width: 100px;
  justify-content: center;
  background-color: rgb(119, 154, 189);
  }
.log-close
{
  display: block; 
  position: absolute; 
  top:12px; 
  right: 12px; 
  opacity: 1;
}

.log-close:hover 

.nav-text{
  color:#fff;
    nav ul{
    display: flex;
    display: -webkit-flex;
    -webkit-justify-content:flex-end;
    justify-content: flex-end;
    margin:0;
    list-style: none;
  }
}

.icons
{
transform: rotate(180deg);
}

.log-close .icons
{
  opacity: 1; 
  transition: all .3s
}

.log-cloud
{
  background-image: url(../images/login-cloud.png);
  width: 63px ;
  height: 40px; 
  position: absolute; 
  z-index: 1
}

.login .cloud1
{
  top:21px; 
  left: -30px; 
  transform: scale(.6); 
  animation: cloud1 20s linear infinite;
}

.login .cloud2
{
  top:87px; right: 20px;
  animation: cloud2 19s linear infinite;
}

.login .cloud3
{
  top:160px; 
  left: 5px;
  transform: scale(.8);
  animation: cloud3 21s linear infinite;
}

.login .cloud4
{
  top:150px; 
  left: -40px;
  transform: scale(.4);
  animation: cloud4 19s linear infinite;
}

.log-bg
{
  background: url(../images/8.jpg);
  width: 100%;
  height: 312px;
  overflow: hidden;
}

.log-logo
{
  height: 80px; 
  margin: 120px auto 25px; 
  text-align: center; 
  color: #fff; 
  font-weight: bold; 
  font-size: 40px;
}

.log-text
{
  color: #57d4c3; 
  font-size: 13px; 
  text-align: center; 
  margin: 0 auto;
}

.log-logo,

.log-text{
  z-index: 2;
}

.icons
{
  background:url(../images/icons.png) no-repeat;
   display: inline-block;
}

.close
{
  height:16px;width:16px;
  background-position:-13px 0;
}

.login-email
{
  height:17px;
  width:29px;
  background-position:-117px 0;
}

.log-btns{
  padding: 15px 0; 
  margin: 0 auto;
}
.log-btn
{
  width:402px; 
  display: block; 
  text-align: left; 
  line-height: 50px;
  margin:0 auto 15px; 
  height:50px; 
  color:#fff; 
  font-size:13px;
  -webkit-border-radius: 5px; 
  background-color: #3B5999;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}

.log-btn.tw
{
  background-color: #13B4E9;
}

.log-btn.email
{
  background-color: #50E3CE
}

.log-btn:hover,

.log-btn:focus
{
  color: #fff; 
  opacity: .8;
}

.log-email
{
  text-align: center; 
  margin-top: 20px;
}
.log-email .log-btn
{
  background-color: #50E3CE;
  text-align: center;
}

.log-input-empty
{
  border: 1px solid #f37474 !important;
}

.isloading
{
  background: #d6d6d6
}

.log-btn .icons{
  margin-left: 30px; 
  vertical-align: middle;
}

.log-btn .text
{
  left: 95px; 
  line-height: 50px; 
  text-align: left; 
  position: absolute;
}

.log-input
{
  width: 370px;
  overflow: hidden; 
  padding: 0 15px;
  font-size: 13px; 
  border: 1px solid #EBEBEB; 
  margin:0 auto 15px; 
  height: 48px; 
  line-height: 48px; 
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}

.log-input.warn
{
  border: 1px solid #f88787;
}

 @-webkit-keyframes cloud1 {  
    0%{left: 200px}  
    100%{left:-130px;} 
}
@keyframes cloud1{
    0%{left: 200px}  
    100%{left:-130px;} 
}

 @-webkit-keyframes cloud2 {  
    0%{left:500px;}  
    100%{left:-90px;} 
}
@keyframes cloud2{
    0%{left:500px;}  
    100%{left:-90px;} 
}

@-webkit-keyframes cloud3 {  
    0%{left:620px;}  
    100%{left:-70px;} 
}
@keyframes cloud3{
    0%{left:620px;}  
    100%{left:-70px;} 
}@-webkit-keyframes cloud4 {  
    0%{left:100px;}  
    100%{left:-70px;} 
}
@keyframes cloud4{
    0%{left:100px;}  
    100%{left:-70px;} 
}

</style>
