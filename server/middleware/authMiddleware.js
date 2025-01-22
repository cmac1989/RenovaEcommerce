// // authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Received token:", token);
    if (!token) {
        // For testing, allow unauthenticated requests to pass
        // You can mock a user here if you want to simulate a logged-in user
        console.log('Access denied. No token provided.')
        req.user = { id: 1, username: 'backyardcaveman' };  // Mock user
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            console.log('JWT_SECRET:', process.env.JWT_SECRET);
            return res.status(403).send({ error: 'Invalid or expired token.' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;