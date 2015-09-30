var express = require('express');
var router = express.Router();
var College = require('../app/api/college');
var Course = require('../app/api/course');
var Doc = require('../app/api/doc');

//general
router.get('/general',Course.getGeneral);

//professional
router.get('/professional',College.fetch);
router.get('/professional/:collegeId',Course.getProfessional);

//docs
router.get('/docs/lasted',Doc.newDocs);
router.get('/docs/hot',Doc.hotDocs);
router.get('/docs/:id/downloaded',Doc.download);

//courses
router.get('/courses/:courseId',Course.fetchCourseDocs);
module.exports = router;