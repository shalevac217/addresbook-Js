const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access. Token required.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your actual secret key
        req.user = decoded; // Attach user data to request
        next(); // Continue to next middleware or route
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};
console.log(typeof authenticateUser); // Should print "function"
module.exports = authenticateUser;
