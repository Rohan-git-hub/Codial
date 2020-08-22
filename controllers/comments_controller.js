const Comment = require('../models/comment');
const post = require('../models/post')
module.exports.create = function(req, res) {
    post.findById(req.body.post, function(err, post) {
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                if(err){console.log('error in posting the comment'); return;}
                post.comments.push(comment);
                post.save();
                req.flash('success','Comment Added');
                res.redirect('/');
            });
        }
    });
}
module.exports.destroy = function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if(comment.user || comment.post.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post) {
                req.flash('error','Comment Deleted');
                return res.redirect('back');
            })
        }else{
            req.flash('error','You Can Not Delete The Comment');
            return res.redirect('back');
        }  
    })
}