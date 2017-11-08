const router = require("express").Router();
const passport = require("passport");

//auth login
router.get('/login', (request, response) => {
    response.render('login', {user: request.user});
});

//auth logout
router.get('/logout', (request, response) => {
    //handle with passport
    request.logout();
    response.redirect('/');
});


//auth with google+
router.get('/google',  passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (request, response) => {
    //response.send(request.user)
    response.redirect('/profile/');
});


module.exports = router;
