const express = require('express');
const router = express.Router();
const authService = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    let user = await authService.login(username, password);

    console.log(user);

    if (user) {
        res.redirect('/');
    } else {
        res.redirect('/404');
    }

});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    try {
        let { username, password, repeatPassword } = req.body;
    
        await authService.register(username, password, repeatPassword);
    
        res.redirect('/login');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;