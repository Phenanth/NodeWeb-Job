const mongoose = require('mongoose')
// const mongolass = require('mongolass')
const config = require('config-lite')
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// mongodb 连接🔗
mongoose.connect(config.mongodb) // 需要于职位存放数据表单对接
// 此处防止 node.js - Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function () {
	console.log('Mongodb started successfully')
})

var userSchema = new Schema({
	email: String,
	password: String,
	recheck: String,
	token: String,
	create_time: Date
});
var jobSchema = new Schema({
    posname: String,
    company: String,
    money: Number,
    area: String,
    pubdate: String,
    edu: String,
    exp: String,
    desc: String,
    welfare: String,
    type: String,
    count: String
});

var model = {
	User: mongoose.model('User', userSchema),
	Job: mongoose.model('Job', jobSchema)
}


exports.model = model;
exports.mongoose = mongoose;

//exports.model = model
// exports.Job.index({ _id : 1 }).exec();  // 将会报错exports.Job