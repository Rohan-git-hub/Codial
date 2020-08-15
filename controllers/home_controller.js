module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('user', 20);
    return res.render('home', {
        title: 'Home'
    });
}