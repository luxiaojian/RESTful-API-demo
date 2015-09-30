var Course = require('../model/course');

exports.newCourse = function(name,type,college,picture,cb){
  var course = new Course({
    name: name,
    type: type,
    college: college,
    picture: picture
  });

  course.save(cb);
}

exports.fetchAll = function(cb){
  Course.fetch(cb);
}

exports.getDetail = function(id,cb){
  Course.findById(id,cb);
}

exports.deleteById = function(id,cb){
  Course.remove({_id: id},cb);
}

exports.findByCollege = function(collegeId,cb){
  Course.find({college: collegeId},cb);
}

exports.findById = function(id,cb){
  Course.findById(id,cb);
}

exports.findGeneralCourse = function(cb){
  Course.find({type:'general'})
        .sort({download: -1})
        .exec(cb);
}