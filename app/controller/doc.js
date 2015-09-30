var Doc = require('../service/doc');
var College = require('../service/college');
var Course = require('../service/course');
var async = require('async');
var _ = require('underscore');

exports.getPage = function(req,res){
  async.series([
      function(cb){
        College.fetchAll(function(err,colleges){
          if(err) return console.log(err);
          cb(null,colleges);
        })
      },
      function(cb){
        Course.fetchAll(function(err,courses){
          if(err) return console.log(err);
          cb(null,courses);
        })
      }
    ],function(err,results){
      if(err) return console.log(err);
      console.log(results);
      res.render('doc',{
        title: '文档发布页面',
        colleges: results[0],
        courses: results[1]
      })
  })
}


exports.edit = function(req,res) {
  var id = req.params.id;
  Doc.findById(id,function(err,doc){
    if(err) return console.log(err);
    async.series([
        function(cb){
          College.fetchAll(function(err,colleges){
            if(err) return console.log(err);
            cb(null,colleges);
          })
        },
        function(cb){
          Course.fetchAll(function(err,courses){
            if(err) return console.log(err);
            cb(null,courses);
          })
        }
      ],function(err,results){
        if(err) return console.log(err);
        console.log(results);
        res.render('doc',{
          title: '更新文档页面',
          doc: doc,
          colleges: results[0],
          courses: results[1]
        })
    })
  })
}

exports.add = function(req, res) {
  var docObj = req.body.doc;
  var id= docObj.id;
  var _doc;
  if(id){
    Doc.findById(id,function(err,doc){
      if(err) return console.log(err);
      if(doc){
        _doc = _.extend(doc,docObj);
        _doc.save(function(err){
          if(err) return console.log(err);
          req.flash('success','update doc successful!');
          res.redirect('/admin/docs');
        });
      }
    })
  }else{
    Doc.newDoc(docObj.name, docObj.fileType, docObj.course, docObj.courseType, docObj.college, docObj.link,function(err, doc) {
        if (err) return console.log(err);
        req.flash('success','add a doc successful!');
        res.redirect('/admin/docs');
    }); 
  }
}


exports.fetch = function(req,res){
  Doc.fetchAll(function(err,docs){
    if(err) return console.log(err);
    res.render('docList',{
      title: '文档列表页',
      docs: docs
    })
  })
}

exports.detail = function(req,res){
  var id = req.params.id;
  Doc.getDetail(id,function(err,doc){
    if(err) return console.log(err);
    res.json(doc);
  })
}

exports.del = function(req,res){
  var id = req.params.id;
  Doc.deleteById(id,function(err,doc){
    if(err) return console.log(err)
    if(doc){
      res.json({success: 1});
    }else{
      res.status(400).json({success: 0});
    }
  })
}

exports.getGeneral = function(req,res){
  Doc.getGeneral(function(err,docs){
    if(err) return console.log(err);
    res.json(docs);
  })
}
