var Course = require('../service/course');
var College = require('../service/college');
var _ = require('underscore');

exports.getPage = function(req,res){
  College.fetchAll(function(err,colleges){
    if(err) return console.log(err);
    res.render('course',{
      title: '添加课程页面',
      colleges: colleges
    })
  })
}

exports.add = function(req, res) {
  var courseObj = req.body.course;
  var id= courseObj.id;
  var _course;
  if(id){
    Course.findById(id,function(err,course){
      if(err) return console.log(err);
      if(course){
        _course = _.extend(course,courseObj);
        _course.save(function(err){
          if(err) return console.log(err);
          req.flash('success','update course successful!');
          res.redirect('/admin/courses');
        });
      }
    })
  }else{
    Course.newCourse(courseObj.name, courseObj.type, courseObj.college,courseObj.picture, function(err, course) {
        if (err) return console.log(err);
        req.flash('success','add a course successful!');
        res.redirect('/admin/courses');
    }); 
  }
}

exports.edit = function(req,res) {
  var id = req.params.id;
  College.fetchAll(function(err,colleges){
    if(err) return console.log(err);
    Course.findById(id,function(err,course){
      if(err) return console.log(err);
      if(course){
        res.render('course',{
          title: '编辑课程页面',
          course: course,
          colleges: colleges
        })
      }
    }) 
    
  })
}

exports.fetch = function(req,res){
  Course.fetchAll(function(err,courses){
    if(err) return console.log(err);
    res.render('courseList',{
      title: '课程列表',
      courses: courses
    })
  })
}

exports.detail = function(req,res){
  var id = req.params.id;
  Course.getDetail(id,function(err,course){
    if(err) return console.log(err);
    res.json(course);
  })
}

exports.del = function(req,res){
  var id = req.params.id;
  Course.deleteById(id,function(err,course){
    if(err) return console.log(err)
    if(course){
      res.json({success: 1});
    }else{
      res.status(400).json({success: 0});
    }
  })
}
