const Post = require('../models/post');
module.exports.post = function(req, res){
    if(req.isAuthenticated()){
        return res.render('posts',{
            title: 'Posts'
        });
    }
    return res.redirect('/users/sign-in');
}
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function (err, post) {
        if(err){console.log('error in creating post'); return;}
        return res.redirect('back');
    })
}