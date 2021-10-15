// const bcrypt = require('bcrypt');
const User = require('../models/User.js');

exports.register = function(username, password, repeatPassword) {
    // Validate password
    // return bcrypt.hash(password, 10)
    //     .then(hash => User.create({username, password: hash}));

    return User.create({ username, password })
}