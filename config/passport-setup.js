const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        //options for the google strat
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        User.findOne({googleId: profile.id}). then((currentUser) => {
            if(currentUser) {
                //already have this user
                console.log('user is: ', currentUser);
                //do something
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                      console.log('created new user: ', newUser)
                      //do something
                });
            }
        });
    })
);
