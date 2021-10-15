const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username cannot be less than 3 characters long'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Your password must be at least 6 characters'],
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
})

const User = mongoose.model('User', userSchema);

module.exports = User;