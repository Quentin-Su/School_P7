const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_KEY).userId;
        req.auth = { userId };

        next();
    }
    catch (e) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};