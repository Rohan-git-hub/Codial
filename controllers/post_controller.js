const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.post = function(req, res){
    if(req.isAuthenticated()){
        return res.render('posts',{
            title: 'Posts'
        });
    }
    return res.redirect('/users/sign-in');
}
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post:post
                },
                message: 'post Created'
            })
        }
        req.flash('success','Post Published !');
        return res.redirect('back');
    }catch(err){
        console.log('ERROR', err)
    }
}
module.exports.destroy = async function(req, res) {
    try{
        let post = await Post.findById(req.params.id)
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('error','Post Deleted!');
            return res.redirect('back');
        }else{
            req.flash('error','You Can Not Delete This Post!');
            return res.redirect('back');
        }
    }catch(err){
        console.log('ERROR', err);
    }
}