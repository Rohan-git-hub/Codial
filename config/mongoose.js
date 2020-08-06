const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');
const db = mongoose.connection;
db.on('err', console.error.bind(console, "error in connecting to db"));
db.once('open', function(){
    console.log('successfully connected to database');
});
module.exports = db;