var College = require('../service/college');

exports.fetch = function(req,res){
  College.fetchAll(function(err,colleges){
    if(err) return console.log(err);
    res.json(colleges);
  })
}