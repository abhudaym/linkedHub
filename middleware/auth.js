const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get the token from the header
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'No token! Authentication denied' });
  }

  //   Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
