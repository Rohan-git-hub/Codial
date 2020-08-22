const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    let users = await User.find({});
    if(req.isAuthenticated()){
        return res.render('home',{
            title:'Home',
            posts: posts,
            all_users: users
        });
    }
    return res.redirect('/users/sign-in'); 
    }catch(err){
        console.log(err, 'errr');
    } 
}
// if(req.isAuthenticated()){
//     return res.render('home',{
//         title:'Home',
//         posts: posts,
//         all_users: users
//     });
// }
// return res.redirect('/users/sign-in');  
// })