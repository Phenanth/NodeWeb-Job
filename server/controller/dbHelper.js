"use strict"
const express = require('express')
var mongoose = require('../db/db.js').mongoose;
var Promise = require('bluebird');
mongoose.Promise = Promise;
const models = require('../db/db.js').model
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const createToken = require('../middleware/createToken.js')
const checkToken = require('../middleware/checkToken.js')
const validcode = require('../middleware/validcode.js')
const sha1 = require('sha1')

// 注册
const Register = (req, res) => {
	let userRegister = new models.User({
		email: req.body.email,
		password: sha1(req.body.password),
		recheck: req.body.recheck,
		token: createToken(this.email)
	})

	// 将 objectid 转换为 用户创建时间
	userRegister.create_time = moment(objectIdToTimestamp(userRegister._id))
		.format('YYYY-MM-DD HH:mm:ss');

	models.User.findOne({
		email: (userRegister.email)
			.toLowerCase()
	}, (err, doc) => {
		if(err) console.log(err)
		// 用户名已存在，不能注册
		if(doc) {
			res.json({
				success: false
			})
		} else {
			userRegister.save(err => {
				if(err) console.log(err)
				console.log('注册用户成功')
				res.json({
					success: true
				})
			})
		}
	})
}

// 登录
const Login = (req, res) => {
	let userLogin = new models.User({
		email: req.body.email,
		password: sha1(req.body.password),
		token: createToken(this.email)
	})
	models.User.findOne({ email: userLogin.email }, (err, doc) => {
		if(err) console.log(err);
		if(!doc) {
			console.log("账号不存在");
			res.json({
				info: false //账号不存在 res.json.info为false
			})
		} else if(userLogin.password === doc.password) {
			console.log('登录成功')
			var name = req.body.email;
			res.json({
				success: true,
				email: doc.email,
				// 账户创建日期
				time: moment(objectIdToTimestamp(doc._id))
					.format('YYYY-MM-DD HH:mm:ss'),
				// token 信息验证
				token: createToken(name)
			})
		} else {
			console.log('密码错误或账户不存在')
			res.json({
				success: false
			})
		}
	})
}

// 所有用户打印
const User = (req, res) => {
	models.User.find({}, (err, doc) => {
		if(err) console.log(err)
		res.send(doc)
	})
}

// 删除用户
const delUser = (req, res) => {
	models.User.findOneAndRemove({ _id: req.body.id }, err => {
		if(err) console.log(err)
		console.log('删除用户成功')
		res.json({
			success: true
		})
	})
}

// 发送注册邮箱验证码
const sendValidEmail = (req, res) => {
	let user = {
		validEmailCode: validcode(req.body.email)
	}
	models.User.findOne({
		email: (req.body.eamil)
	}, (err, doc) => {
		if(err)
			console.log(err)
		if(doc){
			res.json({
				success: false
			})
		} else {
			console.log('发送验证码成功: ' + user.validEmailCode)
			res.json({
				success: true,
				validCode: user.validEmailCode// 返回成功发送的验证码
			})
		}
	})
}

// 带分页获取职位资料
const getJobList = (req, res) => {
	let data = req.body
	let items = {
		company: new RegExp(data.company),
		type: new RegExp(data.type),
		money: { $gte: data.salaryMin, $lte: data.salaryMax}
	}
	for (let item in items) {// 条件为空则删除
		if (items[item] === '//' ) {
			delete items[item]
		}
	}
	var page = data.page || 1;
	const PAGE_SIZE = 7;
	this.pageQuery(page, PAGE_SIZE, models.Job, '', items, {}, { money: 'asc'})
	.then(results => {
		console.log(results)
		res.json({results: results})// axios无接收
	})
	.catch(err => {
		console.log(err);
	})
}

exports.pageQuery = function (page, pageSize, Model, populate, queryParams, projection, sortParams) {
  var start = (page - 1) * pageSize;
  var $page = {
    pageNumber: page
  };
  var getCount = Model.count().exec();
  var getRecords = Model.find().skip(start).limit(pageSize).populate().sort().exec();
  return Promise.all([
    getCount,
    getRecords
   ])
  .then(([count, records]) =>{
    var list = new Array()
    for (let item of records) {
      list.push(item.toObject())
      }
    $page.pageCount = parseInt((count - 1) / pageSize + 1);
    $page.results = list;
    $page.count = count;
    return $page;
  })
}

// 后端routes
module.exports = (router) => {
		router.post('/register', Register),

		router.post('/login', Login),

		router.get('/user', checkToken, User),

		router.post('/delUser', checkToken, delUser),

		router.post('/sendValidEmail', sendValidEmail),

		router.post('/getJobList', getJobList)
}
// 				按照cb(success, doc)后res.send方法返回doc正确 却接收不到数据(axios反应类似什么都没收到)
				// 按照回调中重新布置res返回json内容则得到undefined的json