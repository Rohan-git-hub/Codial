const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('users', {
        title: 'USER'
    });
}
module.exports.signin = function(req, res){
    return res.render('sign-in.ejs',{
        title: 'Sign-in'
    });
}
module.exports.signup = function(req, res){
    return res.render('sign-up.ejs',{
        title: 'Sign-up'
    });
}
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up',err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up',err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}
module.exports.createSession = function(req, res){
    // todo later
}
