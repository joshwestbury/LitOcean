const router = require('express').Router();

const authCheck = (request, response, next) => {
    if(!request.user){
        response.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (request, response) => {
    console.log('User', request.user);
    response.render('profile');
});

module.exports = router;
