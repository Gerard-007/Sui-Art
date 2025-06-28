const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

module.exports = auth;