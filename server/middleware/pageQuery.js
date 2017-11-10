// 与db交互 返回分页后信息
var mongoose = require('../db/db.js').mongoose;
var Promise = require('bluebird');
mongoose.Promise = Promise;


module.exports = function (page, pageSize, Model, populate, queryParams, projection, sortParams) {
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


