var College = require('../model/college');

exports.newCollege = function(name,picture,cb){
  var college = new College({
    name: name,
    picture: picture
  });
  college.save(cb);
}

exports.fetchAll = function(cb){
  College.fetch(cb);
}

exports.getDetail = function(id,cb){
  College.findById(id,cb);
}

exports.findById = function(id,cb){
  College.findById(id,cb);
}

exports.findByName = function(name,cb){
  College.findOne({name: name},cb);
}

exports.deleteById = function(id,cb){
  College.remove({_id: id},cb);
}