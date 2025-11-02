const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/', authMiddleware, adminOnly, async (req,res)=>{
  res.json(await User.find().select('-passwordHash'));
});

router.put('/:id/role', authMiddleware, adminOnly, async (req,res)=>{
  const { role } = req.body;
  const u = await User.findByIdAndUpdate(req.params.id, {role}, {new:true}).select('-passwordHash');
  res.json(u);
});

router.delete('/:id', authMiddleware, adminOnly, async (req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  res.json({msg:'deleted'});
});

module.exports = router;
