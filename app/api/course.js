var Course = require('../service/course');
var Doc = require('../service/doc');

exports.getProfessional = function(req,res){
  var collegeId = req.params.collegeId;
  Course.findByCollege(collegeId,function(err,courses){
    if(err) return console.log(err);
    res.json(courses);
  })
}

exports.getGeneral = function(req,res){
  Course.findGeneralCourse(function(err,courses){
    if(err) return console.log(err);
    res.json(courses);
  })
}

exports.fetchCourseDocs = function(req,res){
  var courseId = req.params.courseId;
  Doc.fetchCourseDocs(courseId,function(err,docs){
    if(err) return console.log(err);
    if(docs.length > 0){
      res.json(docs); 
    }else{
      res.json({msg: '还没有添加文档哦！'})
    }
  })
}