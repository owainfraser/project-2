const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-passwordHash');
    if (!user) return res.status(401).json({ msg: 'User not found' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

const adminOnly = (req,res,next)=>{
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ msg:'Admins only' });
  next();
};

module.exports = { authMiddleware, adminOnly };
