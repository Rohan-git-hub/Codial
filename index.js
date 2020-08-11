const express = require('express');
const cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.static('./assets'));
// use express app router
app.use('/', require('./routes'));
// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port :${port} `);
});