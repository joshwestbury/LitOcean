const router = require('express').Router();

const authCheck = (request, response, next) => {
    if(!request.user){
        response.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (request, response) => {
    response.render('profile', {user: request.user});
});

module.exports = {
    router: router,
    authCheck: authCheck
};
