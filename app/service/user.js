var User = require('../model/user');

exports.newUser = function(name,password,email,cb){
  var user = new User({
    name: name,
    password: password,
    email: email
  });

  user.save(cb);
}