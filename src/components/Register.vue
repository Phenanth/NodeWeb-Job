<template lang="html">
  <div class="">
    <el-form :model="registerValidateForm" label-width="100px"  ref="registerValidateForm">
          <el-form-item
            prop="email"
            label="邮箱"
            :rules="rules.email"
          >
            <el-input v-model="registerValidateForm.email"></el-input>
          </el-form-item>
          <el-form-item
          prop="password"
          label="密码"
          :rules = "rules.password"
          >
            <el-input type="password" v-model="registerValidateForm.password"></el-input>
          </el-form-item>
          <el-form-item
          prop="checkPass"
          label="再次输入"
          :rules = "rules.checkPass"
          >
            <el-input type="password" v-model="registerValidateForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item
          prop="checkValid" 
          label="邮箱验证码" 
          :rules="rules.checkValid"
          >
            <el-input type="checkValid" v-model="registerValidateForm.checkValid"></el-input>
            <el-button type="primary" v-on:click="sendEmail('registerValidateForm')">发送验证码</el-button>
          </el-form-item>
          <el-button type="primary" v-on:click="submitForm('registerValidateForm')">注册</el-button>
          <el-button v-on:click="resetForm('registerValidateForm')">重置</el-button>
    </el-form>
  </div>
</template>
·
<script>
import * as types from '../store/types'
import api from '../axios'
export default {
  name: 'login',
  data() {
    // 密码安全性要求
    let validatePass1 = (rule, value, callback) => {
    // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
      let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
      if (!reg.test(value)) {
        callback(new Error('密码长度需6-16位，且包含字母和字符'))
      } else {
      callback()
      }
    };
        // 监测两次密码是否相同
    let validatePass2 = (rule, value, callback) => {
      value === '' ? callback(new Error('请再次输入密码')) :
        value !== this.registerValidateForm.password ? callback(new Error('两次输入密码不一致!')) :
        callback()
    };
    // 验证邮箱验证是否通过 !!!当先通过邮箱验证后更换邮箱名将仍然能通过注册!!!
    let validCodeTest = (rule, value, callback) => {
      value === '' ? callback('请输入验证码') : 
        value !== this.registerValidateForm.validCode ? callback(new Error('验证码错误')) :
          callback()
    };
    return {
      registerValidateForm: {
        email: '',
        password: '',
        checkPass: '',
        first: 'first',
        validCode: '',
        checkValid: ''
      },
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
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          validator: validatePass1,
          rigger: 'blur'
        }],
        checkPass: [{
          required: true,
          message: '请再次输入密码',
          trigger: 'blur'
        },
        {
          validator: validatePass2,
          trigger: 'blur'
        }],
        checkValid: [{
          required: true,
          message: '请输入邮箱验证码',
          trigger: 'blur'
        },
        {
          validator: validCodeTest,
          trigger: 'blur'
        }],
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let opt = this.registerValidateForm;
          api.userRegister(opt).then(({ data }) => {
            if (data.success) {
              this.$message({
                type: 'success',
                message: `注册成功，请登录`
              })
                //  Register成功时，刷新并跳转页面
              this.$router.go(0)
              this.$router.push('/login')
            } else {
              this.$message({
                type: 'info',
                message: '此账户已存在'
              })
            }
          }).catch((err) => {
            console.log(err);
          })
        } else {
          console.log('Error Submit!!');
          return false;
        }
      });
    },
    sendEmail(formName) {
      let opt = this.registerValidateForm;
      api.sendValidEmail(opt).then(({
        data
      }) => {
        if(data.success){
          this.$message({
            type: 'info',
            message: '成功发送验证码'
          })
          this.registerValidateForm.validCode = data.validCode;
        } else {
          this.$message({
            type: 'info',
            message: '发送失败'
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
