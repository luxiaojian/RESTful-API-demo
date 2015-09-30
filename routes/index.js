var express = require('express');
var router = express.Router();
var User = require('../app/controller/user');
var College = require('../app/controller/college');
var Course = require('../app/controller/course');
var Doc = require('../app/controller/doc');

router.get('/admin',function(req,res){
  res.render('index',{
    title: '后台录入'
  })
})

//college
router.get('/admin/colleges/add',College.getPage);
router.get('/admin/colleges',College.fetch);
router.post('/admin/colleges', College.add);
router.get('/admin/colleges/:id/edit',College.edit);
router.get('/admin/colleges/:id',College.detail);
router.delete('/admin/colleges/:id',College.del);

//course
router.get('/admin/courses/add',Course.getPage);
router.get('/admin/courses',Course.fetch);
router.post('/admin/courses', Course.add);
router.get('/admin/courses/:id/edit',Course.edit);
router.get('/admin/courses/:id',Course.detail);
router.delete('/admin/courses/:id',Course.del);

//doc
router.get('/admin/docs/add',Doc.getPage);
router.get('/admin/docs',Doc.fetch);
router.post('/admin/docs', Doc.add);
router.get('/admin/docs/:id/edit',Doc.edit);
router.get('/admin/docs/:id',Doc.detail);
router.delete('/admin/docs/:id',Doc.del);


module.exports = router;
