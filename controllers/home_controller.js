const Post = require('../models/post');
module.exports.home = function(req, res){
    // Post.find({}, function(err, posts) {
    //     if(req.isAuthenticated()){
    //         return res.render('home',{
    //             title:'Home',
    //             posts: posts
    //         });
    //     }
    //     return res.redirect('/users/sign-in');
    // })
    Post.find({}).populate('user').exec(function(err, posts) {
        if(req.isAuthenticated()){
            return res.render('home',{
                title:'Home',
                posts: posts
            });
        }
        return res.redirect('/users/sign-in');
    });
}