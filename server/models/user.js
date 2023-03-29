const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        required: true
    }
});

exports.User = mongoose.model('User', userSchema);