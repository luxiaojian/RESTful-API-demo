var Doc = require('../model/doc');

exports.newDoc = function(name,fileType,course,courseType,college,link,cb){
  var doc = new Doc({
    name: name,
    fileType: fileType,
    course: course,
    courseType: courseType,
    college: college,
    link: link,
    download: 0
  });

  doc.save(cb);
}

exports.fetchAll = function(cb){
  Doc.fetch(cb);
}

exports.findById = function(id,cb){
  Doc.findById(id,cb);
}


exports.deleteById = function(id,cb){
  Doc.remove({_id: id},cb);
}

//find six new docs
exports.getNewDocs = function(cb){
  Doc.find()
     .limit(6)
     .sort({'meta.updateAt': -1})
     .exec(cb);
}

//find  hot docs
exports.findHotDocs = function(cb){
  Doc.find()
     .limit(6)
     .sort({
      download: -1
     })
     .exec(cb);
}

// get general docs
exports.getGeneral = function(cb){
  Doc.find({type: 'general'},cb);       
}

exports.downloadDoc = function(id,cb){
  Doc.findById(id,function(err,doc){
    if(err) return console.log(err);
    if(doc){
      Doc.update({_id:id},{$inc: {download: 1}}).exec(cb)
    }
  })
}

exports.fetchCourseDocs = function(courseId,cb){
  Doc.find({course: courseId},cb);
}