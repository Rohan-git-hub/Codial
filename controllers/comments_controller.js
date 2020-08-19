const comment = require('../models/comment');
const post = require('../models/post')
module.exports.create = function(req, res) {
    post.findById(req.body.post, function(err, post) {
        if(post){
            comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                if(err){console.log('error in posting the comment'); return;}
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}