var codeLength = 6;//验证码长度  
var nodemailer = require('nodemailer')

var email_config = {
    service: '163',
    // secureConnection: true,
    port: 465, // port
    auth: {
        user: 'miotokyo@163.com',
        pass: 'charlotte2'
    }
}

var transporter = nodemailer.createTransport(email_config);
  
function ssl(user){
    var mailOptions = {
        from: 'mio<miotokyo@163.com>',
        to: user.email,
        subject: '登陆系统-注册账户邮箱验证码',
        text: '您注册邮箱账户的验证码是：' + user.validCode
    }
    return mailOptions;
}

module.exports = function (mail) {
    user = {
        email: mail,
        validCode: ''
    }
    for (var i = 0; i < codeLength; i++) {  
        user.validCode += parseInt(Math.random() * 9).toString();
    }
    transporter.sendMail(ssl(user), user, function(error, info){
        if(error){
            return console.log(error);
        } else {
            console.log('Message sent:' + info.response + user.validCode);
        }
    })
    return user.validCode.toString();
}
