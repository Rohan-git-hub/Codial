const User = require('../models/user');
const { readyState } = require('../config/mongoose');
module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                console.log(user);
                return res.render('users', {
                    title: 'USER',
                    user:user
                });
            }
            return res.redirect('/users/sign-in')
        })
    }
    else{
        return res.redirect('/users/sign-in');
    }
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
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up',err); return}
        if(user){
            console.log(user.password, req.body.password);
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }
    });
}
module.exports.signOut = function(req, res){
    res.clearCookie('user_id');
    res.redirect('back');
}