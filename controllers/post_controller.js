module.exports.post = function(req, res){
    if(req.isAuthenticated()){
        return res.render('posts',{
            title: 'Posts'
        });
    }
    return res.redirect('/users/sign-in');
}