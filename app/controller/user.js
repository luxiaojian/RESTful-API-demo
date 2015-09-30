var User = require('../service/user');

exports.signUp = function(req, res) {
    var user = req.body.user;
    User.newUser(user.name, user.password, user.email, function(err, user) {
        if (err) return console.log(err);
        res.json({
            success: 'create user successful!'
        });
    })
}
