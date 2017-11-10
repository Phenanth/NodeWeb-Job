// 根据运行机器 语法要求 "use strict"
"use strict"
const express = require('express')//express框架
const path = require('path')
const bodyParser = require('body-parser')//传送数据data解包
const cookieParser = require('cookie-parser')//cookie解包
const favicon = require('serve-favicon')//网站头像
const logger = require('morgan')
const routes = require('./server/routes/api.js')
const config = require('config-lite')
const compression = require('compression')
const app = express()


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression({ threshold: 0 }))
app.use('/api', routes)//routes设置为api

app.use(function (req, res, next) {
	var err = new Error('This page not found');
	err.status = 404;
	next(err)
})

app.listen(3000, function () {
	console.log(`Server running in port ${config.port}`)
})

module.exports = app;