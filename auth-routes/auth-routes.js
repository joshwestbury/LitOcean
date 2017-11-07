const router = require("express").Router();
const passport = require("passport");

//auth login
router.get('/login', (request, response) => {
    response.render('login.hbs')
});

//auth logout
router.get('/logout', (request, response) => {
    //handle with passport
    response.send("logging out")
});


//auth with google
router.get('/google',  passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (request, response) => {
    response.send("You reached a callback URL")
});


module.exports = router;
