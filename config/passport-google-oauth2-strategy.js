const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
passport.use(new googleStrategy({
        clientID: "753553362436-8n4gtuhsv9saqjvspc14t5d7miupknd9.apps.googleusercontent.com",
        clientSecret: "ZJc5tZi-NvPRrFrJbQu7m33J",
        callbackURL: "http://localhost:800/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({email: profile.emails[0].value}).exec(function(err,user) {
            if(err){console.log('error in google strategy pasport', err); return;}
            console.log(profile);
            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user) {
                    if(err){console.log('error in creating user', err); return;}
                    return done(null, user);
                });
            }
        });
    }
));