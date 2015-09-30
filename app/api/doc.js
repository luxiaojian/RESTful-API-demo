var Doc = require('../service/doc');

//find six new docs
exports.newDocs = function(req,res){
  Doc.getNewDocs(function(err,docs){
    if(err) return console.log(err);
    res.json(docs);
  })
}

exports.hotDocs = function(req,res){
  Doc.findHotDocs(function(err,docs){
    if(err) return console.log(err);
    res.json(docs);
  })
}

exports.download = function(req,res){
  var id = req.params.id;
  Doc.downloadDoc(id,function(err,doc){
    if(err) return console.log(err);
    if(doc){
      res.json({success: 1})
    }
  })
}