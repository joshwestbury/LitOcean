const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        //options for the google strat
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //check if user already exists in db
        User.findOne({googleid: profile.id}).then((currentUser) => {
            if(currentUser){
                //already have a user
                console.log('user is: ', + currentUser);
            }else{
                //if not create user in db
                new User ({
                    username: profile.displayName,
                    googleid: profile.id
                }).save().then((newUser) => {
                    console.log('new user created: ', + newUser);
                });
            }
        })
    })
);
