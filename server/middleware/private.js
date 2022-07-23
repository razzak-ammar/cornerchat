const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify Token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decodedToken.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
