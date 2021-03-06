const express = require('express');
const router = express.Router();
const authService = require('../services/authService.js');
const { TOKEN_COOKIE_NAME } = require('../constants.js');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res, next) => {
    try {
        let { username, password, repeatPassword } = req.body;

        // if (password != repeatPassword) {
        //     res.status(400).send(err.message);
        // }
    
        await authService.register(username, password, repeatPassword);
    
        res.redirect('/login');
    } catch (error) {
        // console.log(error);
        // res.status(400).send(error.message);
        // res.locals.error = error.message;
        // res.redirect('/register');
        // next(error.message);

        res.status(400).render('auth/register', { error: error.message });
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    let user = await authService.login(username, password);

    // console.log(user);
    
    if (!user) {
        return res.redirect('/404');
    }
    
    let token = await authService.createToken(user);

    // authService.createToken(user, function(err, token) {
    //     if(err) {

    //     } else {
    //         res.redirect('/');
    //     }
    // });

    res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true
    })

    // console.log(token);
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_COOKIE_NAME);

    res.redirect('/');
});

module.exports = router;