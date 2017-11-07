const router = require('express').Router();

const authCheck = (request, response, next) => {
    if(!request.user){
        response.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (request, response) => {
    console.log(request.user.username)
    response.send('you are logged in, this is your profile - ' + request.user.username);
});

module.exports = router;
