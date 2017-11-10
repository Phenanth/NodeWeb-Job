"use strict"
// 创建 token
// token 单点登录具体理解： http://www.tuicool.com/articles/uuAzAbU
var jwt = require('jsonwebtoken')

module.exports = function (name) {
	const token = jwt.sign({
		name: name
	}, 'secret', { expiresIn: '168h' });   // 为方便测试，token有效期可设置为更短进行监测 
	return token;
}
