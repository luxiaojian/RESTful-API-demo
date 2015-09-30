var College = require('../service/college');
var _ = require('underscore');

exports.getPage = function(req,res){
  res.render('college',{
    title: '添加学院页面'
  })
}

exports.edit = function(req,res){
  var id = req.params.id;
  College.findById(id,function(err,college){
    if(err) return console.log(err);
    res.render('college',{
      title: '更新学院信息',
      college: college
    })
  })
}

exports.add = function(req, res) {
    var _college,collegeObj = req.body.college;
    College.findByName(collegeObj.name,function(err,college){
      if(err) return console.log(err);
      if(college){
        _college = _.extend(college,collegeObj);
        _college.save(function(err){
          if(err) return console.log(err);
          req.flash('success','update college successful!');
          res.redirect('/admin/colleges/add');
        })
      }else{
        _college = collegeObj;
        College.newCollege(_college.name, _college.picture, function(err, college) {
            if (err) return console.log(err);
            req.flash('success','add a college successful!');
            res.redirect('/admin/colleges/add');
        });
      }
    })
}

exports.fetch = function(req,res){
  College.fetchAll(function(err,colleges){
    if(err) return console.log(err);
    res.render('collegeList',{
      title: '学院列表页',
      colleges: colleges
    })
  })
}

exports.detail = function(req,res){
  var id = req.params.id;
  College.getDetail(id,function(err,college){
    if(err) return console.log(err);
    res.json(college);
  })
}

exports.del = function(req,res){
  var id = req.params.id;
  College.deleteById(id,function(err,college){
    if(err) return console.log(err)
    if(college){
      res.json({success: 1});
    }else{
      res.status(400).json({success: 0});
    }
  })
}
