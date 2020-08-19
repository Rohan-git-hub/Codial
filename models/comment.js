const mogoose = require('mongoose');
const commentSchema = new mogoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mogoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: mogoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }
},{
    timestamps: true
});
const Comment = mogoose.model('Comment', commentSchema);
module.exports = Comment;
