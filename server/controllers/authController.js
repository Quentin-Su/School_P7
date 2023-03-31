const { User } = require('../models/user'); 
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({ message: 'Must have email and password' });

    try {
        const user = {
            email: req.body.email,
            password: crypto.createHash('sha256').update(req.body.password).digest('hex')
        };
            
        const result = await User.findOne(user);

        if (!result) return res.status(404).json({ message: 'User not found' });
        else {
            return res.status(200).json({
                userId: result._id,
                token: jwt.sign({ userId: result._id }, process.env.API_KEY, { expiresIn: '24h'})
            });
        }
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

exports.signup = async (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({ message: 'Must have email and password' });

    try {
        const user = new User({
            email: req.body.email,
            password: crypto.createHash('sha256').update(req.body.password).digest('hex')
        });
            
        await User.create(user);
		return res.status(201).json({ message: 'User Created' });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
};